import { useAuth } from "./useAuth";
import { useEmailAuth } from "./useEmail.auth";
import { useOAuth } from "./useOauth.auth";
import { supabase } from "../context/index";

export const useSupabaseAuth = () => {
  const { getUserInfo } = useAuth();
  const { login, signUp } = useEmailAuth();
  const { loginWithGoogle, loginWithKakao } = useOAuth();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      localStorage.removeItem("userInfo");
      console.log("로그아웃 성공: 로컬 스토리지 정보 삭제됨");
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
  };

  return {
    login,
    signUp,
    getUserInfo,
    logout,
    loginWithKakao,
    loginWithGoogle,
  };
};
