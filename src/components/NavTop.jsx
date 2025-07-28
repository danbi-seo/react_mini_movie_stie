import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import movie_logoW from '../assets/movie_logoW.png'

const NavContainer = styled.nav`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
`
const NavHeader =styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0px;
`

const NavBrand = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 5px 0;
`

const NavLogo = styled.img `
  width: 40%;
  height: auto;
`

const NavTop = () => {
  return(
    <NavContainer>
      <NavHeader>
        <NavBrand to="/">
          <NavLogo src={movie_logoW}/>
        </NavBrand>
      </NavHeader>
    </NavContainer>
  )
}

export default NavTop;