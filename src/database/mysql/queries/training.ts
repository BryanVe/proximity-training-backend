import { Training } from '..'
import { MostUsedModuleDTO } from 'schemas'
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
		limit: 5,
	})

	return mostUsedModules.map(m => m.get() as MostUsedModuleDTO)
}

export { getMostUsedModules }
