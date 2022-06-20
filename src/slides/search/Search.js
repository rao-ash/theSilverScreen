import {
    Button,
    createTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
  import "./Search.css";
  import SearchIcon from "@material-ui/icons/Search";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import Pagination from "../../bodyComponents/pagination/Pagination";
  import CardComp from "../../bodyComponents/cardcomp/CardComp";
  
  const Search = () => {
    const [type, setType] = useState(0);
    const [text, setText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [totPages, setTotPages] = useState();
  
    const darkTheme = createTheme({
      palette: {
        type: "dark",
        primary: {
          main: "#fff",
        },
      },
    });
  
    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=164570ad6103a17a852b6cfde2c59d6a&language=en-US&query=${text}&page=${page}`
        );
        setContent(data.results);
        setTotPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
      // eslint-disable-next-line
    }, [type, page]);
  
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>
        <div className="trending">
          {content &&
            content.map((c) => (
              <CardComp
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {text &&
            content.length===0 &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {totPages > 1 && (
          <Pagination setPage={setPage} numOfPages={totPages} />
        )}
      </div>
    );
  };
  
  export default Search;