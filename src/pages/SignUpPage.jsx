import React, { useState } from "react";
import styled from "styled-components"; // styled-components import 필요
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSupabaseAuth } from "../supabase";

const LoginPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #101322;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
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

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 재입력 상태 추가
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp } = useSupabaseAuth(); // useSupabaseAuth에서 signUp 함수 가져오기
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 간단 유효성 검사 예시
    if (!email.includes("@")) {
      setEmailError("유효한 이메일을 입력하세요.");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      return;
    } else if (password !== passwordConfirm) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setPasswordError("");
    }

    setLoading(true);
    try {
      const result = await signUp({ email, password, userName });
      if (result.user) {
        navigate("/dashboard");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("회원가입 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </BackButton>
        <HeaderTitle>회원가입</HeaderTitle>
      </Header>
      <LoginBox>
        <form
          onSubmit={handleSignUp}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <InputGroup>
            <Input
              type="text"
              placeholder="이름 입력"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputGroup>
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
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="8자 이상 입력 (문자/숫자/기호 사용 가능)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="비밀번호 재입력"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </InputGroup>

          <LoginButton type="submit" disabled={loading}>
            {loading ? "로딩중..." : "회원가입"}
          </LoginButton>

          {error && <ErrorText>{error}</ErrorText>}
        </form>
      </LoginBox>
    </LoginPageContainer>
  );
};

export default SignUpPage;
