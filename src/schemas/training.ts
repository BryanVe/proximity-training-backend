import { Static, Type } from '@sinclair/typebox'
import { id } from '.'

const trainingDTO = Type.Object({
	id,
	organization: Type.Optional(Type.String()),
	startDate: Type.Optional(Type.Date()),
	endDate: Type.Optional(Type.Date()),
	dni: Type.Optional(Type.String()),
	module: Type.Optional(Type.String()),
	scenario: Type.Optional(Type.String()),
	modality: Type.Optional(Type.String()),
	result: Type.Optional(Type.String()),
	criticalErrors: Type.Optional(Type.String()),
	minorErrors: Type.Optional(Type.String()),
	eppNoTomados: Type.Optional(Type.String()),
	eppIncorrectamenteTomados: Type.Optional(Type.String()),
	deleted: Type.Number(),
})

type TrainingDTO = Static<typeof trainingDTO>

const organizationFiltersDTO = Type.Object({
	organization: Type.String(),
	limit: Type.Optional(Type.Number()),
})

type OrganizationFiltersDTO = Static<typeof organizationFiltersDTO>

const mostUsedModuleDTO = Type.Object({
	module: Type.String(),
	quantity: Type.Number(),
})

type MostUsedModuleDTO = Static<typeof mostUsedModuleDTO>

const mostCommonResultDTO = Type.Object({
	result: Type.String(),
	quantity: Type.Number(),
})

type MostCommonResultDTO = Static<typeof mostCommonResultDTO>

const lastTrainingDTO = Type.Object({
	id,
	organization: Type.Optional(Type.String()),
	startDate: Type.Optional(Type.Date()),
	module: Type.Optional(Type.String()),
	result: Type.Optional(Type.String()),
})

type LastTrainingDTO = Static<typeof lastTrainingDTO>

const trainingsFiltersDTO = Type.Intersect([
	organizationFiltersDTO,
	Type.Object({
		module: Type.String(),
		limit: Type.Number(),
		offset: Type.Number(),
	}),
])

type TrainingsFiltersDTO = Static<typeof trainingsFiltersDTO>

export {
	organizationFiltersDTO,
	OrganizationFiltersDTO,
	trainingDTO,
	TrainingDTO,
	mostUsedModuleDTO,
	MostUsedModuleDTO,
	mostCommonResultDTO,
	MostCommonResultDTO,
	lastTrainingDTO,
	LastTrainingDTO,
	trainingsFiltersDTO,
	TrainingsFiltersDTO,
}
