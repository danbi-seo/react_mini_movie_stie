import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LikeMoviesContainer = styled.div`
  width: 100%;
  padding: 20px;
  color: #e0e0e0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

const BackButton = styled.span`
  cursor: pointer;
  font-size: 24px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  flex-grow: 1;
  text-align: center;
`;

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MovieItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 0;
`;

const Poster = styled.img`
  width: 50px;
  height: 75px;
  border-radius: 5px;
  margin-right: 15px;
`;

const MovieDetails = styled.div`
  flex-grow: 1;
`;

const MovieTitle = styled.p`
  margin: 0;
  font-weight: bold;
`;

const MovieYear = styled.p`
  margin: 5px 0 0;
  font-size: 12px;
  color: #888;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #ff5c5c;
  border: 1px solid #ff5c5c;
  padding: 4px 6px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff5c5c;
    color: white;
  }
`;

export const Watched = () => {
  // 상태 변수 이름을 'watchedMovies'와 같이 명확하게 수정
  const [watchedMovies, setWatchedMovies] = useState([]);

  // 로컬스토리지에서 좋아요 누른 영화 데이터를 가져오는 함수
  useEffect(() => {
    try {
      const storedWatchedList = JSON.parse(localStorage.getItem("WatchedList"));
      if (storedWatchedList) {
        // 중복된 항목은 제외하고, timestamp 내림차순으로 정렬
        const uniqueAndSortedMovies = storedWatchedList
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          )
          .sort((a, b) => b.timestamp - a.timestamp);

        setWatchedMovies(uniqueAndSortedMovies);
      }
    } catch (e) {
      console.error("로컬 스토리지 데이터 파싱 오류:", e);
      setWatchedMovies([]);
    }
  }, []); // 의존성 배열을 비워 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  // 영화 리스트에서 삭제하기
  const handleDelete = (movieId) => {
    // 현재 상태(watchedMovies)를 사용하여 삭제
    const updatedMovies = watchedMovies.filter((movie) => movie.id !== movieId);

    // 로컬스토리지에 업데이트된 영화 목록으로 저장
    localStorage.setItem("WatchedList", JSON.stringify(updatedMovies));

    // 상태를 업데이트
    setWatchedMovies(updatedMovies);
  };

  return (
    <LikeMoviesContainer>
      <Header>
        <BackButton onClick={() => window.history.back()}>&lt;</BackButton>
        <Title>☑️ 다 본 영화 리스트</Title>
      </Header>

      {watchedMovies.length === 0 ? (
        <p className="flex flex-center mt-[30px] ml-[270px] text-[18px]">
          ☑️ 다 본 작품이 아직 없네요!
        </p>
      ) : (
        <MovieList>
          {watchedMovies.map((movie) => (
            <MovieItem key={movie.id}>
              <Poster
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieDetails>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieYear>
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : "N/A"}
                </MovieYear>
              </MovieDetails>
              <DeleteButton onClick={() => handleDelete(movie.id)}>
                삭제
              </DeleteButton>
            </MovieItem>
          ))}
        </MovieList>
      )}
    </LikeMoviesContainer>
  );
};
