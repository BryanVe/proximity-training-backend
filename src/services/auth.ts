import httpErrors from 'http-errors'

import { getByEmail, updatePassword } from 'database'
import { CredentialsDTO, UpdatePasswordDTO, UserDTO } from 'schemas'
import { EFU, GE, errorHandling, MFU } from './utils'

type Process = {
	type: 'auth' | 'updatePassword'
}

type Arguments = {
	credentials?: CredentialsDTO
	updatePasswordBody?: UpdatePasswordDTO
}

class AuthService {
	#args: Arguments

	constructor(args: Arguments = {}) {
		this.#args = args
	}

	public process({ type }: Process): Promise<UserDTO | string> {
		switch (type) {
			case 'auth':
				return this.#auth()
			case 'updatePassword':
				return this.#updatePassword()
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

	async #updatePassword(): Promise<string> {
		try {
			if (!this.#args.updatePasswordBody)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const affectedCount = await updatePassword(this.#args.updatePasswordBody)

			if (affectedCount === 0)
				throw new httpErrors.NotFound(EFU.COULD_NOT_UPDATE_PASSWORD)

			return MFU.UPDATED_PASSWORD
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}
}

export { AuthService }
