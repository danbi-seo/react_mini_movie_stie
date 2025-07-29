import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { fetchSearchMovies } from "../API/tmdbapi"; // fetch 함수
import MovieCard from "../components/MovieCard";
import { useDebounce } from "../components/useDebounce";
import { memo } from "react";



// const SearchWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   padding: 0 10px;
//   position: relative;
//   height: 50px;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   font-size: 14px;
//   border: none;
//   border-radius: 7px;
//   outline: none;
//   margin-top: 14px;
//   background-color: #25304a;
//   color: white;
//   padding: 20px;
//   position: relative;
//   height: 40px;
//   z-index: 1;
// `;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  width: 100%;
  align-items: center; /* 가로 중앙 정렬 */
  padding: 20px; /* 전체 패딩 */
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%; /* SearchWrapper의 100% 너비를 차지 */
  font-size: 16px; /* 폰트 크기 조정 */
  border: none;
  border-radius: 7px;
  outline: none;
  margin-bottom: 20px; /* 검색창 아래 여백 */
  background-color: #25304a;
  color: white;
  padding: 12px 20px; /* 패딩 조정 */
  height: 50px; /* 높이 고정 */
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  &::placeholder {
    color: #bbb;
  }
`;

const MovieListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* MovieCard 크기에 맞게 조정 */
  gap: 20px; /* 그리드 아이템 간 간격 */
  width: 100%; /* 부모 너비에 맞춤 */
  padding: 20px 0; /* 상하 패딩 */
  justify-items: center; /* 그리드 아이템들을 셀 내에서 중앙 정렬 */

  /* 모바일 반응형 스타일 */
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); /* 모바일에서 카드 크기 조정 */
    gap: 15px; /* 모바일에서 간격 조정 */
  }
`;

// 키워드값을 받아서 api 로 호출 / 키워드가 없으면 네브
// query setQuery = useState() 초기값을 설정 
// 주소창 그대로 접근

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";  // 쿼리 파라미터에서 검색어를 가져옴
  const [keyword, setKeyword] = useState(query); 
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounced = useDebounce(keyword, 500)

  // 영화 검색 처리
  useEffect(() => {
    // if (!keyword.trim()) {
    //   return; // 검색어가 없으면 함수 종료
    // }
    setIsLoading(true);
    const getSearchMovies = async () => {
      try {
        const data = await fetchSearchMovies(debounced);
        console.log(data.results);
        setMovies(data.results);
      } catch (err) {
        console.error("검색 실패:", err);

      } finally {
        setIsLoading(false);
      }
    };
    getSearchMovies();
  }, [debounced]);

  useEffect(() => {
  if (debounced.trim()) {
    setSearchParams({ query: debounced }, { replace: true });
  } else {
    setSearchParams({}, { replace: true });
  }
}, [debounced, setSearchParams]);

  //입력창을 관리하고 입력값으로 호출한다
  const handleSearch = (e) => {
    setKeyword(e.target.value)
    // navigate(`/search?query=${e.target.value}`)
  // 검색어 입력 시 검색 페이지로 리디렉션
  };

  console.log(movies);
  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <SearchWrapper>
      <SearchInput
        onChange={handleSearch}
        type="text"
        value={keyword}  // 쿼리 파라미터 값 입력창에 표시
        // onChange={handleSearch}  // 검색어 입력 시 URL 업데이트
        placeholder="🔍 영화 이름을 검색해 보세요"
      />
      <SearchResults movies={movies} />
    </SearchWrapper>
  );
}


export const SearchResults = memo(({ movies }) => {

  useEffect(() => {
    console.log('렌더링됨요');
  })

  return(
  <div>
    {movies && movies.length > 0 ? (
      <div className="movie-list-wrap">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            // id={movie.id}
            // title={movie.title}
            // poster={movie.poster_path}
            // rating={movie.vote_average}
          />
        ))}
      </div>
    ) : (
      <div>검색 결과가 없습니다.</div>
    )}
  </div>
  )
})

