import { createSelector } from '@reduxjs/toolkit';

//미리 전체 영화 중에 선택한 영화만 걸러서 가져올 수 있게
export const selectMovieById = (movieId) => createSelector( // 바깥에서 쓸 때 값을 받아올 수 있음
  (state) => state.movie.data,  //인자이름은 코드작성과 관련없이 불러온 데이터를 어떻게 받아올지를 정하는 거라 어떤이름이든 상관x
  (movies) => movies.find(el => el.id === movieId) // 영화 ID로 해당 영화 찾기 (state.movie.data => movies)
)

//정규식으로 입력 받아온 값을 filter해서 가져올 수 있게
export const selectMovieByRegExp = (reg) => createSelector(
  (state) => state.Movie.data, // state에서 영화 데이터를 가져오기
  (movies) => movies.filter(el => el.title.match(reg)) // 
)

//두개의 상태값을 꺼내왔기 때문에 인자값도 (pokemon, favorite) 두개로 넣어준다
export const selectFavoriteMovies = createSelector(
  state => state.movie.data, // -> pokemon 인자값으로 이동
  state => state.favorite, // > favorite 인자값으로 이동 
  (movie, favorite) => {
    return movie.filter(el => favorite.includes(el.id)) //favorite안에 있는 id만 걸러서 리턴
  }
)

/**
 * createSelector(_,_)
 * 첫번째인자 : 입력함수 - 선택할 것들의 집합체 (1개 또는 여러개)
 * 두번째인자 : 결과함수 - 그 중에서 고르는 것(입력셀렉터의 반환값을 인자로 받음)
 */