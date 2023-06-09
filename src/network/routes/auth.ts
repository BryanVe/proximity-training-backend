import { NextFunction, Router } from 'express'

import { response } from 'network/response'
import { AuthService } from 'services'
import {
	CredentialsDTO,
	credentialsDTO,
	UpdatePasswordDTO,
	updatePasswordDTO,
} from 'schemas'
import { validatorCompiler } from './utils'

const Auth = Router()

Auth.route('/auth').post(
	validatorCompiler(credentialsDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const credentials = req.body as CredentialsDTO
			const as = new AuthService({ credentials })
			const result = await as.process({ type: 'auth' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

Auth.route('/update-password').post(
	validatorCompiler(updatePasswordDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const updatePasswordBody = req.body as UpdatePasswordDTO
			const as = new AuthService({ updatePasswordBody })
			const result = await as.process({ type: 'updatePassword' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

export { Auth }
