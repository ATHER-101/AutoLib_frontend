import { useEffect, useState } from "react";
import BookScroller from "../../Components/BookScroller";
import axios from "axios";

interface Books {
  id:string;
  title:string;
  cover_img:string;
}

interface RecentGenres {
  genre: string;
  books: Books[];
}

const Home = () => {
  const [issues,setIssues] = useState<Books[]>([]);
  const [newArrivals,setNewArrivals] = useState<Books[]>([]);
  const [recentGenres,setRecentGenres] = useState<RecentGenres[]>([])

  const fetchIssues = ()=>{
    axios.get("https://autolib-backend-api.onrender.com/api/issues/current-issues",{
      params:{
        user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173",
        limit: 12
      }
    })
    .then((response)=>setIssues(response.data))
    .catch((error)=>console.log(error))
  }
  
  const fetchNewArrivals = ()=>{
    axios.get("https://autolib-backend-api.onrender.com/api/books/recently-added",{
      params:{
        limit: 12
      }
    })
    .then((response)=>setNewArrivals(response.data))
    .catch((error)=>console.log(error))
  }
  
  const fetchRecentGenres = ()=>{
    axios.get("https://autolib-backend-api.onrender.com/api/users/recent-genres",{
      params:{
        user_id: "ebf6cc5a-077a-4401-9858-4cb9e4d34173"
      }
    })
    .then((response)=>setRecentGenres(response.data))
    .catch((error)=>console.log(error))
  }

  useEffect(()=>{
    fetchIssues();
    fetchNewArrivals();
    fetchRecentGenres();
  },[])

  return (
    <>
      <BookScroller title="currently_issued" colored={true} books={issues}/>
      <BookScroller title="new_arrivals" books={newArrivals}/>
      {recentGenres.map((recentGenre:RecentGenres)=>{
        return <BookScroller key={recentGenre.genre} title={recentGenre.genre} books={recentGenre.books}/>
      })}
    </>
  );
};

export default Home;
