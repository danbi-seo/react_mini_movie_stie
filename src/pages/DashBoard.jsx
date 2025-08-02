import React, { useState, useEffect } from "react";
import { useSupabaseAuth } from "../supabase/auth/index";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const { getUserInfo, logout } = useSupabaseAuth(); // signOut과 getUserInfo 훅 가져오기
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { user } = await getUserInfo();
      // 유저 정보가 없으면 MyPage로 보내는 로직을 제거했습니다.
      if (user) {
        setUser(user);
      }
    };
    fetchUserInfo();
  }, [getUserInfo]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await logout(); // logout 호출하여 로그아웃 처리
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>DashBoard</h1>
      {/* full_name : 주로 구글, 페이스북 같은 소셜 로그인 제공자들이 제공하는 값 */}
      {user ? (
        <h2>환영합니다, {user?.user_metadata?.username}</h2>
      ) : (
        <h2>사용자 정보를 불러오는 중입니다...</h2>
      )}
      <div>
        <p onClick={handleSignOut}>로그아웃</p>
      </div>
    </div>
  );
};

export default DashBoard;
