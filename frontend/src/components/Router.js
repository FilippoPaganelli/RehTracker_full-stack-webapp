import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOutBtn from './SignOutBtn';
import Statistics from './stats/Statistics';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function Router(props) {
  const { signedIn } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<div>About page</div>} />
          <Route exact path="*" element={<Home />} />
          {signedIn === false ? (
            <>
              <Route exact path="/sign-in" element={<SignIn />} />
              <Route exact path="/sign-up" element={<SignUp />} />
            </>
          ) : (
            <>
              <Route exact path="/stats" element={<Statistics />} />
              <Route exact path="/sign-out" element={<SignOutBtn />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
