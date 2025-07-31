import React, { useState } from "react";
import styled from "styled-components"; // styled-components import 필요
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";

const LoginBox = styled.div``;

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
      const result = await signUp(email, password, userName);
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
    <div>
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
    </div>
  );
};

export default SignUpPage;
