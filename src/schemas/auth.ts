import { Static, Type } from '@sinclair/typebox'

const credentialsDTO = Type.Object({
	email: Type.String(),
	password: Type.String(),
})

type CredentialsDTO = Static<typeof credentialsDTO>

const updatePasswordDTO = Type.Object({
	userId: Type.Number(),
	password: Type.String(),
})

type UpdatePasswordDTO = Static<typeof updatePasswordDTO>

export { credentialsDTO, CredentialsDTO, updatePasswordDTO, UpdatePasswordDTO }
