import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  description: string;
  cover_img: string;
  genre: string;
  quantity: number;
  remaining: number;
  added: Date;
}

const Book = () => {
  const { book_id } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [bookmarked, setBookmarked] = useState<Boolean | null>(null);
  const [issued, setIssued] = useState<Boolean | null>(null);

  const fetchBook = async () => {
    axios
      .get(`https://autolib-backend-api.onrender.com/api/books/${book_id}`)
      .then((response) => {
        console.log(response.data[0])
        return setBook(response.data[0]);
      })
      .catch((error) => {
        return console.log(error);
      });

    axios
      .get(`https://autolib-backend-api.onrender.com/api/check-bookmark`, {
        params: {
          user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
          book_id: book_id,
        },
      })
      .then((response) => {
        console.log("bookmarked",response.data)
        return setBookmarked(response.data.length === 0 ? false : true);
      })
      .catch((error) => {
        return console.log(error);
      });
      
      axios
      .get(`https://autolib-backend-api.onrender.com/api/issues/check-issue`, {
        params: {
          user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
          book_id: book_id,
        },
      })
      .then((response) => {
        console.log("issued",response.data)
        return setIssued(response.data.length === 0 ? false : true);
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleBookmark = () => {
    console.log("clicked!");
    if (bookmarked !== null) {
      if (bookmarked) {
        axios
          .post(`https://autolib-backend-api.onrender.com/api/remove-bookmark`, {
            user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
            book_id: book_id,
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              setBookmarked(false);
            }
          })
          .catch((error) => {
            return console.log(error);
          });
      } else {
        axios
          .post(`https://autolib-backend-api.onrender.com/api/add-bookmark`, {
            user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
            book_id: book_id,
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              setBookmarked(true);
            }
          })
          .catch((error) => {
            return console.log(error);
          });
      }
    }
  };

  const handleIssue = () => {
    console.log("clicked!");
    if (issued !== null) {
      if (issued) {
        axios
          .post(`https://autolib-backend-api.onrender.com/api/issues/return-book`, {
            user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
            book_id: book_id,
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              setIssued(false);
            }
          })
          .catch((error) => {
            return console.log(error);
          });
      } else {
        axios
          .post(`https://autolib-backend-api.onrender.com/api/issues/issue-book`, {
            user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
            book_id: book_id,
          })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              setIssued(true);
            }
          })
          .catch((error) => {
            return console.log(error);
          });
      }
    }
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={3.5}>
        <Paper
          component="img"
          src={book?.cover_img || "/book-cover.webp"}
          sx={{
            aspectRatio: "6 / 9",
            width: "100%",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8.5}>
        <Box
          sx={{
            px: { xs: 0, sm: 4 },
            width: "100%",
            height: "100%",
          }}
        >
          {/* <Box> */}
          <Typography
            component="h6"
            sx={{
              fontSize: { xs: 25, sm: 35 },
              textWrap: "wrap",
              mb: 0.5,
            }}
          >
            {book?.title}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: 18,
              mb: 0.5,
            }}
          >
            {book?.description}
          </Typography>
          <Chip
            label={book?.genre}
            color="error"
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <Box pb={1}>
            <Typography component="span" pr={2}>
              Total: {book?.quantity}
            </Typography>
            <Typography component="span">
              Available: {book?.remaining}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="error"
                onClick={handleIssue}
              >
                {issued ? "Return Book" : "Issue Book"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                color="error"
                onClick={handleBookmark}
              >
                {bookmarked ? "Remove Bookmark" : "Bookmark"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Book;
