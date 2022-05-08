import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function Home(props) {
  const { signedIn } = useContext(AuthContext);
  return (
    <div>
      <h1>Home page</h1>
      <br />
    </div>
  );
}

export default Home;
