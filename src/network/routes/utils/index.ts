import { NextFunction } from 'express'
import httpErrors from 'http-errors'
import { TSchema } from '@sinclair/typebox'
import Ajv from 'ajv'

const ajv = new Ajv({
	removeAdditional: true,
	useDefaults: true,
	coerceTypes: true,
	nullable: true,
})

type Middleware = (
	req: CustomRequest,
	res: CustomResponse,
	next: NextFunction
) => void

const validatorCompiler = (
	schema: TSchema,
	value: 'body' | 'params'
): Middleware => {
	return (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
		const validate = ajv.compile(schema)
		const ok = validate(req[value])

		if (!ok && validate.errors) {
			const [error] = validate.errors
			const errorMessage = `${error.dataPath.replace('.', '')} ${error.message}`

			return next(new httpErrors.UnprocessableEntity(errorMessage))
		}

		next()
	}
}

export { validatorCompiler }
