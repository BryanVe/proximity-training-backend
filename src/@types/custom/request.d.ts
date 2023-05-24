type ExpressRequest = import('express').Request

interface CustomRequest extends ExpressRequest {
	log: import('pino-http').HttpLogger['logger']
	body: import('schemas').CredentialsDto
	// We can add custom headers via intersection, remember that for some reason
	// headers must be in Snake-Pascal-Case
	headers: import('http').IncomingHttpHeaders & {
		'Custom-Header'?: string
	}
}
