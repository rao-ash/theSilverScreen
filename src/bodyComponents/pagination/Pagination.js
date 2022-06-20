// import React from "react";
// import Pagination from "@material-ui/lab/Pagination";
// import { createTheme, ThemeProvider } from "@material-ui/core";

// const darkTheme = createTheme({
//   palette: {
//     type: "dark",
//   },
// });

// export default function CustomPagination({ setPage, numOfPages = 10 }) {
//   // Scroll to top when page changes
//   const handlePageChange = (page) => {
//     setPage(page);
//     window.scroll(0, 0);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         marginTop: 10,
//       }}
//     >
//       <ThemeProvider theme={darkTheme}>
//         <Pagination
//           onChange={(e) => handlePageChange(e.target.textContent)}
//           count={numOfPages}
//           color="primary"
//         />
//       </ThemeProvider>
//     </div>
//   );
// }


import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});


const Paging = ({setPage , totalPages = 100}) =>{
    const PageChanger = (page) => {
      setPage(page);
      window.scroll(0, 0);
    };
  
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Pagination
            onChange={(e) => PageChanger(e.target.textContent)}
            count={totalPages}
            color="primary"
          />
        </ThemeProvider>
      </div>
    );
  }
  export default Paging