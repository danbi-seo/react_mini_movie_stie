import { createSlice } from '@reduxjs/toolkit';
import { fetchMoviesBySearchQuery } from './thunk';  // 영화 검색을 위한 thunk

// 영화 검색 상태 관리
export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    data: [],        // 검색된 영화 목록을 빈 배열로 초기화
    loading: false,  // 로딩 상태
    error: null,     // 에러 상태
  },
  reducers: {
    // 필요하다면 액션 추가 (예: 영화 목록 초기화)
    resetMovies(state) {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesBySearchQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesBySearchQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoviesBySearchQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;  // API에서 가져온 데이터를 상태에 저장
      });
  },
});

// 즐겨찾기 상태 관리
export const favoriteSlice = createSlice({
  name: 'favoriteMovies',
  initialState: [],
  reducers: {
    addToFavorite(state, action) {
      state.push(action.payload.movieId);  // 영화 ID를 즐겨찾기에 추가
    },
    removeFromFavorite(state, action) {
      const index = state.indexOf(action.payload.movieId);  // 해당 영화 ID의 인덱스를 찾음
      if (index !== -1) state.splice(index, 1);  // 영화가 있으면 즐겨찾기에서 삭제
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { resetMovies } = movieSlice.actions;
export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default movieSlice.reducer;

