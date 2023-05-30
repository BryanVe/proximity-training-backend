import { Training } from '..'
import {
	LastTrainingDTO,
	MostCommonResultDTO,
	MostUsedModuleDTO,
} from 'schemas'
import { Sequelize } from 'sequelize'

const getMostUsedModules = async (
	organization: string
): Promise<MostUsedModuleDTO[]> => {
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
		limit: 7,
	})

	return mostUsedModules.map(m => m.get())
}

const getMostCommonResults = async (
	organization: string
): Promise<MostCommonResultDTO[]> => {
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
		limit: 7,
	})

	return mostCommonResult.map(m => m.get())
}

const getLastTrainings = async (
	organization: string
): Promise<LastTrainingDTO[]> => {
	const lastTrainings = await Training.findAll({
		attributes: ['id', 'organization', 'startDate', 'module', 'result'],
		where: {
			organization,
			deleted: 0,
		},
		order: [['startDate', 'DESC']],
		limit: 5,
	})

	return lastTrainings.map(m => m.get())
}

const getModules = async (organization: string): Promise<string[]> => {
	const modules = await Training.findAll({
		attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('module')), 'module']],
		where: {
			organization,
			deleted: 0,
		},
		order: [['module', 'ASC']],
	})

	return modules.map(m => m.module)
}

export {
	getMostUsedModules,
	getMostCommonResults,
	getLastTrainings,
	getModules,
}
