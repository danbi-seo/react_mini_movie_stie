import './App.css'
import MovieDetail from './components/MovieDetail';
import movieDetailData from './assets/data/movieDetailData.json';
import movieListData from './assets/data/movieListData.json';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import Layout from './components/Layout';


function App() {
  const movies = movieListData.results; // movieListData.json에서 results배열 가져오기
  console.log("movies array:", movies);
    console.log("movieDetailData loaded in App.jsx:", movieDetailData);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/movie/:id' element={<MovieDetail movie={movieDetailData}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
