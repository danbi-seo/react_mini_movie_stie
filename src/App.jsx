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
import AuthChecker from "./components/AuthChecker";

function App() {
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
          <Route
            path="/dashboard"
            element={
              <AuthChecker>
                <DashBoard />
              </AuthChecker>
            }
          />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
