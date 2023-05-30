import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const userDTO = Type.Object({
	id,
	user: Type.String(),
	email: Type.String(),
	password: Type.Optional(Type.String()),
	organization: Type.String(),
	deleted: Type.Number(),
})

type UserDTO = Static<typeof userDTO>

export { userDTO, UserDTO }
