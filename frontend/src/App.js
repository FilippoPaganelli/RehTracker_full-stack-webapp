import './App.css';
import React from 'react';
import { AuthContextProvider } from './contexts/AuthContext';
import axios from 'axios';
import Router from './components/Router';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
