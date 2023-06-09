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
	criticalErrors: Type.Array(Type.String()),
	minorErrors: Type.Array(Type.String()),
	eppNoTomados: Type.Array(Type.String()),
	eppIncorrectamenteTomados: Type.Array(Type.String()),
	deleted: Type.Number(),
})

type TrainingDTO = Static<typeof trainingDTO>

const organizationFiltersDTO = Type.Object({
	organization: Type.String(),
	limit: Type.Optional(Type.Number()),
})

type OrganizationFiltersDTO = Static<typeof organizationFiltersDTO>

const stringToNumberMap = Type.Record(Type.String(), Type.Number())

type StringToNumberMap = Static<typeof stringToNumberMap>

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
		order: Type.Union([
			Type.Literal('NEWEST_FIRST'),
			Type.Literal('OLDER_FIRST'),
			Type.Literal('COMPLETED_FIRST'),
			Type.Literal('NOT_COMPLETED_FIRST'),
		]),
	}),
])

type TrainingsFiltersDTO = Static<typeof trainingsFiltersDTO>

export {
	organizationFiltersDTO,
	OrganizationFiltersDTO,
	trainingDTO,
	TrainingDTO,
	stringToNumberMap,
	StringToNumberMap,
	lastTrainingDTO,
	LastTrainingDTO,
	trainingsFiltersDTO,
	TrainingsFiltersDTO,
}
