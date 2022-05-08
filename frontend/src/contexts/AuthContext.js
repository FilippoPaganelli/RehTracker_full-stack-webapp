import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://rehtracker.herokuapp.com'
    : 'http://localhost:5000';

function AuthContextProvider(props) {
  const [signedIn, setSignedIn] = useState(false);

  async function getSignedIn() {
    const signedInRes = await axios.get(API_URL + '/api/auth/signed-in');
    setSignedIn(signedInRes.data);
  }

  useEffect(() => {
    getSignedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, getSignedIn, API_URL }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { API_URL };
export default AuthContext;
export { AuthContextProvider };
