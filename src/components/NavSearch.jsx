import React, { useState } from "react";
import styled from "styled-components"
import { Outlet, useNavigate } from "react-router-dom"

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
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 검색창 클릭 시 바로 검색 페이지로 이동
  const handleSearchClick = () => {
    console.log("검색 페이지로 이동");
    navigate(`/search/results`);  // 클릭만으로 SearchPage로 이동
  };

  return (
    <div>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="🔍 영화 이름을 검색해 보세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // 입력값 업데이트
          onClick={handleSearchClick} // 클릭하면 검색 페이지로 이동
        />
      </SearchWrapper>
      <Outlet />
    </div>
  );
};    