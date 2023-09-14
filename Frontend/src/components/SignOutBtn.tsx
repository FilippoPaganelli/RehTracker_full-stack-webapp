import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AuthContext, API_URL } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const SignOutBtn: React.FC = () => {
	const { getSignedIn, setGlobalUsername } = useContext(AuthContext)
	const navigate = useNavigate()

	async function signOut() {
		await axios.get(API_URL + '/api/auth/sign-out', { withCredentials: true })

		getSignedIn(true)
		setGlobalUsername(undefined)
		navigate('/')
	}

	useEffect(() => {
		if (window.confirm('Are you sure you want to sign out?')) {
			signOut()
		} else navigate('/stats')
	}, [])

	return null
}
