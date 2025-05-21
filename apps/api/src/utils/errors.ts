import { NextFunction, Request, Response } from "express"

export class AppError extends Error {
    public code: number
    public message: string

    constructor(code: number, message: string) {
        super()
        this.code = code
        this.message = message
    }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        res.status(err.code).json({ "message": err.message })
        return
    }

    res.status(500).json({ "message": "Internal server error (uknown)" })
    return
}
