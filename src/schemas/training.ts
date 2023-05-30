import { Static, Type } from '@sinclair/typebox'
import { id } from '.'

const trainingDTO = Type.Object({
	id,
	organization: Type.Optional(Type.String()),
	start_date: Type.Optional(Type.Date()),
	end_date: Type.Optional(Type.Date()),
	DNI: Type.Optional(Type.String()),
	module: Type.Optional(Type.String()),
	scenario: Type.Optional(Type.String()),
	modality: Type.Optional(Type.String()),
	result: Type.Optional(Type.String()),
	critical_errors: Type.Optional(Type.String()),
	minor_errors: Type.Optional(Type.String()),
	epp_no_tomados: Type.Optional(Type.String()),
	epp_incorrectamente_tomados: Type.Optional(Type.String()),
	is_deleted: Type.Number(),
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

export {
	organizationFilterDTO,
	OrganizationFilterDTO,
	trainingDTO,
	TrainingDTO,
	mostUsedModuleDTO,
	MostUsedModuleDTO,
}
