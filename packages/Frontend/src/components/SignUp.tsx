import React from 'react'
import { useState } from 'react'

export const SignUp: React.FC = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function SigninUser(event: React.FormEvent) {
		event.preventDefault()

		// axios
		// 	.post(`http://localhost:5000/api/auth/sign-up`, {
		// 		username: username,
		// 		password: password,
		// 	})
		// 	.then(res => {
		// 		console.log(res.data)
		// 		if (res.data.token) {
		// 			console.log(res.data.token)
		// 			localStorage.setItem('token', res.data.token)
		// 			window.location.href = '/'
		// 		} else {
		// 			alert('Please, check your username/password combination!')
		// 		}
		// 	})
	}

	return (
		<>
			<h1>Sign up</h1>
			<form onSubmit={SigninUser}>
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
		</>
	)
}
