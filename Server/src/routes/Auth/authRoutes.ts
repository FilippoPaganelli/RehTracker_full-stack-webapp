import jwt from 'jsonwebtoken'
import { Patient } from '../../models'

const TOKEN_DURATION = '600s'

// SIGNEDIN
export const signedIn = (req: any, res: any) => {
	try {
		const token = req.cookies.token

		if (!token || token === '' || !process.env.SESSION_SECRET) {
			res.json(false)
		} else {
			jwt.verify(token, process.env.SESSION_SECRET)
			res.json(true)
		}
	} catch (error) {
		res.json(false)
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
// router.route('/mobile/sign-in').post((req, res) => {
// 	const username = req.body.username
// 	const password = req.body.password

// 	Patient.findOne({ username: username }).exec(function (error, patient) {
// 		if (error) {
// 			res.status(500).json({ error: 'Error from database' })
// 		} else if (!patient) {
// 			res.status(400).json({ error: 'Wrong username or password' })
// 		} else {
// 			patient.comparePassword(password, function (matchError, isMatch) {
// 				if (matchError) {
// 					res.status(500).json({ error: 'Error from backend' })
// 				} else if (!isMatch) {
// 					res.status(400).json({ error: 'Wrong username or password' })
// 				} else {
// 					// password is correct
// 					const token = jwt.sign({ username: username }, process.env.SESSION_SECRET, {
// 						expiresIn: TOKEN_DURATION,
// 					})
// 					// sending the token for authentication
// 					res.status(200).json({ token: token })
// 				}
// 			})
// 		}
// 	})
// })

// SIGNEDIN MOBILE
export const mobileSignedIn = (req: any, res: any) => {
	try {
		const token = req.body.token

		if (!token || token === '') {
			res.json(false)
		} else {
			// timeout logic is inside of the token from its generation
			jwt.verify(token, process.env.SESSION_SECRET ?? '')
			res.json(true)
		}
	} catch (error) {
		res.json(false)
	}
}
