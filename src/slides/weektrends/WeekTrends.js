import axios from "axios";
import "./WeekTrends.css";
import { useEffect, useState } from "react";
import CardComp from "../../bodyComponents/cardcomp/CardComp.js";
import Pagination from "../../bodyComponents/pagination/Pagination.js";

const WeekTrends = () => {
  const [page, setPage] = useState(1);
  const [media, setMedia] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=164570ad6103a17a852b6cfde2c59d6a&page=${page}`
    );
    setMedia(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="heading">WEEK TRENDS</span>
      <div className="trending">
        {media &&
          media.map((content) => (
            <CardComp
              key={content.id}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              date={content.first_air_date || content.release_date}
              media_type={content.media_type}
              vote_average={content.vote_average}
            />
          ))}
      </div>
      <Pagination setPage={setPage}/>
    </div>
  );
};

export default WeekTrends;
