import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiFillTrophy } from "react-icons/ai";
import { RiCompassFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";

const NavFooter = styled.div`
  width: 100%;
  background-color: #101322;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
  z-index: 999;
  height: 60px;
`;

const NavItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
`;

// 각 네비게이션 아이템
// .withConfig(): 특정 컴포넌트를 렌더링하고 동작시키는 방식을 설정(configure)할 수 있게 해주는 특별한 메서드
// shouldForwardProp: styled-components가 생성한 컴포넌트에 전달되는 모든 prop들을 검사하는 함수
const NavItem = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "active", // 'active' prop을 DOM으로 전달하지 않음
})`
  display: flex;
  width: 780px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-decoration: none;
  color: ${(props) => (props.active ? "white" : "#efefef")};
  font-size: 0.75rem;
  font-weight: ${(props) => (props.active ? "700" : "400")};
  transition: color 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
`;

// 아이콘 자체 스타일
const NavIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBottom = () => {
  const location = useLocation();
  // 현재 경로가 각 버튼의 to 경로와 일치하는지 확인
  const isActive = (path) => location.pathname === path;

  return (
    <NavFooter>
      <NavItemContainer>
        <NavItem to="/" active={isActive("/")}>
          <NavIcon>
            <AiFillHome />
          </NavIcon>
          홈
        </NavItem>

        <NavItem to="/ranking" active={isActive("/ranking")}>
          <NavIcon>
            <AiFillTrophy />
          </NavIcon>
          랭킹
        </NavItem>

        <NavItem to="/explore" active={isActive("/explore")}>
          <NavIcon>
            <RiCompassFill />
          </NavIcon>
          탐색
        </NavItem>

        <NavItem to="/dashboard" active={isActive("/dashboard")}>
          <NavIcon>
            <IoPersonSharp />
          </NavIcon>
          마이페이지
        </NavItem>
      </NavItemContainer>
    </NavFooter>
  );
};

export default NavBottom;
