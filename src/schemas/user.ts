import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const userDTO = Type.Object({
	id,
	user: Type.String(),
	email: Type.String(),
	organization: Type.String(),
	deleted: Type.Number(),
})

type UserDTO = Static<typeof userDTO>

const userWithPasswordDTO = Type.Intersect([
	userDTO,
	Type.Object({
		password: Type.String(),
	}),
])

type UserWithPasswordDTO = Static<typeof userWithPasswordDTO>

export { userDTO, UserDTO, userWithPasswordDTO, UserWithPasswordDTO }
