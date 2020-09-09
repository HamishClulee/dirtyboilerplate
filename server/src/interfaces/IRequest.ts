import { Request } from 'express'

export interface IRequest extends Request {
	flash(message: string, callback: any): any
	isAuthenticated(): any
	logIn(user: any, callback: any): any
	user: {
		_id: string
	}
	logout(): void
}
