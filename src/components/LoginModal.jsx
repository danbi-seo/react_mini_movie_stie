import { RiGiftFill } from "react-icons/ri";
import { TbBrandKakoTalk } from "react-icons/tb";
import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

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
`

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
`

const CloseButton = styled.button`
  background: none;
  top: 20px;
  position: absolute;
  right: 20px;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover{
    color: white;
  }
`

const MessageText = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0;
  color: white;
`

const ModalImage = styled(RiGiftFill)`
  font-size: 6rem;
  margin-bottom: 30px;
`

const EmailLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4263EB;
  color: black;
  padding: 15px 20px;
  margin-bottom: 10px;
  /* border: none; */
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;

  &:hover{
    opacity: 0.8;
  }
`

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

  &:hover{
    opacity: 0.8;
  }
`

const KakaoIcon = styled(TbBrandKakoTalk)`
  margin-right: 8px;
  color: black;
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 8px;
`

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

  &:hover{
    opacity: 0.8;
  }
`

const GoogleIcon = styled(FcGoogle)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 8px;
`;

const EasySignUp = styled.button`
  font-size: 13px;
  font-weight: 200;
  a {
    color: #4263EB;
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
  &:hover{
    color: white;
  }
`



export const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    onClose();
    navigate('/login');
  }
  // 실제 로그인 로직
  const handleKakaoLogin = () => {
    onClose();
    navigate('/kakao-login');
  };

  const handleGoogleLogin = () => {
    onClose();
    navigate('/google-login');
  }

  const handleSignUpClick = (e) => {
    e.preventDefault(); // 기본 링크 동작 방지
    onClose();
    navigate('/signup')
  }

  return(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <MessageText>
          로그인하고 모든 기능을<br/>자유롭게 사용해보세요!
        </MessageText>
        <ModalImage />
        <EmailLoginButton onClick={handleEmailLogin}>
          이메일로 시작하기
        </EmailLoginButton>
        <KakaoLoginButton onClick={handleKakaoLogin}>
          <KakaoIcon src="https://developers.kakao.com/assets/img/about/logos/kakaologin/kr/22_point_medium.png" alt="카카오 아이콘" />
          카카오로 시작하기
        </KakaoLoginButton>
        <GoogleLoginButton onClick={handleGoogleLogin}>
          <GoogleIcon />
          구글로 로그인
        </GoogleLoginButton>
      <EasySignUp>아직 회원이 아니신가요? <a onClick={handleSignUpClick}>회원가입</a></EasySignUp>
      <CloseText onClick={onClose}>닫기</CloseText>
      </ModalContent>
    </ModalOverlay>
  )
}

