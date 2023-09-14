// import React from 'react'
// import './App.css'

// function App() {
// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<p>
// 					Edit <code>src/App.js</code> and save to reload.
// 				</p>
// 				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
// 					Learn React
// 				</a>
// 			</header>
// 		</div>
// 	)
// }

// export default App

import React from 'react'
import axios from 'axios'
import { AuthContextProvider } from './contexts'
import { Router } from './components'

import 'react-day-picker/dist/style.css'
import './App.css'

axios.defaults.withCredentials = true

function App() {
	return (
		<AuthContextProvider>
			<Router />
		</AuthContextProvider>
	)
}

export default App
