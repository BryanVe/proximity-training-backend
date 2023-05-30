import { Training } from '..'
import {
	LastTrainingDTO,
	MostCommonResultDTO,
	MostUsedModuleDTO,
	OrganizationFiltersDTO,
	TrainingDTO,
	TrainingsFiltersDTO,
} from 'schemas'
import { Sequelize } from 'sequelize'

const getMostUsedModules = async (
	filters: OrganizationFiltersDTO
): Promise<MostUsedModuleDTO[]> => {
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
	const mostCommonResult = await Training.findAll({
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

	return mostCommonResult.map(m => m.get())
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

const getModules = async (
	filters: OrganizationFiltersDTO
): Promise<string[]> => {
	const { organization, limit } = filters
	const modules = await Training.findAll({
		attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('module')), 'module']],
		where: {
			organization,
			deleted: 0,
		},
		order: [['module', 'ASC']],
		limit,
	})

	return modules.map(m => m.module)
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
	getModules,
	getTrainings,
}
