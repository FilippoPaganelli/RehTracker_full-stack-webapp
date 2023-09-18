import { Schema, model } from 'mongoose'

interface TherapyPhase {
	username: string
	exerciseTypes: number[]
	startDate: Date
	endDate: Date
}

const therapyPhaseSchema = new Schema<TherapyPhase>(
	{
		username: {
			type: String,
			require: true,
		},
		exerciseTypes: {
			type: [Number],
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: 'therapyphases',
	}
)

export const TherapyPhase = model('TherapyPhase', therapyPhaseSchema)
