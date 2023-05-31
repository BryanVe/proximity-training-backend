import { Training } from '..'
import {
	LastTrainingDTO,
	MostCommonResultDTO,
	ModuleDTO,
	OrganizationFiltersDTO,
	TrainingDTO,
	TrainingsFiltersDTO,
} from 'schemas'
import { Sequelize } from 'sequelize'

const getMostUsedModules = async (
	filters: OrganizationFiltersDTO
): Promise<ModuleDTO[]> => {
	const { organization, limit } = filters
	const mostUsedModules = await Training.findAll({
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

	return mostUsedModules.map(m => m.get())
}

const getMostCommonResults = async (
	filters: OrganizationFiltersDTO
): Promise<MostCommonResultDTO[]> => {
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
	const mostCommonResults = queryResults.map(e => {
		const { quantity, ...rest } = e.get()

		return {
			...rest,
			percentage: ((quantity / totalResults) * 100).toFixed(2),
		}
	})

	return mostCommonResults
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
): Promise<ModuleDTO[]> => {
	const { organization, limit } = filters
	const availableModules = await Training.findAll({
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

	return availableModules.map(a => a.get())
}

const getTrainings = async (
	filters: TrainingsFiltersDTO
): Promise<TrainingDTO[]> => {
	const { module, organization, limit, offset } = filters
	const trainings = await Training.findAll({
		where: {
			module,
			organization,
			deleted: 0,
		},
		order: [['startDate', 'DESC']],
		limit,
		offset,
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
