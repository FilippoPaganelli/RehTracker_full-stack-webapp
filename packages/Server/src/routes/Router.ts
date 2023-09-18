import { Router } from 'express'
import { auth, authMobile } from '../middleware'
import {
	createExercise,
	getExercises,
	getPatients,
	mobileGetExercises,
	mobileSignedIn,
	mobileSignIn,
	signIn,
	signOut,
	signUp,
	signedIn,
	updateExercise,
	// createTherapy,
} from '.'

export const router = Router()
const AUTH_PREFIX = '/api/auth'
const EXERCISES_PREFIX = '/api/exercises'
const PATIENTS_PREFIX = '/api/patients'
// const THERAPIES_PREFIX = '/api/therapy'

// auth
router.get(AUTH_PREFIX + '/signed-in', signedIn)
router.get(AUTH_PREFIX + '/sign-out', signOut)
router.post(AUTH_PREFIX + '/sign-in', signIn)
router.post(AUTH_PREFIX + '/mobile/sign-in', mobileSignIn)
router.post(AUTH_PREFIX + '/sign-up', signUp)
router.post(AUTH_PREFIX + '/mobile/signed-in', mobileSignedIn)

// exercises
router.post(EXERCISES_PREFIX + '/mobile/get', authMobile, mobileGetExercises)
router.post(EXERCISES_PREFIX + '/get', auth, getExercises)
router.post(EXERCISES_PREFIX + '/', auth, createExercise)
router.patch(EXERCISES_PREFIX + '/', auth, updateExercise)

// patients
router.get(PATIENTS_PREFIX + '/', auth, getPatients)

// therapies
// router.post(THERAPIES_PREFIX + '/', auth, createTherapy)
