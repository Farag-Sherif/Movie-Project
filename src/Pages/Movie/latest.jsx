import axios from "axios";
import {
  Api,
  countryCategories,
  languageCategories,
  sortMovies,
  sortSeries,
} from "../../Component/APIs/APIS";
import { useEffect, useState } from "react";
import logo from "../../image/Logo-2.png";
import "./moviePage.css";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Component/Pagination/pagination";
import Loading from "../../Component/Loading/loading";

export default function LatestPage() {
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const popularSeries = await axios.get(
          Api.baseURL +
            Api.popularSeries +
            Api.Key +
            Api.page +
            currentPage +
            Api.languages +
            sortSeries,
          {
            headers: { Authorization: Api.token },
          }
        );
        const popularMovies = await axios.get(
          Api.baseURL +
            Api.popularMovies +
            Api.Key +
            Api.page +
            currentPage +
            Api.languages +
            sortMovies,
          {
            headers: { Authorization: Api.token },
          }
        );
        const combinedResults = [
          ...popularMovies.data.results,
          ...popularSeries.data.results,
        ];
        setPageCount(
          popularMovies.data.total_pages > popularSeries.data.total_pages
            ? popularMovies.data.total_pages
            : popularSeries.data.total_pages
        );
        combinedResults.sort((a, b) => {
          const dateA = new Date(a.release_date || a.first_air_date);
          const dateB = new Date(b.release_date || b.first_air_date);
          return dateB - dateA;
        });
        setPopular(combinedResults);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, [currentPage]);
  useEffect(() => {
    if (pageCount > 500) {
      setPageCount(500);
    }
  }, [pageCount]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="movie content">
          <div className="title">
            <h1>
              أخر <span>الأضافات</span>
            </h1>
          </div>
          <div className="items">
            {popular
              .filter((movie) => movie.poster_path || movie.backdrop_path)
              .map((movie) => {
                return (
                  <Link
                    to={
                      `/description/${
                        (movie.origin_country && `tv`) ||
                        (movie.original_language && `movie`)
                      }/` + movie.id
                    }
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
                          {movie.origin_country
                            ? `مسلسلات ${
                                countryCategories[movie.origin_country] ||
                                "أجنبي"
                              }`
                            : movie.original_language
                            ? `أفلام ${
                                languageCategories[movie.original_language] ||
                                "أجنبي"
                              }`
                            : "أفلام أجنبي"}
                        </span>
                        {movie.vote_average > 0 && (
                          <span>
                            {movie.vote_average}{" "}
                            <i className="fa-solid fa-star"></i>{" "}
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
      <PaginatedItems pageCount={pageCount} setCurrentPage={setCurrentPage} />
    </>
  );
}
