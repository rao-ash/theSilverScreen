import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import "./TransitionModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";

const TransitionModal = ({ children, media_type, id }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=164570ad6103a17a852b6cfde2c59d6a&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=164570ad6103a17a852b6cfde2c59d6a&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

const img_500 = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="media"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className = "modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500, 
        }}
      >
        <Fade in={open}>
          { content &&(
            <div className= "openModal">
              <div className="ContentModal">
                <img
                  src=   {`${img_500}/${content.poster_path}`}
                  alt={content.name || content.title}
                  className="portrait"
                />
                <img
                  src={ `${img_500}/${content.backdrop_path}`}
                  alt={content.name || content.title}
                  className="landscape"
                />
                <div className="about">
                  <span className="c_title">
                    {content.name || content.title} 
                  </span>
                  <span className="subtitle">
                    {content.tagline && (
                      <i>{content.tagline}</i>
                    )}
                  </span>
                  <span className="description">
                    {content.overview}
                  </span>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon/>}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    style = {{marginTop:'20px'}}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}

export default TransitionModal

