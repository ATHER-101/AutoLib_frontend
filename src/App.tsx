import Admin from "./Pages/Admin/Admin";
import Student from "./Pages/Student/Student";
import Home from "./Pages/Student/Home";
import Book from "./Pages/Student/Book";
import Notifications from "./Pages/Student/Notifications";

import { Routes, Route } from "react-router-dom";
import Bookmarks from "./Pages/Student/Bookmarks";
import MoreBooks from "./Pages/Student/MoreBooks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/student" element={<Student />}>
          <Route index element={<Home />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path=":book_id" element={<Book />} />
          <Route path="more/:title" element={<MoreBooks />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
