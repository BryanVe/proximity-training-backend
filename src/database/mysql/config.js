// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = {
	development: {
		url: process.env.DB_URI,
		dialect: 'mysql',
	},
	production: {
		url: process.env.DB_URI,
		dialect: 'mysql',
	},
}
