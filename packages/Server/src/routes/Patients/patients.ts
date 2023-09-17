import { Patient } from '../../models'

// GET ALL
export const getPatients = async (req: any, res: any) => {
	const patients = await Patient.count()

	console.log(patients)

	Patient.find()
		.then(patients => res.json(patients))
		.catch(err => res.status(400).json({ error: 'No patients found' }))
}
