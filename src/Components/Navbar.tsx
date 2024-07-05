import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Bookmark from "@mui/icons-material/Bookmark";

import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#FF5733", 0.15),
  "&:hover": {
    backgroundColor: alpha("#FF5733", 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "white" }}>
        <Toolbar>
          <Link to="/student">
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{ mr: 0, color: "#FF5733" }}
            >
              <AutoStoriesIcon />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, color: "#FF5733" }}
          >
            AutoLib
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search sx={{ height: "40px" }}>
              <SearchIconWrapper sx={{ height: "100%" }}>
                <SearchIcon sx={{ color: "#FF5733" }} />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ height: "100%", color: "#FF5733" }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Link to="/student/bookmarks">
              <IconButton
                size="large"
                aria-label="show new notifications"
                sx={{ p: 1, color: "#FF5733" }}
              >
                <Bookmark />
              </IconButton>
            </Link>
            <Link to="/student/notifications">
              <IconButton
                size="large"
                aria-label="show new notifications"
                sx={{ p: 1, color: "#FF5733" }}
              >
                <Badge badgeContent={1} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton size="large" edge="end" sx={{ p: 1, color: "#FF5733" }}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}