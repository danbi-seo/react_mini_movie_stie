import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbBrandKakoTalk } from "react-icons/tb";
import { useSupabaseAuth } from "../supabase/auth/index";

const MyPageContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 60px);
  /* background-color: #101322;  */
  color: #e0e0e0;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* background-image: url('https://static.kinolights.com/bg/login-bg.png'); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.7); */
    z-index: 0;
  }
`;

const ContentBox = styled.div`
  background-color: rgba(26, 30, 42, 0.85);
  border-radius: 10px;
  padding: 40px 30px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1;
`;

const LogoPlaceholder = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #f5c518;
  margin-bottom: 10px;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  color: #a0a0a0;
  line-height: 1.6;
`;

const LoginButton = styled.button`
  background-color: #275cd6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;
  ‰ &:hover {
    background-color: #3e6ecb;
  }
`;

const EmailLoginButton = styled.button``;

const SignUpLink = styled.p`
  font-size: 0.9rem;
  color: #a0a0a0;

  a {
    color: #f5c518;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee500;
  color: black;
  padding: 8px 20px;
  margin-bottom: 10px;
  /* border: none; */
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const KakaoIcon = styled(TbBrandKakoTalk)`
  margin-right: 8px;
  color: black;
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 8px;
`;

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  padding: 8px 25px 8px 20px;
  margin-bottom: 10px;
  /* border: none; */
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const GoogleIcon = styled(FcGoogle)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 8px;
`;

const EasySignUp = styled.button`
  font-size: 13px;
  font-weight: 200;
  a {
    color: #4263eb;
    font-weight: bold;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
`;

export const MyPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { loginWithKakao, loginWithGoogle } = useSupabaseAuth();

  // useSupabaseAuth에서 login과 logout 가져오기
  const { login, logout } = useSupabaseAuth();

  const handleEmailLogin = async (email, password) => {
    try {
      //로그인 함수 호출
      const result = await login(email, password);
      if (result.user) {
        navigate("/"); // 로그인 후 메인페이지로 이동
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요!");
      }
    } catch (error) {
      console.error("로그인오류:", error);
    }
  };

  // 카카오로그인 처리
  const handleKakaoLogin = async () => {
    console.log("MyPage: 카카오 로그인 함수 호출 시작");
    try {
      await loginWithKakao(`${window.location.origin}/kakao-login`);
    } catch (error) {
      console.error("카카오 로그인 오류", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("구글로 로그인 오류", error);
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault(); // 기본 링크 동작 방지
    navigate("/signup");
  };

  // 컴포넌트 마운트 시 또는 상태 변경 시 로그인 여부 확인
  // localStorage/sessionStorage에서 토큰 확인
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("로그아웃 오류: ", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <MyPageContainer>
      <ContentBox>
        {/* <LogoPlaceholder></LogoPlaceholder> */}
        <WelcomeText>
          로그인 후 나만의 영화 취향을 발견하고,
          <br />
          맞춤 콘텐츠를 추천받아보세요!
        </WelcomeText>
        <LoginButton onClick={handleLoginClick}>이메일로 시작하기</LoginButton>
        {/* <EmailLoginButton onClick={handleEmailLogin}>
          이메일로 시작하기
        </EmailLoginButton> */}
        <KakaoLoginButton onClick={handleKakaoLogin}>
          <KakaoIcon />
          카카오로 시작하기
        </KakaoLoginButton>
        <GoogleLoginButton onClick={handleGoogleLogin}>
          <GoogleIcon />
          구글로 로그인
        </GoogleLoginButton>
        <SignUpLink>
          계정이 없으신가요?{" "}
          <a href="#" onClick={handleSignUpClick}>
            회원가입
          </a>
        </SignUpLink>
      </ContentBox>
    </MyPageContainer>
  );
};
