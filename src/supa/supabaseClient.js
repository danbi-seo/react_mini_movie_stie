import { createContext, useContext } from "react";
import { supabaseEnv } from "../utilities";
import { createClient } from "@supabase/supabase-js";

// supabase 로그인 유지 세션 생성
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseApikey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseApikey);

// supabase client를 사용하기 위한 Provider 생성

export const SupabaseProvider = ({ Children }) => {
  return <SUPABASE.Provider value={supabaseClient}></SUPABASE.Provider>;
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    new Error("supabase에서 초기화 문제 발생");
    return;
  }
  return supabase;
};
