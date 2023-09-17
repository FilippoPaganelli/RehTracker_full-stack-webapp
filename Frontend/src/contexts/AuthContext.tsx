import React, { createContext, useEffect, useState } from 'react'
import { SignedInResponse, StatisticsItem } from '../shared'

interface Auth {
	stats: any
	authStatus: SignedInResponse
	getAuthStatus: (fromSignOut: boolean) => void
	globalDate: Date
	setGlobalDate: any
	getStats: any
	API_URL: string
}

export const API_URL =
	process.env.NODE_ENV === 'production' ? 'https://rehtracker.herokuapp.com' : 'http://localhost:5000'

export const AuthContext = createContext<Auth>({
	stats: undefined,
	authStatus: { username: null },
	getAuthStatus: () => {},
	globalDate: new Date(),
	setGlobalDate: () => {},
	getStats: () => {},
	API_URL,
})

export const AuthContextProvider: React.FC<{ children?: React.ReactNode }> = props => {
	const [authStatus, setAuthStatus] = useState<SignedInResponse>({ username: null })
	const [stats, setStats] = useState<StatisticsItem[]>([])
	const [globalDate, setGlobalDate] = useState<Date>(new Date())

	async function getSignedIn(fromSignOut: boolean) {
		const prevSignedIn = authStatus.username

		const signedInResponse = await fetch(API_URL + '/api/auth/signed-in', {
			method: 'GET',
			credentials: 'include',
		}).then(res => {
			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`)
			}

			return res.json() as Promise<SignedInResponse>
		})

		if (!fromSignOut && prevSignedIn && !signedInResponse) {
			alert('Authorisation timeout, please sign in again...')
		}

		setAuthStatus(signedInResponse)
	}

	async function getStats() {
		const statsData = await fetch(API_URL + '/api/exercises/get', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: authStatus.username,
				date: globalDate,
			}),
		}).then(res => {
			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`)
			}

			return res.json() as Promise<StatisticsItem[]>
		})

		setStats(statsData)
	}

	useEffect(() => {
		if (authStatus.username !== null) {
			getSignedIn(false)
			getStats()
		}
	}, [globalDate])

	return (
		<AuthContext.Provider
			value={{
				stats,
				authStatus: authStatus,
				getAuthStatus: getSignedIn,
				globalDate,
				setGlobalDate,
				getStats,
				API_URL,
			}}>
			{props.children}
		</AuthContext.Provider>
	)
}
