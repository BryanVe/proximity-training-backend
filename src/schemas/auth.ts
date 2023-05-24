import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const userDto = Type.Object({
	id: Type.Optional(id),
	user: Type.String(),
	email: Type.String(),
	password: Type.String(),
	organization: Type.String(),
	is_deleted: Type.Number(),
})

type UserDTO = Static<typeof userDto>

const credentialsDto = Type.Object({
	email: Type.String(),
	password: Type.String(),
})

type CredentialsDto = Static<typeof credentialsDto>

export { userDto, UserDTO, credentialsDto, CredentialsDto }
