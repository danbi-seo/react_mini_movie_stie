const baseUrl = "https://api.themoviedb.org/3";
const tmdbHeaders = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};

// 인기순 영화 가져오기
export async function fetchMovies() {
  try {
    const res = await fetch(`${baseUrl}/movie/popular?language=ko-KR`, {
      headers: tmdbHeaders,
    });

    if (!res.ok) throw new Error("영화 목록 fetch 실패");

    const data = await res.json();
    if (!data.results) throw new Error("영화 목록 데이터가 없습니다");

    return data.results;  // results 배열 반환
  } catch (error) {
    console.error(error);
    return [];  // 오류 발생 시 빈 배열 반환
  }
}

// 영화 상세정보 가져오기
export async function fetchMovieDetail(id) {
  try {
    const res = await fetch(`${baseUrl}/movie/${id}?language=ko-KR`, {
      headers: tmdbHeaders,
    });

    if (!res.ok) throw new Error("영화 상세정보 fetch 실패");

    return await res.json();
  } catch (error) {
    console.error(error);
    return {};  // 오류 발생 시 빈 객체 반환
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

// 검색
export async function fetchSearchMovies(query) {
    const res = await fetch(`${baseUrl}/search/movie?query=${encodeURIComponent(query)}&language=ko-KR`, {
        headers: tmdbHeaders,
    });

    if (!res.ok) throw new Error("검색 fetch 실패");

    return await res.json();
}