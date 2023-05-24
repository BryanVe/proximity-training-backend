import httpErrors from 'http-errors'

import { get, getByEmail } from 'database'
import { CredentialsDto, UserDTO } from 'schemas'
import { EFU, MFU, GE, errorHandling } from './utils'

type Process = {
	type: 'getAll' | 'getOne' | 'login'
}

type Arguments = {
	id?: number
	credentials?: CredentialsDto
}

class UserService {
	#args: Arguments

	constructor(args: Arguments = {}) {
		this.#args = args
	}

	public process({ type }: Process): Promise<string | UserDTO | UserDTO[]> {
		switch (type) {
			case 'getAll':
				return this.#getAll()
			case 'getOne':
				return this.#getOne()
			case 'login':
				return this.#login()
			default:
				throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getAll(): Promise<UserDTO[]> {
		try {
			const users = (await get()) as UserDTO[]

			return users
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getOne(): Promise<UserDTO> {
		try {
			if (!this.#args.id)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { id } = this.#args
			const user = (await get(id)) as UserDTO | null

			if (!user) throw new httpErrors.NotFound(EFU.NOT_FOUND)

			return user
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #login(): Promise<UserDTO> {
		try {
			if (!this.#args.credentials)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { email, password } = this.#args.credentials

			const user = (await getByEmail(email)) as UserDTO | null

			if (!user) throw new httpErrors.NotFound(EFU.NOT_FOUND)

			if (user.password !== password)
				throw new httpErrors.NotFound(EFU.INVALID_CREDENTIALS)

			return user
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}
}

export { UserService }
