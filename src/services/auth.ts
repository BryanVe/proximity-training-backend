import httpErrors from 'http-errors'

import { getByEmail } from 'database'
import { CredentialsDTO, UserDTO } from 'schemas'
import { EFU, GE, errorHandling } from './utils'

type Process = {
	type: 'auth'
}

type Arguments = {
	credentials?: CredentialsDTO
}

class AuthService {
	#args: Arguments

	constructor(args: Arguments = {}) {
		this.#args = args
	}

	public process({ type }: Process): Promise<UserDTO> {
		switch (type) {
			case 'auth':
				return this.#auth()
			default:
				throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #auth(): Promise<UserDTO> {
		try {
			if (!this.#args.credentials)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { email, password } = this.#args.credentials

			const userWithPassword = await getByEmail(email)

			if (!userWithPassword)
				throw new httpErrors.Unauthorized(EFU.INVALID_CREDENTIALS)

			const { password: savedPassword, ...user } = userWithPassword

			if (savedPassword !== password)
				throw new httpErrors.Unauthorized(EFU.INVALID_CREDENTIALS)

			return user
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}
}

export { AuthService }
