import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
  width: 100%;
  height: auto;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  color: white;
  padding-left: 20px;
  align-items: center;
  position: sticky;
  z-index: 100;
`

const NavBrand = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 5px;
`

const NavButtons = styled.div`
  display: flex;
  gap: 10px; 
  padding-right: 20px;
`

const NavButton = styled.button`
  background-color: #f5c518;
  color: white;
  height: 30px;
  margin: 5px;
  padding: 3px;
  border-radius: 5px;
`

const NavBar = () => {
  return(
    <NavContainer>
      <NavBrand to="/">Movie DB</NavBrand>
      <NavButtons>
        <NavButton>로그인</NavButton>
        <NavButton>회원가입</NavButton>
      </NavButtons>
    </NavContainer>
  )
}

export default NavBar;