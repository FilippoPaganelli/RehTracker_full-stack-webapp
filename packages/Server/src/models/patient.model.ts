import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

interface Patient {
	fullName: string
	age: number
	username: string
	password: string
}

interface PatientMethods {
	comparePassword(password: string, callback: (error: any, isMatch: boolean) => void): boolean
}

type PatientModel = Model<Patient, {}, PatientMethods>

const patientSchema = new Schema<Patient, PatientModel, PatientMethods>(
	{
		username: {
			type: String,
			require: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			require: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: 'patients',
	}
)

patientSchema.pre('save', function (next) {
	const patient = this

	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(SALT_WORK_FACTOR, function (saltError, salt) {
			if (saltError) {
				return next(saltError)
			} else {
				bcrypt.hash(patient.password, salt, function (hashError, hash) {
					if (hashError) {
						return next(hashError)
					}

					patient.password = hash
					return next()
				})
			}
		})
	} else {
		return next()
	}
})

patientSchema.method('comparePassword', function comparePassword(password: string, callback) {
	bcrypt.compare(password, this.password, (error, isMatch) => {
		if (error) {
			return false
		}
		callback(null, isMatch)
	})
})

export const Patient = model<Patient, PatientModel>('Patient', patientSchema)
