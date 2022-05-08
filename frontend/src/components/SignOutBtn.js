import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignOutBtn() {
  const { getSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function signOut() {
    await axios.get('http://localhost:5000/api/auth/sign-out');
    await getSignedIn();
    navigate('/');
  }

  return <button onClick={signOut}>Sign Out</button>;
}

export default SignOutBtn;
