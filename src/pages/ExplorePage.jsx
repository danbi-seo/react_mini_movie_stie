import React, { useState, useEffect } from "react";
import { fetchMovies, genreIds } from "../API/tmdbapi";

const categories = [
  "전체",
  "액션",
  "애니메이션",
  "SF",
  "미스터리",
  "판타지",
  "드라마",
  "코미디",
  "공포",
  "로맨스",
];

export const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortOrder, setSortOrder] = useState("popularity.desc"); // 기본 정렬: 인기순
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesData = async () => {
      setIsLoading(true);
      let moviesToDisplay = [];

      try {
        if (activeCategory === "전체") {
          // '전체' 카테고리는 인기순 영화를 가져옵니다.
          moviesToDisplay = await fetchMovies();
        } else {
          const genreId = genreIds[activeCategory];
          if (genreId) {
            moviesToDisplay = await fetchDiscoverMovies({
              genreId,
              sortBy: sortOrder,
            });
          }
        }
        setFilteredMovies(moviesToDisplay);
      } catch (error) {
        console.error("탐색 페이지에서 영화 정보 가져오기 오류 발생:", error);
        setFilteredMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesData();
  }, [activeCategory, sortOrder]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSortOrder("releaseDate"); // 카테고리 변경 시 정렬 기준을 개봉순으로 리셋
  };

  const handleSortClick = (order) => {
    setSortOrder(order);
  };

  const getSortButtonClass = (order) => {
    return sortOrder === order
      ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
      : "text-gray-400 hover:text-white";
  };

  return (
    <div className="bg-[#101322] min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">탐색</h1>

        {/* 카테고리 섹션 */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`py-2 px-4 rounded-full transition-colors duration-200 
                ${
                  activeCategory === category
                    ? "bg-yellow-500 text-black font-bold"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 정렬 버튼 섹션 */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => handleSortClick("primary_release_date.desc")}
            className={`text-lg transition-colors duration-200 ${getSortButtonClass(
              "releaseDate"
            )}`}
          >
            개봉순
          </button>
          <button
            onClick={() => handleSortClick("vote_average.desc")}
            className={`text-lg transition-colors duration-200 ${getSortButtonClass(
              "rating"
            )}`}
          >
            별점순
          </button>
        </div>

        {/* 영화 목록 */}
        {isLoading ? (
          <div className="text-center text-lg text-gray-400 animate-pulse">
            영화 목록을 불러오는 중...
          </div>
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="font-bold text-lg">{movie.title}</h3>
                    <p className="text-sm text-gray-300">
                      개봉: {movie.releaseDate}
                    </p>
                    <div className="flex items-center text-sm text-yellow-400 mt-1">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center text-sm">
                  <p className="font-semibold">{movie.title}</p>
                  <p className="text-gray-400">
                    {movie.releaseDate.substring(0, 4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg text-gray-400">
            해당 카테고리에는 영화가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

// Top Rated : 이걸로 메인페이지에 카드애니메이션 보여주기
// Now-playing , upcoming ,
// api를 axios로 바꾸기
/**
 * const tmdbapi = axios.create({baseURL: 'http://api.themoviedb.org/3'})
 * const getMovies = (page) => {}
 * Carousel
 * RollingMovieCard
 * 어플리케이션 개발 / 어플리케이션 개발에 필요한 라이브러리를 만드는 일을 하는게 프론트엔드 개발자
 */
