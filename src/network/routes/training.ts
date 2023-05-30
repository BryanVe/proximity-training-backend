import { NextFunction, Router } from 'express'

import { response } from 'network/response'
import { TrainingService } from 'services'
import {
	OrganizationFiltersDTO,
	organizationFiltersDTO,
	trainingsFiltersDTO,
	TrainingsFiltersDTO,
} from 'schemas'
import { validatorCompiler } from './utils'

const Training = Router()

Training.route('/training/most-used-modules').post(
	validatorCompiler(organizationFiltersDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const organizationFilter = req.body as OrganizationFiltersDTO
			const ts = new TrainingService({ organizationFilter })
			const result = await ts.process({ type: 'getMostUsedModules' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

Training.route('/training/most-common-results').post(
	validatorCompiler(organizationFiltersDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const organizationFilter = req.body as OrganizationFiltersDTO
			const ts = new TrainingService({ organizationFilter })
			const result = await ts.process({ type: 'getMostCommonResults' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

Training.route('/training/last').post(
	validatorCompiler(organizationFiltersDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const organizationFilter = req.body as OrganizationFiltersDTO
			const ts = new TrainingService({ organizationFilter })
			const result = await ts.process({ type: 'getLastTrainings' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

Training.route('/training/modules').post(
	validatorCompiler(organizationFiltersDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const organizationFilter = req.body as OrganizationFiltersDTO
			const ts = new TrainingService({ organizationFilter })
			const result = await ts.process({ type: 'getModules' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

Training.route('/training').post(
	validatorCompiler(trainingsFiltersDTO, 'body'),
	async (
		req: CustomRequest,
		res: CustomResponse,
		next: NextFunction
	): Promise<void> => {
		try {
			const trainingsFilters = req.body as TrainingsFiltersDTO
			const ts = new TrainingService({ trainingsFilters })
			const result = await ts.process({ type: 'getTrainings' })

			response({ error: false, message: result, res, status: 200 })
		} catch (error) {
			next(error)
		}
	}
)

export { Training }
