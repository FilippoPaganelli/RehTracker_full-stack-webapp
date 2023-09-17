import { Schema, model } from 'mongoose'

interface Exercise {
	username: string
	timestamp: Date
	type: number
	currentSet: number
	repetitionInSet: number
	therapyId: string
}

const exerciseSchema = new Schema<Exercise>(
	{
		username: {
			type: String,
			require: true,
		},
		timestamp: {
			type: Date,
			required: true,
			default: new Date(),
		},
		type: {
			type: Number,
			required: true,
		},
		currentSet: {
			type: Number,
			required: true,
			default: 1,
		},
		repetitionInSet: {
			type: Number,
			required: true,
			default: 0,
		},
		therapyId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: 'exercises',
	}
)

export const Exercise = model('Exercise', exerciseSchema)
