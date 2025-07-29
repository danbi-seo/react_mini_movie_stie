import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchSearchMovies } from "../API/tmdbapi"; // fetch 함수

export const SearchResults = () => {

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
      <p>검색 결과가 없습니다.</p>
    )}
  </div>
  )
}
