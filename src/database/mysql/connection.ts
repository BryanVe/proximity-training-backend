import { Sequelize } from 'sequelize-typescript'
import { HttpLogger } from 'pino-http'

import * as models from './models'

let sequelize: Sequelize

const dbConnection = async (
	logger?: HttpLogger['logger']
): Promise<{
	connect: () => Promise<Sequelize>
	disconnect: () => Promise<void>
}> => {
	return {
		connect: async () => {
			if (!sequelize) {
				sequelize = new Sequelize(process.env.DB_URI as string, {
					models: Object.values(models),
				})
				logger?.info('MySQL connection established.')
			}

			return sequelize
		},
		disconnect: () => {
			logger?.info('MySQL connection closed.')

			return sequelize?.close()
		},
	}
}

export { dbConnection }
