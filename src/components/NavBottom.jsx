import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  color: white;
  padding-left: 20px;
  /* position: relative; */
  position: sticky;
  bottom: 0;
  z-index: 100;
`
const NavFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: #101322;
  align-items: center;
  position: fixed;
  bottom: 0;
`
const NavButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 -3px 7px rgba(0, 0, 0, 0.2);
`

const NavButton = styled.button`
  color: white;
  width: 100%;
  height: 50px;
  cursor: pointer;
  flex-grow: 1;
`

const NavBottom = () => {
  return(
    <NavContainer>
      <NavFooter>
        <NavButtons>
          <NavButton>홈</NavButton>
          <NavButton>랭킹</NavButton>
          <NavButton>탐색</NavButton>
          <NavButton>마이페이지</NavButton>
        </NavButtons>
      </NavFooter>
    </NavContainer>
  )
}

export default NavBottom;