// import { Children } from "react";
// import { createContext, useEffect, useState, useContext } from "react";
// import { supabase } from "../supa/supabaseClient";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [session, setSession] = useState(undefined);

//   //회원가입
//   const signUpNewUser = async ({ email, password }) => {
//     const { data, error } = await supabase.auth.signUp({
//       email: form.email,
//       password: form.password,
//       userName: form.name,
//     });

//     if (error) {
//       console.error("회원가입 오류 발생", error);
//       return { success: false, error };
//     }
//     return { success: true.data };
//   };

//   //로그인
//   const LogInUser = async ({ email, password }) => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });
//       if (error) {
//         console.error("로그인에서 오류: ", error);
//         return { success: false, error: error.message };
//       }
//       console.log("로그인 성공: ", data);
//       return { success: true, data };
//     } catch (error) {
//       console.error("오류 발생: ", error);
//     }
//   };

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);

//   // 로그아웃
//   const signOut = () => {
//     const { error } = supabase.auth.signOut();
//     if (error) {
//       console.error("오류발생", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         session,
//         signUpNewUser,
//         signOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
