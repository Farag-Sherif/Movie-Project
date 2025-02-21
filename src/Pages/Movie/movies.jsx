import axios from "axios";
import { Api, languageCategories } from "../../Component/APIs/APIS";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../image/Logo-2.png";
import "./moviePage.css";
import PaginatedItems from "../../Component/Pagination/pagination";
import Loading from "../../Component/Loading/loading";

export default function Movies() {
  const [loading, setLoading] = useState(false);
  const [allMovie, setAllMovie] = useState([]);
  const location = useLocation();
  const splitOfURL = location.pathname.split("/");
  const category = splitOfURL[splitOfURL.length - 1];
  const type = splitOfURL[splitOfURL.length - 2];
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(category);
  useEffect(()=>{
  },[category])
  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        if (category === "latest") {
          if (type === "movie") {
            const allMovie = await axios.get(
              Api.baseURL + Api.latestMovies + Api.Key + Api.page + currentPage,
              {
                headers: { Authorization: Api.token },
              }
            );

            setAllMovie(allMovie.data.results);
            setPageCount(allMovie.data.total_pages > 500 ? 500 : allMovie.data.total_pages )

            console.log(" Movies:", allMovie.data.results);
          } else {
            const allMovie = await axios.get(
              Api.baseURL + Api.latestSeries + Api.Key + Api.page + currentPage,
              {
                headers: { Authorization: Api.token },
              }
            );
            
            setAllMovie(allMovie.data.results);
            setPageCount(allMovie.data.total_pages > 500 ? 500 : allMovie.data.total_pages )
            
            console.log(" Movies:", allMovie.data.results);
            console.log(" Movies:", allMovie.data.total_pages);
          }
        } else {
          if (type === "movie") {
            console.log(isNaN(category))
            if(isNaN(category)){
            const allMovie = await axios.get(
              Api.baseURL +
              Api.searchByCategory +
              type +
              Api.Key +
              Api.moviesCategory[category] + Api.page + currentPage,
              {
                headers: { Authorization: Api.token },
              }
            );
            setAllMovie(allMovie.data.results);
            setPageCount(allMovie.data.total_pages > 500 ? 500 : allMovie.data.total_pages )
            console.log(" Movies:", allMovie.data.total_pages);

            console.log(" Movies:", allMovie.data.results);
          }else{
            console.log(category)
            const allMovie = await axios.get(
              Api.baseURL +
              Api.searchByCategory +
              type +
              Api.Key +  `&with_genres=${category}` + Api.page + currentPage,
              {
                  headers: { Authorization: Api.token },
                }
              );
              setAllMovie(allMovie.data.results);
            setPageCount(allMovie.data.total_pages > 500 ? 500 : allMovie.data.total_pages )

            console.log(" Movies:", allMovie.data.total_pages);
          }
          } else {
            console.log(isNaN(category))
            if(isNaN(category)){
            const allMovie = await axios.get(
              Api.baseURL +
              Api.searchByCategory +
              type +
              Api.Key +
              Api.seriesCategory[category] + Api.page + currentPage,
              {
                  headers: { Authorization: Api.token },
                }
              );
              setAllMovie(allMovie.data.results);
            setPageCount(allMovie.data.total_pages > 500 ? 500 : allMovie.data.total_pages )

            console.log(" Movies:", allMovie.data.total_pages);
          }else{
            console.log(category)
            const allMovie = await axios.get(
              Api.baseURL +
              Api.searchByCategory +
              type +
              Api.Key +  `&with_genres=${category}` + Api.page + currentPage,
              {
                  headers: { Authorization: Api.token },
                }
              );
              setAllMovie(allMovie.data.results);
            setPageCount(allMovie.data.total_pages > 500 ? 500 : allMovie.data.total_pages )

            console.log(" Movies:", allMovie.data.total_pages);
          }
        }
        }
        if(currentPage > pageCount){
          setCurrentPage(1)
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
        console.log(currentPage)
      }
    }

    getMovies();
  }, [category, type , currentPage , pageCount , ]);
  return (
    <>
    {loading ? (
      <Loading />
    ) : (
    <div className="items">
      {allMovie
        .filter((movie) => movie.poster_path || movie.backdrop_path)
        .map((movie) => {
          return (
            <Link
              to={"/description/" + type + "/" + movie.id}
              className="element"
              key={movie.id}
              style={{
                backgroundImage: `url(${Api.baseURLImg}${Api.sizeW500}${
                  movie.poster_path || movie.backdrop_path
                })`,
              }}>
              <div className="info">
                <div className="name">
                  <img src={logo} alt="logo" />
                  <h1>{movie.title || movie.name || movie.original_title || movie.original_name}</h1>
                </div>
                <div className="rating">
                  <span>
                    {type === "movie" ? "افلام" : "مسلسلات"}{" "}
                    {languageCategories[movie.original_language] || "أجنبية"}
                  </span>
                  {movie.vote_average > 0 && (
                    <span>
                      {movie.vote_average} <i className="fa-solid fa-star"></i>{" "}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  )}
    <PaginatedItems pageCount={pageCount} setCurrentPage={setCurrentPage} />
    </>
  );
}
