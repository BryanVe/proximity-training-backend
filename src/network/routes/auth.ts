import { NextFunction, Router } from 'express'

import { response } from 'network/response'
import { UserService } from 'services'
import { credentialsDto, idSchema } from 'schemas'
import { validatorCompiler } from './utils'

const Auth = Router()

Auth.route('/login').post(
	validatorCompiler(credentialsDto, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const credentials = req.body
			const us = new UserService({ credentials })
			const result = await us.process({ type: 'login' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

export { Auth }
