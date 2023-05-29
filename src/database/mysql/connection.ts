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
					dialect: 'mysql',
					models: Object.values(models),
				})

				logger?.info('Conexión a la base de datos MySQL establecida')
			}

			return sequelize
		},
		disconnect: () => {
			logger?.info('Conexión a la base de datos MySQL cerrada')

			return sequelize?.close()
		},
	}
}

export { dbConnection }
