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

//카테고리별 영화 가져오기
export async function fetchExploreMovies({ genreId, sortBy }) {
  try {
    const queryParams = new URLSearchParams();
    if (genreId) {
      queryParams.append("with_genres", genreId);
    }
    queryParams.append("sort_by", sortBy);
    queryParams.append("language", "ko-KR");

    const res = await fetch(
      `${baseUrl}/discover/movie?${queryParams.toString()}`,
      {
        headers: tmdbHeaders,
      }
    );
    if (!res.ok) throw new Error("탐색 영화 fetch 실패");
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 인기 영화 가져오기
export async function fetchMovies() {
  try {
    const res = await fetch(`${baseUrl}/movie/popular?language=ko-KR`, {
      headers: tmdbHeaders,
    });

    if (!res.ok) throw new Error("영화 목록 fetch 실패");

    const data = await res.json();
    if (!data.results) throw new Error("영화 목록 데이터가 없습니다");

    return data.results; // results 배열 반환
  } catch (error) {
    console.error(error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}

// 영화별 상세 가져오기
export async function fetchMovieDetail(id) {
  try {
    const res = await fetch(`${baseUrl}/movie/${id}?language=ko-KR`, {
      headers: tmdbHeaders,
    });

    if (!res.ok) throw new Error("영화 상세정보 fetch 실패");

    return await res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}

// // 출연진/감독 정보
// export async function fetchMovieCredits(id) {
//   const res = await fetch(`${baseUrl}/movie/${id}/credits?language=ko-KR`, {
//     headers: tmdbHeaders,
//   });

//   if (!res.ok) throw new Error("출연진/감독 정보 fetch 실패");

//   return await res.json(); //
// }

// // 예고편 / 영상 정보
// export async function fetchMovieVideos(id) {
//   const res = await fetch(`${baseUrl}/movie/${id}/videos?language=ko-KR`, {
//     headers: tmdbHeaders,
//   });

//   if (!res.ok) throw new Error("예고편 영상 fetch 실패");

//   return await res.json();
// }

// 검색 정보 가져오기
export async function fetchSearchMovies(query) {
  const res = await fetch(
    `${baseUrl}/search/movie?query=${encodeURIComponent(query)}&language=ko-KR`,
    {
      headers: tmdbHeaders,
    }
  );

  if (!res.ok) throw new Error("검색 fetch 실패");

  return await res.json();
}
