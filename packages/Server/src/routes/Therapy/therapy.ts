import { Patient, ExerciseInfo, TherapyPhase } from '../../models'

function _wrongDates(start: number, end: number) {
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	if (start < today.getDate()) {
		return { error: "Start date can't be earlier then today" }
	}
	if (start - end > 0) {
		return { error: "Start date can't be earlier then end date" }
	}
}

function _wrongExTypes(types: number[]) {
	if (!types.every(type => ExerciseInfo.VALIDEXTYPES.includes(type))) {
		return { error: 'Wrong exercise types' }
	}
}

// CREATE ONE
export const createTherapy = (req: any, res: any) => {
	const username = req.body.username
	const exerciseTypes = JSON.parse(req.body.exerciseTypes)
	const startDate = Date.parse(req.body.startDate)
	const endDate = Date.parse(req.body.endDate)

	const datesError = _wrongDates(startDate, endDate)
	const typesError = _wrongExTypes(exerciseTypes)

	if (typesError) {
		res.json(typesError)
	} else if (datesError) {
		res.json(datesError)
	} else {
		// dates and types are valid
		const patient = Patient.findOne({ username: username })

		if (patient === null) {
			// no patient found, error then
			res.json({ error: 'No patient found with this username' })
		} else {
			// GOOD, patient found, let's save the TherapyPhase
			const therapyPhase = new TherapyPhase({
				username: username,
				startDate: startDate,
				endDate: endDate,
				exerciseTypes: exerciseTypes,
			})

			therapyPhase
				.save()
				.then((therapyPhase: any) => {
					res.json(therapyPhase)
				})
				.catch((err: any) => {
					res.json({ error: 'Saving to DB failed' })
				})
			//save here
		}
	}
}

// if (patient == null) {
//   const patient = Patient({
//     username: username,
//     password: password,
//     fullName: fullName,
//     age: age,
//   });
//   patient
//     .save()
//     .then((pat) => {
//       res.send(pat);
//     })
//     .catch((err) => {
//       res.json({ error: 'Saving to DB failed' });
//     });
// } else {
//   res.json({ error: 'Username already taken' });
// }
