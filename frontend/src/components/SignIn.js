import React, { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignIn(props) {
  const { getSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function SigninUser(event) {
    event.preventDefault();

    try {
      await axios
        .post(`http://localhost:5000/api/auth/sign-in`, {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.error) {
            console.log('- server_err: ' + res.data.error);
            alert('Please, check your username or password...');
          } else {
            console.log('Sign in correct');
            navigate('/');
          }
        });

      getSignedIn();
    } catch (error) {
      alert('Please, check your username/password combination');
    }
  }

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={SigninUser}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
}

export default SignIn;
