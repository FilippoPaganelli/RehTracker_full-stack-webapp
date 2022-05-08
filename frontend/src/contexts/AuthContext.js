import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [signedIn, setSignedIn] = useState(false);

  async function getSignedIn() {
    const signedInRes = await axios.get(
      'http://localhost:5000/api/auth/signed-in'
    );
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

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://rehtracker.herokuapp.com'
    : 'http://localhost:5000';
export default AuthContext;
export { AuthContextProvider };
