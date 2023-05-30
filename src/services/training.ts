import httpErrors from 'http-errors'

import {
	getLastTrainings,
	getModules,
	getMostCommonResults,
	getMostUsedModules,
	getTrainings,
} from 'database'
import {
	LastTrainingDTO,
	MostCommonResultDTO,
	MostUsedModuleDTO,
	OrganizationFilterDTO,
	TrainingDTO,
	TrainingsFiltersDTO,
} from 'schemas'
import { GE, errorHandling } from './utils'

type Process = {
	type:
		| 'getMostUsedModules'
		| 'getMostCommonResults'
		| 'getLastTrainings'
		| 'getModules'
		| 'getTrainings'
}

type Arguments = {
	organizationFilter?: OrganizationFilterDTO
	trainingsFilters?: TrainingsFiltersDTO
}

type Responses =
	| MostUsedModuleDTO[]
	| MostCommonResultDTO[]
	| LastTrainingDTO[]
	| string[]
	| TrainingDTO[]

class TrainingService {
	#args: Arguments

	constructor(args: Arguments = {}) {
		this.#args = args
	}

	public process({ type }: Process): Promise<Responses> {
		switch (type) {
			case 'getMostUsedModules':
				return this.#getMostUsedModules()
			case 'getMostCommonResults':
				return this.#getMostCommonResults()
			case 'getLastTrainings':
				return this.#getLastTrainings()
			case 'getModules':
				return this.#getModules()
			case 'getTrainings':
				return this.#getTrainings()
			default:
				throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getMostUsedModules(): Promise<MostUsedModuleDTO[]> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { organization } = this.#args.organizationFilter

			const mostUsedModules = await getMostUsedModules(organization)

			return mostUsedModules
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getMostCommonResults(): Promise<MostCommonResultDTO[]> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { organization } = this.#args.organizationFilter

			const mostCommonResults = await getMostCommonResults(organization)

			return mostCommonResults
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getLastTrainings(): Promise<LastTrainingDTO[]> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { organization } = this.#args.organizationFilter

			const lastTrainings = await getLastTrainings(organization)

			return lastTrainings
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getModules(): Promise<string[]> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const { organization } = this.#args.organizationFilter

			const modules = await getModules(organization)

			return modules
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getTrainings(): Promise<TrainingDTO[]> {
		try {
			if (!this.#args.trainingsFilters)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const trainings = await getTrainings(this.#args.trainingsFilters)

			return trainings
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}
}

export { TrainingService }
