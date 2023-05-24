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
				sequelize = new Sequelize({
					dialect: 'mysql',
					port: 3306,
					password: 'password',
					username: 'root',
					database: 'proximitydb',
					models: Object.values(models),
				})

				// sequelize
				// 	.query('select DISTINCT organization from training')
				// 	.then(e => console.log(e))
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
