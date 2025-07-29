import { createAsyncThunk } from '@reduxjs/toolkit';

// 영화 데이터를 불러오는 비동기 액션 생성
export const fetchMoviesBySearchQuery = createAsyncThunk(
  'movies/fetchMoviesBySearchQuery',
  async (searchQuery, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=ko-KR&api_key=${import.meta.env.VITE_TMDB_API_TOKEN}`
      );
      const data = await response.json();

      // 성공 시 영화 목록을 반환
      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        koreanTitle: movie.title, // 여기서는 한국어로 그대로 받아옴
        posterPath: movie.poster_path, // 포스터 이미지
        voteAverage: movie.vote_average, // 평점
      }));
    } catch (err) {
      return thunkAPI.rejectWithValue('영화 데이터를 불러오지 못했습니다.');
    }
  }
);
