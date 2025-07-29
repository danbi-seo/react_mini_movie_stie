import './App.css'
import { Provider } from 'react-redux';
import { store } from  './RTK/store'; 
import MovieDetail from './components/MovieDetail';
import movieDetailData from './assets/data/movieDetailData.json';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NavSearch } from './components/NavSearch';
import Layout from './components/Layout';
import { SearchPage } from './pages/SearchPage';


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage/>} />
          <Route path='/movie/:id' element={<MovieDetail movie={movieDetailData}/>} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
