import axios from "axios";
import { useEffect, useState } from "react";
import Genre from "../../bodyComponents/genre/Genre";
import CardComp from "../../bodyComponents/cardcomp/CardComp";
import useGenre from "../../bodyComponents/genre/useGenre";
import Pagination from "../../bodyComponents/pagination/Pagination"; 

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totPages, setTotPages] = useState();
  const genURL = useGenre(selectedGenres);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=164570ad6103a17a852b6cfde2c59d6a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genURL}`
    );
    setContent(data.results);
    setTotPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
    // eslint-disable-next-line
  }, [genURL, page]);

  return (
    <div>
      <span className="heading">MOVIES</span>
      <Genre
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <CardComp
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {totPages > 1 && (
        <Pagination setPage={setPage} numOfPages={totPages} />
      )}
    </div>
  );
};

export default Movies;