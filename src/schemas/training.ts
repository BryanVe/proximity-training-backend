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

const organizationFilterDTO = Type.Object({
	organization: Type.String(),
})

type OrganizationFilterDTO = Static<typeof organizationFilterDTO>

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

export {
	organizationFilterDTO,
	OrganizationFilterDTO,
	trainingDTO,
	TrainingDTO,
	mostUsedModuleDTO,
	MostUsedModuleDTO,
	mostCommonResultDTO,
	MostCommonResultDTO,
	lastTrainingDTO,
	LastTrainingDTO,
}
