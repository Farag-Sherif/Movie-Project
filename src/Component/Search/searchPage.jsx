import { Link, useLocation } from "react-router-dom";
import { Api, countryCategories, languageCategories } from "../APIs/APIS";
import "./searchPage.css";
import axios from "axios";
import logo from "./../../image/Logo-2.png";
import { useEffect, useState } from "react";
import Loading from "../Loading/loading";

export default function Search() {
  const location = useLocation();
  const splitOfURL = location.pathname.split("/");
  const searchText = splitOfURL[splitOfURL.length - 1];
  const [searchMovies, setSearchMovies] = useState([]);
  const [category, setCategory] = useState("movie");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
        setLoading(true);
      try {
if(category==="movie"){
        const search = await axios.get(
          Api.baseURL + Api.search + category + Api.Key + `&query=${searchText}`,
          {
            headers: { Authorization: Api.token },
          }
        );
        // console.log(search);

        setSearchMovies(search.data.results);

        // console.log("Trending Movies:", search.data.results);
    }else{
        const search = await axios.get(
            Api.baseURL + Api.search + category  + Api.Key + `&query=${searchText}`,
            {
              headers: { Authorization: Api.token },
            }
          );
          // console.log(search);

  
          setSearchMovies(search.data.results);
  
          // console.log("Trending Movies:", search.data.results);
    }
      } catch (err) {
        console.error("Error fetching movies:", err);
      }finally {
        setLoading(false);
      }
    }

    getMovies();
  }, [searchText, category]);
  return (
    <>
    {loading ? (
        <Loading />
      ) : (
      <div className="searchPage">
     <ul className="sub-section">
          <li>
          <button className={category=== "movie"&& "active"} onClick={()=> setCategory("movie")}>
              <i className="fas fa-stream"></i> <span>الأفلام</span>
              </button>
          </li>
          <li>
            <button className={category=== "tv"&& "active"} onClick={()=> setCategory("tv")}>
              <i className="fas fa-stream"></i> <span>المسلسلات</span>
            </button>
          </li>
        </ul>
        <div className="search">
      {searchMovies
      .filter(movie=> movie.poster_path || movie.backdrop_path)
      .map((movie) => {
        return (
          <Link
            to={
              `/description/${
                (movie.origin_country && 'tv') ||
                (movie.original_language && 'movie')
              }/` + movie.id
            }
            className="element"
            key={movie.id}
            style={{
              backgroundImage: `url(${Api.baseURLImg}${Api.sizeW500}${movie.poster_path || movie.backdrop_path})`,
            }}>
            <div className="info">
              <div className="name">
                <img src={logo} alt="logo" />
                <h1>{ movie.title ||  movie.name || movie.original_title || movie.original_name}</h1>
              </div>
              <div className="rating">
                <span>
                  {movie.origin_country
                    ? `مسلسلات ${
                        countryCategories[movie.origin_country] || "أجنبي"
                      }`
                    : movie.original_language
                    ? `أفلام ${
                        languageCategories[movie.original_language] || "أجنبي"
                      }`
                    : "أفلام أجنبي"}
                </span>
                  {movie.vote_average >0 &&
                <span>
                  {movie.vote_average} <i className="fa-solid fa-star"></i>
                </span>
                  }
              </div>
            </div>
          </Link>
        );
    })}
    </div>
    </div>
      )}
    </>
  );
}
