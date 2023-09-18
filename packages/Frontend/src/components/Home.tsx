import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts'

export const Home: React.FC = () => {
	const { getAuthStatus: getSignedIn } = useContext(AuthContext)

	useEffect(() => {
		getSignedIn(true)
	}, [])

	return (
		<div className="flex justify-center align-middle h-100">
			<span className="text-xl py-10">Home page</span>
			<br />
		</div>
	)
}
