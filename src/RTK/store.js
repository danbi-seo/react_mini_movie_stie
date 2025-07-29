import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,  // movieSlice를 movies로 사용
  }
});