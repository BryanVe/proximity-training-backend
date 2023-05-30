import httpErrors from 'http-errors'

import { getMostCommonResults, getMostUsedModules } from 'database'
import {
	MostCommonResultDTO,
	MostUsedModuleDTO,
	OrganizationFilterDTO,
} from 'schemas'
import { GE, errorHandling } from './utils'

type Process = {
	type: 'getMostUsedModules' | 'getMostCommonResults'
}

type Arguments = {
	organizationFilter?: OrganizationFilterDTO
}

type Responses = MostUsedModuleDTO[] | MostCommonResultDTO[]

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
}

export { TrainingService }
