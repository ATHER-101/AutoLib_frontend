import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Books {
  id:string;
  title:string;
  cover_img:string;
}

const Bookmarks = () => {
  const [bookmarks,setBookmarks] = useState<Books[]>([]);

  const fetchBookmarks = async ()=>{
    axios.get(`${import.meta.env.VITE_API_BACKEND}/api/bookmarks`,{
      params: {
        user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173"
      }
    })
    .then((response)=>{
      return setBookmarks(response.data);
    })
    .catch((error)=>{
      return console.log(error);
    })
  }

  useEffect(()=>{
    fetchBookmarks();
  },[])

  return (
    <Box mx={3}>
      <Typography variant="h6" sx={{fontSize:{xs:20,sm:27} ,my:1}}>
        Bookmarks
      </Typography>
      <Grid container spacing={2}>
        {bookmarks.map((book) => {
          return (
            <Grid item xs={4} sm={2} pb={1} key={book.id}>
              <Link to={`/student/${book.id}`}>
                <Paper
                  component="img"
                  src={book.cover_img || "/book-cover.webp"}
                  sx={{
                    aspectRatio: "6 / 9",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 1.5,
                  }}
                />
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    width: "100%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textWrap: "wrap",
                    height: "45px",
                    mt:1
                  }}
                >
                  {book.title}
                </Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Bookmarks;
