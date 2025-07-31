import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const LoginPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #101322;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; // 상단 헤더가 있으므로 중앙 정렬 대신 flex-start 또는 패딩 */
  position: relative;
  overflow: hidden;
  padding-top: 60px;
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
    z-index: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  max-width: 780px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #101322;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    opacity: 0.7;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #101322;
`;

const LoginBox = styled.div`
  background-color: transparent;
  border-radius: 12px;
  padding: 30px 20px;
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1;
  box-sizing: border-box;
  margin-top: 80px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #3b4869;
  border-radius: 8px;
  background-color: #172036;
  color: white;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: #275cd6;
  }
`;

const ErrorText = styled.p`
  color: #d43030;
  font-size: 15px;
  margin: 3px 5px;
  text-align: left;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #275cd6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 50px;

  &:hover {
    background-color: #3e6ecb;
  }
`;

const StyledLink = styled.a`
  color: #a0a0a0;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 15px;

  &:hover {
    text-decoration: underline;
    color: #fff;
  }
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 중단시키는 메서드, 폼 제출 시 페이지가 새로고침되는 기본 동작을 막음
    let isValid = true;

    const emailRegex =
      /^[a-zA-Z0-9가-힣]{2,8}@[a-zA-Z0-9가-힣]+\.[a-zA-Z가-힣]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 양식으로 입력해주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      // 8자는 넘지만 조합이 맞지 않는 경우
      setPasswordError("비밀번호: 영어 대문자/소문자 + 숫자의 조합 사용");
      isValid = false;
    } else {
      // 모든 조건을 만족하는 경우
      setPasswordError("");
    }

    if (isValid) {
      console.log("로그인 시도:", { email, password });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <LoginPageContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <IoIosArrowBack />
        </BackButton>
        <HeaderTitle>이메일 로그인</HeaderTitle>
      </Header>
      <LoginBox>
        <form
          onSubmit={handleLoginSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          {" "}
          {/* gap은 InputGroup이 가짐 */}
          <InputGroup>
            <Input
              type="email"
              placeholder="이메일 주소 입력"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && <ErrorText>{emailError}</ErrorText>}
            <Input
              type="text"
              placeholder="8자 이상 입력 (문자/숫자/기호 사용 가능)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </InputGroup>
          <LoginButton type="submit">로그인</LoginButton>
        </form>
        <StyledLink
          href="#"
          onClick={() => alert("비밀번호 재설정 (구현 예정)")}
        >
          비밀번호 재설정
        </StyledLink>
      </LoginBox>
    </LoginPageContainer>
  );
};
