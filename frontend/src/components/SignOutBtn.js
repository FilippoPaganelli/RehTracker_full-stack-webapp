import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext, {
  API_URL,
  setGlobalUsername,
} from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignOutBtn() {
  const { getSignedIn, setGlobalUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  async function signOut() {
    await axios.get(API_URL + '/api/auth/sign-out');
    await getSignedIn();
    setGlobalUsername(undefined);
    navigate('/');
  }

  return <button onClick={signOut}>Sign Out</button>;
}

export default SignOutBtn;
