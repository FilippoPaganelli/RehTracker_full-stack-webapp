import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function SignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function SigninUser(event) {
    event.preventDefault();

    axios
      .post(`http://localhost:5000/api/sign-in`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          console.log(res.data.token);
          localStorage.setItem('token', res.data.token);
          window.location.href = '/';
        } else {
          alert('Please, check your username/password combination!');
        }
      });
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
