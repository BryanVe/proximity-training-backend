import { Response, Request, Router } from 'express'

import { response } from 'network/response'

const Home = Router()

Home.route('').get((_: Request, res: Response) => {
	response({
		error: false,
		message: 'Welcome to Proximity Platform Backend!',
		res,
		status: 200,
	})
})

export { Home }
