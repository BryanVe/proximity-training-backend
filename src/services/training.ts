import httpErrors from 'http-errors'

import { getMostUsedModules } from 'database'
import { MostUsedModuleDTO, OrganizationFilterDTO } from 'schemas'
import { GE, errorHandling } from './utils'

type Process = {
	type: 'getMostUsedModules'
}

type Arguments = {
	organizationFilter?: OrganizationFilterDTO
}

type Responses = MostUsedModuleDTO[]

class TrainingService {
	#args: Arguments

	constructor(args: Arguments = {}) {
		this.#args = args
	}

	public process({ type }: Process): Promise<Responses> {
		switch (type) {
			case 'getMostUsedModules':
				return this.#getMostUsedModules()
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
}

export { TrainingService }
