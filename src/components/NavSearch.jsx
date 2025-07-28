import React from "react"
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0 10px;
  position: relative;
  height: 50px;
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 14px;
  border: none;
  border-radius: 7px;
  outline: none;
  margin-top: 14px;
  background-color: #25304a;
  color: white;
  padding: 20px;
  position: relative;
  height: 40px;
  z-index: 1;
`

export const NavSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 홈페에지에서만 검색창이 보이게 조건 추가
  const isHomePage = location.pathname === '/';
  // 검색창을 클릭하면 검색페이지로 이동
  const handleSearchClick = () => {
    if(isHomePage){
    navigate('/search'); 
    }
  };

  return (
    isHomePage && (
    <SearchWrapper onClick={handleSearchClick}>
      <SearchInput type='text' placeholder='🔍  영화 이름을 검색해 보세요' />
    </SearchWrapper>
    )
  )
}