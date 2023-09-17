import React from 'react'
import { AuthContextProvider } from './contexts'
import { Router } from './components'

import 'react-day-picker/dist/style.css'
import './App.css'

function App() {
	return (
		<AuthContextProvider>
			<Router />
		</AuthContextProvider>
	)
}

export default App
