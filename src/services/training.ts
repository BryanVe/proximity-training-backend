import httpErrors from 'http-errors'

import {
	getLastTrainings,
	getAvailableModules,
	getMostCommonResults,
	getMostUsedModules,
	getTrainings,
} from 'database'
import {
	LastTrainingDTO,
	StringToNumberMap,
	OrganizationFiltersDTO,
	TrainingDTO,
	TrainingsFiltersDTO,
} from 'schemas'
import { GE, errorHandling } from './utils'

type Process = {
	type:
		| 'getMostUsedModules'
		| 'getMostCommonResults'
		| 'getLastTrainings'
		| 'getAvailableModules'
		| 'getTrainings'
}

type Arguments = {
	organizationFilter?: OrganizationFiltersDTO
	trainingsFilters?: TrainingsFiltersDTO
}

type Responses = StringToNumberMap | LastTrainingDTO[] | TrainingDTO[]

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
			case 'getAvailableModules':
				return this.#getAvailableModules()
			case 'getTrainings':
				return this.#getTrainings()
			default:
				throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getMostUsedModules(): Promise<StringToNumberMap> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const mostUsedModules = await getMostUsedModules(
				this.#args.organizationFilter
			)

			return mostUsedModules
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getMostCommonResults(): Promise<StringToNumberMap> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const mostCommonResults = await getMostCommonResults(
				this.#args.organizationFilter
			)

			return mostCommonResults
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getLastTrainings(): Promise<LastTrainingDTO[]> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const lastTrainings = await getLastTrainings(
				this.#args.organizationFilter
			)

			return lastTrainings
		} catch (e) {
			return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
		}
	}

	async #getAvailableModules(): Promise<StringToNumberMap> {
		try {
			if (!this.#args.organizationFilter)
				throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

			const availableModules = await getAvailableModules(
				this.#args.organizationFilter
			)

			return availableModules
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
