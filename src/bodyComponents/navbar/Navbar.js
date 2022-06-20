import React from 'react';
import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    body: {
      width: "100% ",
      position: "fixed",
      bottom: 0 ,
      backgroundColor: "cornsilk !important",
      zIndex: 100
    },
  });
const Navbar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value === 0) {
        navigate('/')
    } else if (value === 1) {
      navigate('/movie')
    } else if (value === 2) {
      navigate('/series')
    } else if (value === 3) {
      navigate('/search')
    }
  }, [value,navigate]);
  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.body}
      >
        <BottomNavigationAction label="Trending" icon={<TrendingUpIcon />} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />}/>
        <BottomNavigationAction label="Web Series" icon={<LiveTvIcon/>} />
        <BottomNavigationAction label="Search" icon={<SearchIcon/>}/>
      </BottomNavigation>
    </Box>
  );
}
export default Navbar