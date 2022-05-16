import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://rehtracker.herokuapp.com'
    : 'http://localhost:5000';

function AuthContextProvider(props) {
  const [signedIn, setSignedIn] = useState(false);
  const [stats, setStats] = useState(undefined);
  const [globalUsername, setGlobalUsername] = useState(undefined);
  const [globalDate, setGlobalDate] = useState(Date());

  async function getSignedIn() {
    const signedInRes = await axios.get(API_URL + '/api/auth/signed-in');
    if (!signedInRes.data) {
      setGlobalUsername(undefined);
    }
    setSignedIn(signedInRes.data);
  }

  async function getStats() {
    const statsData = await axios.post(API_URL + '/api/exercises/get', {
      username: globalUsername,
      date: globalDate,
    });
    setStats(statsData.data);
  }

  // useEffect(() => {
  //   console.log(globalUsername);
  // }, [globalUsername]);

  useEffect(() => {
    getSignedIn();
  }, []);

  // useEffect(() => {
  //   getStats();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        getSignedIn,
        setGlobalUsername,
        setGlobalDate,
        API_URL,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { API_URL };
export default AuthContext;
export { AuthContextProvider };
