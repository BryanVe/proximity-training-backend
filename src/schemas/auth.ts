import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const userDTO = Type.Object({
	id: Type.Optional(id),
	user: Type.String(),
	email: Type.String(),
	password: Type.Optional(Type.String()),
	organization: Type.String(),
	is_deleted: Type.Number(),
})

type UserDTO = Static<typeof userDTO>

const credentialsDTO = Type.Object({
	email: Type.String(),
	password: Type.String(),
})

type CredentialsDTO = Static<typeof credentialsDTO>

export { userDTO, UserDTO, credentialsDTO, CredentialsDTO }
