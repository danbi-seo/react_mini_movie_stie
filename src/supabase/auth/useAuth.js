import { useSupabase } from "..";
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from "../utilities";

export const useAuth = () => {
  const supabase = useSupabase();
  const {
    getItemFromLocalStorage,
    removeItemFromLocalStorage,
    setItemToLocalStorage,
  } = localStorageUtils();

  // 로그아웃
  const logout = async () => {
    removeItemFromLocalStorage(USER_INFO_KEY.sbKey);
    removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    return await supabase.auth.signOut();
  };

  // user 정보 가져오기
  //   const getUserInfo = async () => {
  //     const localData = getItemFromLocalStorage(USER_INFO_KEY.sbKey);

  //     // if (localData) {
  //     //   const userInfo = changeFromDto({
  //     //     type: localData.user ? DTO_TYPE.user : DTO_TYPE.error,
  //     //     dto: localData,
  //     //   });
  //     //   if (userInfo.user) {
  //     //     setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
  //     //   }
  //     //   return userInfo;
  //     // }

  //     try {
  //       const { data, error } = await supabase.auth.getUser();
  //       if (error || !data?.user) {
  //         console.warn("No valid user found from supabase.");
  //         return null;
  //       }

  //       const userInfo = changeFromDto({
  //         type: DTO_TYPE.user,
  //         dto: { user: data.user, error: null },
  //       });

  //       setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
  //       return userInfo;
  //     } catch (err) {
  //       console.error("Failed to fetch user info:", err);
  //       return null;
  //     }
  //   };
  // };

  async function getUserInfo() {
    const {
      data: { userInfo },
      error,
    } = await supabase.auth.getUser();
    if (error && error.message !== "Auth session missing!") {
      console.error("사용자 정보 조회 실패:", error.message);
    }
    return userInfo;
  }
};
