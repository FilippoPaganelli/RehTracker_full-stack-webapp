import React from 'react';
import Logo from './images/LogoTransparent.png';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img className="Logo" height = "75" width="225" src={Logo} alt = "Logo"/>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/services'>
            Services
          </NavLink>
          <NavLink to='/about'>
            About Us 
          </NavLink>
          <NavLink to='/contact-us'>
            Contact Us
          </NavLink>
        </NavMenu>
        <NavBtn>
        <NavLink to='/sign-up'>
            Sign Up
          </NavLink>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
