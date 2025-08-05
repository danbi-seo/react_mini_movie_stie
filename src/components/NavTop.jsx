import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import movie_logoW from "../assets/movie_logoW.png";
import { IoPersonSharp } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { UserMenuModal } from "./UserMenuModal";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import { localStorageUtils, USER_INFO_KEY } from "../supabase/utilities";

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
  width: 60%;
  height: auto;
`;

const UserProfileContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const StyledPersonIconWrapper = styled.div`
  display: flex;
  position: relative; /* 모달 위치 설정을 위해 */
`;

const StyledPersonIcon = styled(IoPersonSharp)`
  display: flex;
  right: 0;
  margin-top: 5px;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const UserName = styled.span`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  margin-top: 10px;
  font-size: 16px;
  color: white;
`;

const DarkModeToggle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  font-size: 1.8rem;
  color: #a0a0a0;
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
  const [userName, setUserName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");
  const iconRef = useRef(null); // 아이콘 DOM 요소 참조를 위한 ref
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태

  useEffect(() => {
    const userInfo = localStorageUtils().getItemFromLocalStorage(
      USER_INFO_KEY.customKey
    );
    console.log("userInfo from localStorage:", userInfo);
    //userInfo.id로 로그인 상태를 확인
    if (userInfo && userInfo.id) {
      setIsLoggedIn(true);
      setUserName(userInfo.user_metadata.name);
      setUserProfileImg(userInfo.user_metadata?.profile_img || "");
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setUserProfileImg("");
    }

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

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
      setIsLoginModalOpen(!isLoginModalOpen);
    } else {
      // 로그인 상태일 때는 유저 메뉴 모달을 토글합니다.
      setIsUserMenuOpen(!isUserMenuOpen);
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleUserMenuClose = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    // 로그아웃 로직 (로컬 스토리지 정보 제거)
    localStorageUtils().removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    setIsLoggedIn(false);
    handleUserMenuClose();
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
        <UserProfileContainer>
          {isLoggedIn && userName && <UserName>{userName} 님</UserName>}
          <StyledPersonIconWrapper ref={iconRef} onClick={handleIconClick}>
            {isLoggedIn && userProfileImg ? (
              <UserProfileImage src={userProfileImg} alt="Profile" />
            ) : (
              <StyledPersonIcon />
            )}
          </StyledPersonIconWrapper>
        </UserProfileContainer>
        <DarkModeToggle onClick={toggleDarkMode} className="mt-[6px]">
          {isDarkMode ? <FaToggleOn /> : <FaToggleOff />}
        </DarkModeToggle>
      </NavHeader>

      {!isLoggedIn && isLoginModalOpen && (
        <LoginModal onClose={handleLoginModalClose} />
      )}
      {isLoggedIn && isUserMenuOpen && (
        <UserMenuModal onClose={handleUserMenuClose} onLogout={handleLogout} />
      )}
    </NavContainer>
  );
};

export default NavTop;
