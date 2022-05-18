import React from 'react';
import { AuthContextProvider } from './contexts/AuthContext';
import axios from 'axios';
import Router from './components/Router';

import 'react-day-picker/dist/style.css';
import './App.css';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
