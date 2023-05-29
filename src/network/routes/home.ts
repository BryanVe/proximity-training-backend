import { Response, Request, Router } from 'express'

import { response } from 'network/response'

const Home = Router()

Home.route('').get((_: Request, res: Response) => {
	response({
		error: false,
		message:
			'¡Bienvenido al backend de la plataforma de entrenamiendo de Proximity!',
		res,
		status: 200,
	})
})

export { Home }
