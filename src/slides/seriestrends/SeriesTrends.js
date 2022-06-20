import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../bodyComponents/genre/Genre";
import Pagination from "../../bodyComponents/pagination/Pagination";
import CardComp from "../../bodyComponents/cardcomp/CardComp";
import useGenre from "../../bodyComponents/genre/useGenre";

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totPages, setTotPages] = useState();
  const genURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=164570ad6103a17a852b6cfde2c59d6a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genURL}`
    );
    setContent(data.results);
    setTotPages(data.total_pages);
    // console.log(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genURL, page]);

  return (
    <div>
      <span className="heading">WEB SERIES</span>
      <Genres
        type="tv"
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
              media_type="tv"
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

export default Series;