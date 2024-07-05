import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Books {
  id: string;
  title: string;
  cover_img: string;
}

const MoreBooks = () => {
  const { title } = useParams();

  const [books, setBooks] = useState<Books[]>([]);

  const formatString = (string: string | undefined) => {
    return !string
      ? undefined
      : string
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  };

  const fetchBooks = () => {
    if (title === "currently_issued") {
      axios
      .get("https://autolib-backend-api.onrender.com/api/issues/current-issues", {
        params: {
          user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
        },
      })
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));

    } else if (title === "new_arrivals") {
      axios
        .get("https://autolib-backend-api.onrender.com/api/books/recently-added")
        .then((response) => setBooks(response.data))
        .catch((error) => console.log(error));

    }else{
      axios
      .get("https://autolib-backend-api.onrender.com/api/books/genre", {
        params: {
            genre: title
        },
      })
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
    }
  };

  useEffect(()=>{
    fetchBooks();
  },[]);

  return (
    <Box mx={3}>
      <Typography variant="h6" sx={{fontSize:{xs:20,sm:27} ,my:1}}>
        {formatString(title)}
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => {
          return (
            <Grid item xs={4} sm={2} pb={1} key={book?.id}>
              <Link to={`/student/${book?.id}`}>
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
                  {book?.title}
                </Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MoreBooks;
