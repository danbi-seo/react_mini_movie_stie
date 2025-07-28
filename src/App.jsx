import './App.css'
import MovieDetail from './components/MovieDetail';
import movieDetailData from './assets/data/movieDetailData.json';
import movieListData from './assets/data/movieListData.json';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NavSearch } from './components/NavSearch';
import Layout from './components/Layout';
import { SearchPage } from './pages/SearchPage';


function App() {
  const movies = movieListData.results; // movieListData.json에서 results배열 가져오기

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<NavSearch/>} />
          <Route path='/search/results' element={<SearchPage/>} />
          <Route path='/movie/:id' element={<MovieDetail movie={movieDetailData}/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
