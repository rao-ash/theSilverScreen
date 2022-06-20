import './App.css';
import Head from './bodyComponents/head/Head.js'
import Navbar from './bodyComponents/navbar/Navbar.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import WeekTrends from './slides/weektrends/WeekTrends'
import MovieTrends from './slides/movietrends/MovieTrends'
import SeriesTrends from './slides/seriestrends/SeriesTrends'
import Search from './slides/search/Search'
import Container from '@material-ui/core/Container'

const  App = () => {
  return (
    <>
      <BrowserRouter>
        <Head/>
        <div className='midbody'>
           <Container>
             <Routes>
              <Route exact path = "/" element = {<WeekTrends/>}/>
              <Route path = "/movie" element = {<MovieTrends/>} />
              <Route path = "/series" element = {<SeriesTrends/>} />
              <Route path = "/search" element = {<Search/>} />
             </Routes>
           </Container>
        </div>
        <Navbar/>
      </BrowserRouter>
    </>
  );
}

export default App;