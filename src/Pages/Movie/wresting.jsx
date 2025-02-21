import axios from "axios";
import { Api, languageCategories } from "../../Component/APIs/APIS";
import { useEffect, useState } from "react";
import logo from "../../image/Logo-2.png";
import "./moviePage.css";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Component/Pagination/pagination";
import Loading from "../../Component/Loading/loading";

export default function WrestingPage() {
  const [loading, setLoading] = useState(false);
    const [allMovie, setAllMovie] = useState([]);
    const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
    const type = "tv"
    
    useEffect(() => {
      async function getMovies() {
        setLoading(true);
        try {
              const allMovie = await axios.get(
                Api.baseURL +
                  Api.search +
                  type +
                  Api.Key +
                  Api.wresting + Api.page + currentPage,
                {
                  headers: { Authorization: Api.token },
                }
              );
              setAllMovie(allMovie.data.results);
              setPageCount(allMovie.data.total_pages)
    
              // console.log(" Movies:", allMovie.data.results);
        } catch (err) {
          console.error("Error fetching movies:", err);
        } finally {
          setLoading(false);
        }
      }
    
      getMovies();
    }, [currentPage, pageCount]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
    <div className="movie content">
      <div className="title">
        <h1>
           <span>المصارعة</span>
        </h1>
      </div>
    <div className="items">
      {allMovie
        .filter((movie) => movie.poster_path || movie.backdrop_path)
        .map((movie) => {
          return (
            <Link
              to={"/description/tv/" + movie.id}
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
                  <h1>{movie.title ||  movie.name || movie.original_title || movie.original_name}</h1>
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
    </div>
     )}
     <PaginatedItems pageCount={pageCount} setCurrentPage={setCurrentPage}/>
     </>
  );
}
