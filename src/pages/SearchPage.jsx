import React from "react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { useSelector } from "react-redux";
import { selectMovieByRegExp } from "../RTK/selector";


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

export const SearchPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  //URL 쿼리 파라미터에서 검색어를 가져옴



  return(
    <SearchWrapper>
      <SearchInput type='text' placeholder='🔍  영화 이름을 검색해 보세요' />
    </SearchWrapper>
  )
}