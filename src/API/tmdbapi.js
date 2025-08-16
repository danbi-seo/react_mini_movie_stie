import axios from "axios";

// TMDB API 기본 설정
const baseUrl = "https://api.themoviedb.org/3";
const tmdbHeaders = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};

// 장르 ID 매핑
export const genreIds = {
  액션: 28,
  어드벤처: 12,
  애니메이션: 16,
  코미디: 35,
  범죄: 80,
  다큐멘터리: 99,
  드라마: 18,
  가족: 10751,
  판타지: 14,
  역사: 36,
  공포: 27,
  음악: 10402,
  미스터리: 9648,
  로맨스: 10749,
  SF: 878,
  TV영화: 10770,
  스릴러: 53,
  전쟁: 10752,
  서부: 37,
};

// 카테고리별 영화 가져오기
export const fetchExploreMovies = async ({ genreId, sortBy }) => {
  try {
    const res = await axios.get(`${baseUrl}/discover/movie`, {
      headers: tmdbHeaders,
      params: {
        with_genres: genreId,
        sort_by: sortBy,
        language: "ko-KR",
      },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("탐색 영화 fetch 실패:", error);
    return [];
  }
};

// 인기 영화 가져오기
export const fetchPopularMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/popular`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("인기 영화 목록 fetch 실패:", error);
    return [];
  }
};

// 평점 높은 영화 가져오기
export const fetchTopRatedMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/top_rated`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("평점 높은 영화 fetch 실패:", error);
    return [];
  }
};

// 현재 상영 중인 영화 가져오기
export const fetchNowPlayingMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/now_playing`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("현재 상영 중인 영화 fetch 실패:", error);
    return [];
  }
};

// 개봉 예정 영화 가져오기
export const fetchUpcomingMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/upcoming`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("개봉 예정 영화 fetch 실패:", error);
    return [];
  }
};

// 영화 상세 정보 가져오기
export const fetchMovieDetail = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/movie/${id}`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data;
  } catch (error) {
    console.error("영화 상세 정보 fetch 실패:", error);
    return {};
  }
};

// 영화 출연진/제작진 정보 가져오기
export const fetchMovieCredits = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/movie/${id}/credits`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data;
  } catch (error) {
    console.error("영화 출연진/제작진 fetch 실패:", error);
    return { cast: [], crew: [] };
  }
};

// 예고편/영상 정보 가져오기
export const fetchMovieVideos = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/movie/${id}/videos`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("예고편 영상 fetch 실패:", error);
    return [];
  }
};

// 검색 정보 가져오기
export const fetchSearchMovies = async (query) => {
  try {
    const res = await axios.get(`${baseUrl}/search/movie`, {
      headers: tmdbHeaders,
      params: {
        query: query,
        language: "ko-KR",
      },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("검색 fetch 실패:", error);
    return [];
  }
};

// 연령 등급 및 국가 기준으로 영화 가져오기
export const fetchDiscoverMovies = async (sortMode, page) => {
  try {
    const res = await axios.get(`${baseUrl}/discover/movie`, {
      headers: tmdbHeaders,
      params: {
        sort_by: sortMode,
        "certification.lte": "18",
        include_adult: false,
        certification_country: "KR",
        page: page,
        language: "ko-KR",
      },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("Discover Movies fetch 실패:", error);
    return [];
  }
};

// 기간마다 트렌딩 영화를 가져오기
export const fetchTrendingMovies = async (time_window) => {
  try {
    const res = await axios.get(`${baseUrl}/trending/movie/${time_window}`, {
      headers: tmdbHeaders,
      params: { language: "ko-KR" },
    });
    return res.data.results || [];
  } catch (error) {
    console.error("트렌딩 영화 fetch 실패:", error);
    return [];
  }
};

// 최근 월간 인기순 영화 가져오기
export const fetchMonthlyMovies = async (days = 30, page = 1) => {
  try {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - (days - 1));

    const gte = from.toISOString().slice(0, 10); // YYYY-MM-DD
    const lte = today.toISOString().slice(0, 10);

    const res = await axios.get(`${baseUrl}/discover/movie`, {
      headers: tmdbHeaders,
      params: {
        language: "ko-KR",
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        "primary_release_date.gte": gte,
        "primary_release_date.lte": lte,
        page,
      },
    });

    return res.data.results || [];
  } catch (error) {
    console.error("월간 영화 fetch 실패:", error);
    return [];
  }
};
