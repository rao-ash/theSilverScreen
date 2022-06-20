import { Badge } from "@material-ui/core";
import "./CardComp.css";
import TransitionModal from "../modal/TransitionModal";

const img_300 = "https://image.tmdb.org/t/p/w300";

const CardComp = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <TransitionModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />                                                     
      <img
        className="poster"
        src={`${img_300}${poster}`}
        alt={title}
      />
      <b style={{'textAlign' : 'center', 'padding': '6px'}}>{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </TransitionModal>
  );
};

export default CardComp;