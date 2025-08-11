import { Provider } from "react-redux";
import MovieDetail from "./components/MovieDetail";
import movieDetailData from "./assets/data/movieDetailData.json";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NavSearch } from "./components/NavSearch";
import Layout from "./components/Layout";
import { SearchPage } from "./pages/SearchPage";
import { MyPage } from "./pages/MyPage";
import { LoginPage } from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashBoard from "./pages/DashBoard";
import AuthChecker from "./components/AuthChecker";
import { useSupabaseAuth } from "./supabase/auth/index";
import { useEffect } from "react";
import { localStorageUtils } from "./supabase/utilities/localStorage";
import { supabaseClient } from "./supabase/context/index.jsx";
import { ExplorePage } from "./pages/ExplorePage.jsx";
import { RankingPage } from "./pages/RankingPage.jsx";
import { LikeMovies } from "./pages/LikeMovies.jsx";
import { DisLikeMovies } from "./pages/DislikeMovies.jsx";
import { WishList } from "./pages/WishList.jsx";
import { Watching } from "./pages/Watching.jsx";
import { BestMovies } from "./pages/BestMovies.jsx";
import { Watched } from "./pages/Watched.jsx";

const AuthRedirectHandler = () => {
  const { setItemToLocalStorage } = localStorageUtils();
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase의 인증 상태가 변경될 때마다 실행
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // 세션이 존재하면 로그인에 성공
          setItemToLocalStorage("userInfo", session.user);
          console.log("로그인", session.user);
          navigate("/");
        } else {
          // 세션이 없으면 로그인에 실패
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setItemToLocalStorage, navigate]);

  return <div>로그인 처리 중...</div>;
};

function App() {
  return (
    <Routes>
      {/* 카카오 로그인 리다이렉트 */}
      <Route path="/kakao-login" element={<AuthRedirectHandler />} />
      {/* 구글 로그인 리다이렉트 */}
      <Route path="/google-login" element={<AuthRedirectHandler />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/movie/:id"
          element={<MovieDetail movie={movieDetailData} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* AuthChecker로 먼저 로그인 상태 확인후 mypage(login) or dashboard 이동  */}
        <Route
          path="/dashboard"
          element={
            <AuthChecker>
              <DashBoard />
            </AuthChecker>
          }
        />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/likemovies" element={<LikeMovies />} />
        <Route path="/dislikemovies" element={<DisLikeMovies />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/watching" element={<Watching />} />
        <Route path="/watched" element={<Watched />} />
        {/* <Route path="/bestmovies" element={<BestMovies />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
