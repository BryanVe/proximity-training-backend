import httpErrors from 'http-errors'

import {
	getLastTrainings,
	getMostCommonResults,
	getMostUsedModules,
} from 'database'
import {
	LastTrainingDTO,
	MostCommonResultDTO,
	MostUsedModuleDTO,
	OrganizationFilterDTO,
} from 'schemas'
import { GE, errorHandling } from './utils'

type Process = {
	type: 'getMostUsedModules' | 'getMostCommonResults' | 'getLastTrainings'
}

type Arguments = {
	organizationFilter?: OrganizationFilterDTO
}

type Responses = MostUsedModuleDTO[] | MostCommonResultDTO[] | LastTrainingDTO[]

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
}

export { TrainingService }
