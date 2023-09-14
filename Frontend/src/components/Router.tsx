import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './Home';
// import Navbar from './Navbar';
// import SignIn from './SignIn';
// import SignOutBtn from './SignOutBtn';
// import Statistics from './stats/Statistics';
import React, { useContext } from 'react'
import { AuthContext } from '../contexts'

export const Router: React.FC = () => {
	const { signedIn } = useContext(AuthContext)
	return (
		<>
			<BrowserRouter>
				{/* <Navbar /> */}
				<Routes>
					<Route path="/" element={<p>HELLO THERE</p>} />
					{/* <Route exact path="/" element={<Home />} />
					<Route exact path="/about" element={<div>About page</div>} />
					<Route exact path="*" element={<Home />} /> */}
					{signedIn === false ? (
						<>{/* <Route exact path="/sign-in" element={<SignIn />} /> */}</>
					) : (
						<>
							{/* <Route exact path="/stats" element={<Statistics />} />
							<Route exact path="/sign-out" element={<SignOutBtn />} /> */}
						</>
					)}
				</Routes>
			</BrowserRouter>
		</>
	)
}
