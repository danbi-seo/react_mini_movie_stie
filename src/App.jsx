import "./App.css";
import { Provider } from "react-redux";
import { store } from "./RTK/store";
import MovieDetail from "./components/MovieDetail";
import movieDetailData from "./assets/data/movieDetailData.json";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NavSearch } from "./components/NavSearch";
import Layout from "./components/Layout";
import { SearchPage } from "./pages/SearchPage";
import { MyPage } from "./pages/MyPage";
import { LoginPage } from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashBoard from "./pages/DashBoard";
import { useSupabaseAuth } from "./supabase";
import { localStorageUtils } from "./supabase/utilities/localStorage";

function App() {
  const { getUserInfo } = useSupabaseAuth();
  const { setItemToLocalStorage } = localStorageUtils();
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    const userInfo = await getUserInfo(); //유저 정보 가져오기
    if (userInfo) {
      setItemToLocalStorage("user", userInfo); // 로컬스토리지에 저장
      setUser(userInfo); // 상태에 저장
    }
  };
  // 유저가 아닐 때만 렌더링
  useEffect(() => {
    if (!user) {
      fetchUserInfo(); // 유저 정보 가져오기
    }
  }, [user]); // user 상태가 변경될 때마다 실행

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/movie/:id"
            element={<MovieDetail movie={movieDetailData} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
