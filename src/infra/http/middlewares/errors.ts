import { Request, Response, NextFunction } from 'express'
import { InvalidParamError, NotFoundError } from '../errors'

export default async function ErrorMiddleware(
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!error) {
    return next()
  }

  const errorPayload = {
    message: error.message,
  }

  if (error instanceof NotFoundError) {
    return response.status(404).json(errorPayload)
  }

  if (error instanceof InvalidParamError) {
    return response.status(400).json(errorPayload)
  }

  console.error(error)

  return response.status(500).json(errorPayload)
}
