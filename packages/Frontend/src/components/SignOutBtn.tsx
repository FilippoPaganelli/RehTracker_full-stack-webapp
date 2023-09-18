import React, { useContext, useEffect } from 'react'
import { AuthContext, API_URL } from '../contexts'
import { useNavigate } from 'react-router-dom'

export const SignOutBtn: React.FC = () => {
	const navigate = useNavigate()

	async function signOut() {
		await fetch(API_URL + '/api/auth/sign-out', { method: 'GET', credentials: 'include' })
	}

	useEffect(() => {
		if (window.confirm('Are you sure you want to sign out?')) {
			signOut().then(() => navigate('/'))
		} else {
			navigate('/stats')
		}
	}, [])

	return null
}
