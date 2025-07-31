import React from "react";
import { useSupabaseAuth } from "../supabase";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const { getUserInfo, signOut } = useSupabaseAuth(); // signOut과 getUserInfo 훅 가져오기
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      if (userInfo?.user) {
        setUser(userInfo.user);
      } else {
        navigate("/mypage"); // 로그인 상태가 아니면 여기로 이동
      }
    };
    fetchUserInfo();
  }, [getUserInfo, navigate]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(); // signOut 호출하여 로그아웃 처리
      navigate("/");
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <div>
      <h1>DashBoard</h1>
      <h2>환영합니다, {session?.user?.email}</h2>
      <div>
        <p onClick={handleSignOut}>로그아웃</p>
      </div>
    </div>
  );
};

export default DashBoard;
