
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Home/homePage'
import Header from './Component/Header/header'
import MoviePage from './Pages/Movie/moviePage'
import Movies from './Pages/Movie/movies'
import SeriesPage from './Pages/Movie/series'
import WrestingPage from './Pages/Movie/wresting'
import LatestPage from './Pages/Movie/latest'
import Details from './Pages/Details/details'
import Search from './Component/Search/searchPage'

function App() {

  return (
    <>

    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:text" element={<Search />} />
      <Route path="/wresting" element={<WrestingPage />} />
      <Route path="/latest" element={<LatestPage />} />
      <Route path="/description/:type/:id" element={<Details />} />
      <Route path="/movie" element={<MoviePage />} >
          <Route path=":category" element={<Movies />}/>
      </Route>
      <Route path="/tv" element={<SeriesPage />} >
          <Route path=":category" element={<Movies />}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
