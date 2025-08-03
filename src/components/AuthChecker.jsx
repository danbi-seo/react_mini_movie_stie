import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase/auth/index";

const AuthChecker = ({ children }) => {
  const { getUserInfo } = useSupabaseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { user } = await getUserInfo();
        console.log("user", user);
        if (user) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("인증 상태 확인 오류:", error);
        navigate("/mypage");
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [getUserInfo, navigate]);

  if (loading) {
    return <div>로그인 상태를 확인 중입니다...</div>;
  }

  return children;
};

export default AuthChecker;
