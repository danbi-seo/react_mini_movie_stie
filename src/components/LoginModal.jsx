import { RiGiftFill } from "react-icons/ri";
import { TbBrandKakoTalk } from "react-icons/tb";
import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSupabaseAuth } from "../supabase";

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  width: 340px;
  height: 500px;
  background-color: #172036;
  padding: 30px 20px 20px 20px;
  border-radius: 12px;
  color: white;
  display: flex;
  text-align: center;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  top: 20px;
  position: absolute;
  right: 20px;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const MessageText = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0;
  color: white;
`;

const ModalImage = styled(RiGiftFill)`
  font-size: 6rem;
  margin-bottom: 30px;
`;

const EmailLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4263eb;
  color: black;
  padding: 15px 20px;
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

const CloseText = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 30px;
  &:hover {
    color: white;
  }
`;

export const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { login, logout, loginWithKakao, loginWithGoogle } = useSupabaseAuth();

  const handleEmailLogin = async (email, password) => {
    try {
      //로그인 함수 호출
      const result = await login(email, password);
      if (result.user) {
        onClose?.();
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

  // 컴포넌트 마운트 시 또는 상태 변경 시 로그인 확인
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
    onClose?.();
    navigate("/login");
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <MessageText>
          로그인하고 모든 기능을
          <br />
          자유롭게 사용해보세요!
        </MessageText>
        <ModalImage />
        <EmailLoginButton onClick={handleLoginClick}>
          이메일로 시작하기
        </EmailLoginButton>
        <KakaoLoginButton onClick={handleKakaoLogin}>
          <KakaoIcon />
          카카오로 시작하기
        </KakaoLoginButton>
        <GoogleLoginButton onClick={handleGoogleLogin}>
          <GoogleIcon />
          구글로 로그인
        </GoogleLoginButton>
        <EasySignUp>
          아직 회원이 아니신가요? <a onClick={handleSignUpClick}>회원가입</a>
        </EasySignUp>
        <CloseText onClick={onClose}>닫기</CloseText>
      </ModalContent>
    </ModalOverlay>
  );
};
