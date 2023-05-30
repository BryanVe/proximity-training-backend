import { Training } from '..'
import { MostCommonResultDTO, MostUsedModuleDTO } from 'schemas'
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
		},
		group: ['module'],
		order: [['quantity', 'DESC']],
		limit: 7,
	})

	return mostUsedModules.map(m => m.get() as MostUsedModuleDTO)
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
		},
		group: ['result'],
		order: [['quantity', 'DESC']],
		limit: 7,
	})

	return mostCommonResult.map(m => m.get() as MostCommonResultDTO)
}

export { getMostUsedModules, getMostCommonResults }
