import jwt from 'jsonwebtoken'

export function auth(req: any, res: any, next: () => void) {
	try {
		const token = req.cookies.token

		if (!token || token === '') return res.json({ error: 'Unauthorised request' })

		const verified = <{ username: string }>jwt.verify(token, process.env.SESSION_SECRET ?? '')

		if (verified.username) {
			req.username = verified.username
			next()
		}
	} catch (error) {
		res.json({ error: 'Unauthorised request' })
	}
}

export function authMobile(req: any, res: any, next: () => void) {
	try {
		const token = req.body.token

		if (!token || token === '') return res.status(401)

		const verified = <{ username: string }>jwt.verify(token, process.env.SESSION_SECRET ?? '')

		if (verified.username) {
			req.username = verified.username
			next()
		}
	} catch (error) {
		res.status(401).send()
	}
}
