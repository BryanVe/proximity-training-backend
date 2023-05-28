import httpErrors from 'http-errors'

import { getByEmail } from 'database'
import { CredentialsDTO, UserDTO } from 'schemas'
import { EFU, GE, errorHandling } from './utils'

type Process = {
	type: 'login'
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
			case 'login':
				return this.#login()
			default:
				throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #login(): Promise<UserDTO> {
		try {
			if (!this.#args.credentials)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { email, password } = this.#args.credentials

			const user = await getByEmail(email)

			if (!user) throw new httpErrors.Unauthorized(EFU.INVALID_CREDENTIALS)

			const { password: savedPassword, ...userWithoutPassword } = user

			if (savedPassword !== password)
				throw new httpErrors.Unauthorized(EFU.INVALID_CREDENTIALS)

			return userWithoutPassword
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}
}

export { AuthService }
