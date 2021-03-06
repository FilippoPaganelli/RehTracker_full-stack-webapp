import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { useContext } from 'react';
import Logo from '../images/LogoTransparent.png';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { signedIn } = useContext(AuthContext);
  return (
    <div>
      <Nav style={{ marginTop: -10, marginLeft: -10, marginRight: -10 }}>
        <NavLink to="/">
          <img className="Logo" height="75" width="225" src={Logo} alt="Logo" />
        </NavLink>
        <Bars />

        <NavMenu>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
          {signedIn === true && <NavLink to="/stats">Statistics</NavLink>}
        </NavMenu>

        <NavMenu>
          {signedIn === false && (
            <>
              {/* <NavBtnLink to="/sign-up">Sign Up</NavBtnLink> */}
              <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
            </>
          )}
          {signedIn === true && (
            <NavBtnLink to="/sign-out">Sign Out</NavBtnLink>
          )}
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Navbar;

export const Nav = styled.nav`
  background-image: linear-gradient(
    to bottom right,
    #06d6a0,
    #06acd6,
    #437fce,
    #845ec2
  );
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1900px) / 2);
  z-index: 10;
  justify-content: flex-start;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0;
  width: 100vw;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 20px;
  justify-content: flex-end;
  width: 100vw;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 0;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
