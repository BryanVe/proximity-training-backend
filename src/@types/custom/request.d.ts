type ExpressRequest = import('express').Request

interface CustomRequest extends ExpressRequest {
	log: import('pino-http').HttpLogger['logger']
	body:
		| import('schemas').CredentialsDto
		| import('schemas').OrganizationFilterDTO
	headers: import('http').IncomingHttpHeaders
}
