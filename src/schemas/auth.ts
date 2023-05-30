import { Static, Type } from '@sinclair/typebox'

const credentialsDTO = Type.Object({
	email: Type.String(),
	password: Type.String(),
})

type CredentialsDTO = Static<typeof credentialsDTO>

export { credentialsDTO, CredentialsDTO }
