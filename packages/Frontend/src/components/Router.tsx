import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Navbar, SignIn, SignOutBtn, Statistics } from '.'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts'

export const Router: React.FC = () => {
	const { authStatus: signedIn } = useContext(AuthContext)

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="*" element={<Home />} />
					<Route path="/" element={<Home />} />
					{signedIn.username ? (
						<>
							<Route path="/stats" element={<Statistics />} />
							<Route path="/sign-out" element={<SignOutBtn />} />
						</>
					) : (
						<>
							<Route path="/sign-in" element={<SignIn />} />
						</>
					)}
				</Routes>
			</BrowserRouter>
		</>
	)
}
