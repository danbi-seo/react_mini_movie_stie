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
import { supabase } from "../supabase";

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
  width: 35px;
  height: 35px;
  margin-top: 7px;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [userName, setUserName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");
  const iconRef = useRef(null); // 아이콘 DOM 요소 참조를 위한 ref
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태

  const getDisplayName = (u) => {
    if (!u) return "사용자";
    const fromCustom = u.user_metadata?.userName;
    const fromMeta = u.user_metadata?.name || u.user_metadata?.full_name;
    const emailLocal = u.email ? u.email.split("@")[0] : "";
    return fromCustom || fromMeta || emailLocal || "사용자";
  };

  const getProfileImg = (u) =>
    u?.user_metadata?.profile_img ||
    u?.user_metadata?.avatar_url ||
    u?.user_metadata?.picture ||
    u?.identities?.[0]?.identity_data?.picture ||
    "";

  useEffect(() => {
    // 1) 초기 세션 로드
    (async () => {
      const { data } = await supabase.auth.getUser();
      const u = data?.user;
      if (u) {
        setIsLoggedIn(true);
        setUserName(getDisplayName(u));
        setUserProfileImg(getProfileImg(u));
        localStorageUtils().setItemToLocalStorage(USER_INFO_KEY.customKey, u);
      }
    })();

    // 2) 세션 변경 구독
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      if (u) {
        setIsLoggedIn(true);
        setUserName(getDisplayName(u));
        setUserProfileImg(getProfileImg(u));
        localStorageUtils().setItemToLocalStorage(USER_INFO_KEY.customKey, u);
      } else {
        setIsLoggedIn(false);
        setUserName("");
        setUserProfileImg("");
        localStorageUtils().removeItemFromLocalStorage(USER_INFO_KEY.customKey);
      }
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  // dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const handleIconClick = () => {
    if (!isLoggedIn) setIsLoginModalOpen((v) => !v);
    else setIsUserMenuOpen((v) => !v);
  };

  const handleLoginModalClose = () => setIsLoginModalOpen(false);
  const handleUserMenuClose = () => setIsUserMenuOpen(false);

  const handleLogout = () => {
    localStorageUtils().removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    setIsLoggedIn(false);
    setUserName("");
    setUserProfileImg("");
    handleUserMenuClose();
    navigate("/");
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <NavContainer>
      <NavHeader>
        <NavBrand to="/">
          <NavLogo src={movie_logoW} alt="Movie Logo" />
        </NavBrand>
        <UserProfileContainer>
          {isLoggedIn && <UserName>{userName || "사용자"} 님</UserName>}

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
