import * as jwt from 'jsonwebtoken'
import { logger } from '../../shared'
import { Patient } from '../../models'

declare module 'jsonwebtoken' {
	export interface SignedInJwtPayload extends jwt.JwtPayload {
		username: string | null
	}
}

const TOKEN_DURATION = process.env.NODE_ENV === 'production' ? '600s' : '3600s'

// SIGNEDIN
export const signedIn = (req: any, res: any) => {
	try {
		const token: string | undefined = req.cookies.token

		if (!token || token === '' || !process.env.SESSION_SECRET) {
			res.json({ username: null })
		} else {
			const verified = <jwt.SignedInJwtPayload>jwt.verify(token, process.env.SESSION_SECRET)

			if (!verified.username) {
				res.json({ username: null })
			}

			res.json({ username: verified.username })
		}
	} catch (error) {
		logger.error(error)
		res.json({ username: null })
	}
}

// SIGNOUT
export const signOut = (req: any, res: any) => {
	res.cookie('token', '', {
		httpOnly: true,
		expires: new Date(),
	}).send()
}

// SIGNIN
export const signIn = async (req: any, res: any) => {
	const username = req.body.username as string
	const password = req.body.password as string

	const patient = await Patient.findOne({ username: username })

	if (!patient) {
		res.json({ error: 'Could not find a patient' })
	} else {
		patient.comparePassword(password, (error, isMatch) => {
			if (!isMatch) {
				res.json({ error: 'Wrong username or password' })
			} else {
				// password is correct
				const token = jwt.sign({ username: username }, process.env.SESSION_SECRET ?? '', {
					expiresIn: TOKEN_DURATION,
				})

				// sending the token for authentication
				res.cookie('token', token, { httpOnly: true }).send()
			}
		})
	}
}

// SIGNUP
export const signUp = async (req: any, res: any) => {
	const username = req.body.username
	const password = req.body.password
	const fullName = req.body.fullName
	const age = req.body.age

	const patient = await Patient.findOne({ username: username })

	if (patient === null) {
		const patient = new Patient({
			username: username,
			password: password,
			fullName: fullName,
			age: age,
		})

		patient
			.save()
			.then(pat => {
				res.send(pat)
			})
			.catch(err => {
				res.json({ error: 'Saving to DB failed' })
			})
	} else {
		res.json({ error: 'Username already taken' })
	}
}

// SIGNIN MOBILE
export const mobileSignIn = async (req: any, res: any) => {
	const username = req.body.username as string
	const password = req.body.password as string

	const patient = await Patient.findOne({ username: username })

	if (!patient) {
		res.json({ error: 'Could not find a patient' })
	} else {
		patient.comparePassword(password, (error, isMatch) => {
			if (!isMatch) {
				res.json({ error: 'Wrong username or password' })
			} else {
				// password is correct
				const token = jwt.sign({ username: username }, process.env.SESSION_SECRET ?? '', {
					expiresIn: TOKEN_DURATION,
				})

				// sending the token for authentication
				res.json({ token })
			}
		})
	}
}

// SIGNEDIN MOBILE
export const mobileSignedIn = (req: any, res: any) => {
	try {
		const token = req.body.token

		if (!token || token === '') {
			res.json(false)
		} else {
			jwt.verify(token, process.env.SESSION_SECRET ?? '')
			res.json(true)
		}
	} catch (error) {
		res.json(false)
	}
}
