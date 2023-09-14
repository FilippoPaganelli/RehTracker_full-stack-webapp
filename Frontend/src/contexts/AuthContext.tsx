import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

interface Auth {
	stats: any
	signedIn: boolean
	getSignedIn: (fromSignOut: boolean) => void
	globalDate: Date | undefined
	globalUsername: string | undefined
	setGlobalUsername: any
	setGlobalDate: any
	getStats: any
	API_URL: string
}

export const API_URL =
	process.env.NODE_ENV === 'production' ? 'https://rehtracker.herokuapp.com' : 'http://localhost:5000'

export const AuthContext = createContext<Auth>({
	stats: undefined,
	signedIn: false,
	getSignedIn: () => {},
	globalDate: undefined,
	globalUsername: undefined,
	setGlobalUsername: () => {},
	setGlobalDate: () => {},
	getStats: () => {},
	API_URL,
})

export const AuthContextProvider: React.FC<{ children?: React.ReactNode }> = props => {
	const [signedIn, setSignedIn] = useState<boolean>(false)
	const [stats, setStats] = useState(undefined)
	const [globalUsername, setGlobalUsername] = useState<string | undefined>(undefined)
	const [globalDate, setGlobalDate] = useState<Date | undefined>(undefined)

	async function getSignedIn(fromSignOut: boolean) {
		const prevSignedIn = signedIn
		const signedInRes = await axios.get(API_URL + '/api/auth/signed-in', {
			withCredentials: true,
		})
		if (!fromSignOut && prevSignedIn && !signedInRes.data) {
			alert('Authorisation timeout, please sign in again...')
		}
		setSignedIn(signedInRes.data)
	}

	async function getStats() {
		const statsData = await axios.post(
			API_URL + '/api/exercises/get',
			{
				username: globalUsername,
				date: globalDate,
			},
			{ withCredentials: true }
		)
		setStats(statsData.data)
	}

	useEffect(() => {
		getStats()
	}, [globalDate])

	useEffect(() => {
		getSignedIn(false)
	}, [globalDate])

	return (
		<AuthContext.Provider
			value={{
				stats,
				signedIn,
				getSignedIn,
				globalDate,
				globalUsername,
				setGlobalUsername,
				setGlobalDate,
				getStats,
				API_URL,
			}}>
			{props.children}
		</AuthContext.Provider>
	)
}
