import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import movie_logoW from "../assets/movie_logoW.png";
import { IoPersonSharp } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { UserMenuModal } from "./UserMenuModal";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";

const NavContainer = styled.nav`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => (props.$isMyPage ? "transparent" : "#101322")};
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
`;
const NavHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  /* position: sticky; */
  margin: 5px 0;
`;

const NavBrand = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: bold;
  padding: 5px 0;
`;

const NavLogo = styled.img`
  width: 30%;
  height: auto;
`;
const StyledPersonIconWrapper = styled.div`
  display: flex;
`;

const StyledPersonIcon = styled(IoPersonSharp)`
  display: flex;
  right: 0;
  margin-top: 5px;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
`;

const DarkModeToggle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px; /* 아이콘과 다크모드 토글 버튼 사이 간격 */
  cursor: pointer;
  font-size: 1.8rem; /* 아이콘 크기 */
  color: #a0a0a0; /* 기본 색상 */
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
`;

const NavTop = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅 사용
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 안 했을 때 모달
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // 로그인 했을 때 유저 메뉴 모달
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 (시뮬레이션)
  const iconRef = useRef(null); // 아이콘 DOM 요소 참조를 위한 ref
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []); // <--- 이 부분에 다른 문자가 없는지 확인

  // 다크 모드 상태 변경 시 localStorage 업데이트 및 body 클래스 토글
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleIconClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      navigate("/mypage");
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  // 마우스 진입 시 유저 메뉴 열기
  const handleMouseEnter = () => {
    if (isLoggedIn) {
      setIsUserMenuOpen(true);
    }
  };

  // 마우스 이탈 시 유저 메뉴 닫기 (딜레이를 주어 부드럽게 닫히도록)
  const handleMouseLeave = () => {
    // 짧은 지연을 주어 사용자가 실수로 벗어나도 바로 닫히지 않게 함
    setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    // 로그아웃 로직
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <NavContainer>
      <NavHeader>
        <NavBrand to="/">
          <NavLogo src={movie_logoW} alt="Movie Logo" />
        </NavBrand>
        <StyledPersonIconWrapper
          ref={iconRef} // ref 연결
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleIconClick}
        >
          <StyledPersonIcon />

          {!isLoggedIn && isLoginModalOpen && (
            <LoginModal onClose={handleLoginModalClose} />
          )}
          {isLoggedIn && isUserMenuOpen && (
            <UserMenuModal
              onClose={() => setIsUserMenuOpen(false)}
              onLogout={handleLogout}
            />
          )}
        </StyledPersonIconWrapper>
        <DarkModeToggle onClick={toggleDarkMode} className="mt-[6px]">
          {isDarkMode ? <FaToggleOn /> : <FaToggleOff />}
        </DarkModeToggle>
      </NavHeader>
    </NavContainer>
  );
};

export default NavTop;
