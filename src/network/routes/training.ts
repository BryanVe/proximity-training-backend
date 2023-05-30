import { NextFunction, Router } from 'express'

import { response } from 'network/response'
import { TrainingService } from 'services'
import { OrganizationFilterDTO, organizationFilterDTO } from 'schemas'
import { validatorCompiler } from './utils'

const Training = Router()

Training.route('/training/most-used-modules').post(
	validatorCompiler(organizationFilterDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const organizationFilter = req.body as OrganizationFilterDTO
			const ts = new TrainingService({ organizationFilter })
			const result = await ts.process({ type: 'getMostUsedModules' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

Training.route('/training/most-common-results').post(
	validatorCompiler(organizationFilterDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const organizationFilter = req.body as OrganizationFilterDTO
			const ts = new TrainingService({ organizationFilter })
			const result = await ts.process({ type: 'getMostCommonResults' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

export { Training }
