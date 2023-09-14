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
