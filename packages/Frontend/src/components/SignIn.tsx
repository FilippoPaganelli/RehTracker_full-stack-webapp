import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, API_URL } from '../contexts/AuthContext'

export const SignIn: React.FC = () => {
	const { getAuthStatus: getSignedIn } = useContext(AuthContext)
	const navigate = useNavigate()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	function SigninUser(event: React.FormEvent) {
		event.preventDefault()

		fetch(API_URL + `/api/auth/sign-in`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		}).then(res => {
			if (!res.ok) {
				alert('Please, check your username or password...')
				throw new Error(`${res.status} ${res.statusText}`)
			} else {
				getSignedIn(false)
				navigate('/stats')
			}
		})
	}

	return (
		<div className="flex justify-center align-middle h-100">
			<form className="flex-col p-4 gap-4" onSubmit={SigninUser}>
				<h1>Sign in</h1>
				<input
					value={username}
					onChange={e => setUsername(e.target.value)}
					type="text"
					placeholder="Username"
				/>
				<br />
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Sign In" />
			</form>
		</div>
	)
}
