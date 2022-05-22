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
  const [globalDate, setGlobalDate] = useState(undefined);

  async function getSignedIn(fromSignOut) {
    const prevSignedIn = signedIn;
    const signedInRes = await axios.get(API_URL + '/api/auth/signed-in', {
      withCredentials: true,
    });
    if (!fromSignOut && prevSignedIn && !signedInRes.data) {
      alert('Authorisation timeout, please sign in again...');
    }
    setSignedIn(signedInRes.data);
  }

  async function getStats() {
    const statsData = await axios.post(
      API_URL + '/api/exercises/get',
      {
        username: globalUsername,
        date: globalDate,
      },
      { withCredentials: true }
    );
    setStats(statsData.data);
  }

  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, [globalDate]);

  useEffect(() => {
    getSignedIn();
    // eslint-disable-next-line
  }, [globalDate]);

  return (
    <AuthContext.Provider
      value={{
        stats,
        signedIn,
        getSignedIn,
        globalDate,
        globalUsername,
        setGlobalUsername,
        setGlobalDate,
        getStats,
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
