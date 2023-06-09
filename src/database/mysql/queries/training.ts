import { Training } from '..'
import {
	LastTrainingDTO,
	StringToNumberMap,
	OrganizationFiltersDTO,
	TrainingDTO,
	TrainingsFiltersDTO,
} from 'schemas'
import { Order, Sequelize } from 'sequelize'

const ORDERS: Record<TrainingsFiltersDTO['order'], Order> = {
	NEWEST_FIRST: [['startDate', 'DESC']],
	OLDER_FIRST: [['startDate', 'ASC']],
	COMPLETED_FIRST: [
		Sequelize.literal('CASE WHEN result = "COMPLETADO" THEN 1 ELSE 2 END'),
		['startDate', 'DESC'],
	],
	NOT_COMPLETED_FIRST: [
		Sequelize.literal('CASE WHEN result = "NO COMPLETADO" THEN 1 ELSE 2 END'),
		['startDate', 'DESC'],
	],
}

const getMostUsedModules = async (
	filters: OrganizationFiltersDTO
): Promise<StringToNumberMap> => {
	const { organization, limit } = filters
	const queryResults = await Training.findAll({
		attributes: [
			'module',
			[Sequelize.fn('COUNT', Sequelize.col('module')), 'quantity'],
		],
		where: {
			organization,
			deleted: 0,
		},
		group: ['module'],
		order: [['quantity', 'DESC']],
		limit,
	})

	return Object.fromEntries(
		queryResults.map(q => {
			const m = q.get()

			return [m.module, m.quantity]
		})
	)
}

const getMostCommonResults = async (
	filters: OrganizationFiltersDTO
): Promise<StringToNumberMap> => {
	const { organization, limit } = filters
	const queryResults = await Training.findAll({
		attributes: [
			'result',
			[Sequelize.fn('COUNT', Sequelize.col('result')), 'quantity'],
		],
		where: {
			organization,
			deleted: 0,
		},
		group: ['result'],
		order: [['quantity', 'DESC']],
		limit,
	})

	const totalResults = queryResults.reduce(
		(total, result) => total + result.get().quantity,
		0
	)

	return Object.fromEntries(
		queryResults.map(q => {
			const { quantity, result } = q.get()
			const percentage = ((quantity / totalResults) * 100).toFixed(2)

			return [result, percentage]
		})
	)
}

const getLastTrainings = async (
	filters: OrganizationFiltersDTO
): Promise<LastTrainingDTO[]> => {
	const { organization, limit } = filters
	const lastTrainings = await Training.findAll({
		attributes: ['id', 'organization', 'startDate', 'module', 'result'],
		where: {
			organization,
			deleted: 0,
		},
		order: [['startDate', 'DESC']],
		limit,
	})

	return lastTrainings.map(m => m.get())
}

const getAvailableModules = async (
	filters: OrganizationFiltersDTO
): Promise<StringToNumberMap> => {
	const { organization, limit } = filters
	const queryResults = await Training.findAll({
		attributes: [
			'module',
			[Sequelize.fn('COUNT', Sequelize.col('module')), 'quantity'],
		],
		where: {
			organization,
			deleted: 0,
		},
		group: ['module'],
		order: [['module', 'ASC']],
		limit,
	})

	return Object.fromEntries(
		queryResults.map(q => {
			const a = q.get()

			return [a.module, a.quantity]
		})
	)
}

const getTrainings = async (
	filters: TrainingsFiltersDTO
): Promise<TrainingDTO[]> => {
	const { module, organization, limit, offset, order } = filters
	const trainings = await Training.findAll({
		where: {
			module,
			organization,
			deleted: 0,
		},
		limit,
		offset,
		...(ORDERS[order] && {
			order: ORDERS[order],
		}),
	})

	return trainings.map(t => t.get())
}

export {
	getMostUsedModules,
	getMostCommonResults,
	getLastTrainings,
	getAvailableModules,
	getTrainings,
}
