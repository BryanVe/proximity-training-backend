import { Application, Response, Request, Router, NextFunction } from 'express'
import swaggerUi from 'swagger-ui-express'
import httpErrors from 'http-errors'

import { response } from './response'
import * as routes from './routes'
import { docs } from 'utils'

const { Home, ...restRoutes } = routes

const applyRoutes = (app: Application): void => {
	app.use('/', Home)
	app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs))
	Object.values(restRoutes).forEach(
		(router: Router): Application => app.use('/api', router)
	)

	// Handling 404 error
	app.use((req, res, next) => {
		next(new httpErrors.NotFound('Esta ruta no existe'))
	})
	app.use(
		(
			error: httpErrors.HttpError,
			req: Request,
			res: Response,
			next: NextFunction
		) => {
			response({
				error: true,
				message: error.message,
				res,
				status: error.status,
			})
			next()
		}
	)
}

export { applyRoutes }
