import "./homePage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Api,
  countryCategories,
  languageCategories,
} from "../../Component/APIs/APIS";
import logo from "../../image/Logo-2.png";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Component/Pagination/pagination";
import Loading from "../../Component/Loading/loading";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [newMovies, setNewMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestSeries, setLatestSeries] = useState([]);
  const [popular, setPopular] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const trendingRes = await axios.get(
          Api.baseURL + Api.trendingMovies + Api.Key,
          {
            headers: { Authorization: Api.token },
          }
        );
        const latestRes = await axios.get(
          Api.baseURL + Api.latestMovies + Api.Key,
          {
            headers: { Authorization: Api.token },
          }
        );
        const latestSeriesRes = await axios.get(
          Api.baseURL + Api.latestSeries + Api.Key,
          {
            headers: { Authorization: Api.token },
          }
        );
        const trendingMovies = await axios.get(
          Api.baseURL +
            Api.trendingMovies +
            Api.Key +
            Api.page +
            currentPage +
            Api.languages,
          {
            headers: { Authorization: Api.token },
          }
        );

        setNewMovies(trendingRes.data.results);
        setLatestMovies(latestRes.data.results);
        setLatestSeries(latestSeriesRes.data.results);
        setPopular(trendingMovies.data.results);
        setPageCount(trendingMovies.data.total_pages);

        // console.log("Trending Movies:", trendingRes.data.results);
        // console.log("Latest Movies:", latestRes.data.results);
        // console.log("Latest Series:", latestSeriesRes.data.results);
        // console.log("Popular Series:", trendingMovies.data.total_pages);
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
        <div className="home">
          <div>
            <div className="landing">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="mySwiper"
                style={{ height: "100%" }}>
                {newMovies.map((movie) => {
                  return (
                    <SwiperSlide
                      className="swiperContent"
                      key={movie.id}
                      style={{
                        backgroundImage: `url(${Api.baseURLImg}${Api.sizeOriginal}${movie.backdrop_path})`,
                      }}>
                      <div className="film-description">
                        <h1>
                          {movie.title ||
                            movie.name ||
                            movie.original_title ||
                            movie.original_name}
                        </h1>
                        <p>{movie.overview}</p>
                        <Link
                          to={
                            `/description/${
                              (movie.origin_country && `tv`) ||
                              (movie.original_language && `movie`)
                            }/` + movie.id
                          }
                          className="button">
                          مشاهدة الآن <i className="fa-solid fa-play"></i>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="latest">
            <div className="title">
              <h1>
                <i
                  className="fa-solid fa-video"
                  style={{
                    transform: "rotate(180deg)",
                    backgroundColor: "var(--bg-2)",
                    padding: "1.5rem",
                    borderRadius: "1.5rem",
                  }}></i>{" "}
                أخر الأفلام
              </h1>
              <Link to="/movie/latest" className="button">
                المزيد
                <span style={{ "--i": 2 }} className="dots"></span>
                <span style={{ "--i": 1 }} className="dots"></span>
                <span style={{ "--i": 0 }} className="dots"></span>
              </Link>
            </div>
            <ul className="sub-section">
              <li>
                <Link to="/movie/Netflix">
                  <i className="fas fa-film"></i>افلام <span>Netflix</span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/movie/Foreign">
                  <i className="fas fa-film"></i>افلام <span>اجنبي</span>
                </Link>
              </li>
              <li>
                <Link to="/movie/Arabic">
                  <i className="fas fa-film"></i>افلام <span>عربي</span>
                </Link>
              </li>
              <li>
                <Link to="/movie/Turkish">
                  <i className="fas fa-film"></i>افلام <span>تركية</span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/movie/Asian">
                  <i className="fas fa-film"></i>افلام <span>اسيوية</span>
                </Link>
              </li>
              <li>
                <Link to="/movie/Indian">
                  <i className="fas fa-film"></i>افلام <span>هندي</span>
                </Link>
              </li>
            </ul>
            <Swiper
              style={{ height: "40rem" }}
              slidesPerView={5}
              spaceBetween={30}
              centeredSlides={true}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper swiperItems">
              {latestMovies.map((movie) => {
                return (
                  <SwiperSlide className="slide" key={movie.id}>
                    <Link
                      className="element"
                      to={"/description/movie/" + movie.id}
                      style={{
                        backgroundImage: `url(${Api.baseURLImg}${Api.sizeW500}${movie.poster_path})`,
                      }}>
                      <div className="info">
                        <div className="name">
                          <img src={logo} alt="logo" />
                          <h1>
                            {movie.title ||
                              movie.name ||
                              movie.original_title ||
                              movie.original_name}
                          </h1>
                        </div>
                        <div className="rating">
                          <span>
                            افلام{" "}
                            {languageCategories[movie.original_language] ||
                              "أجنبية"}
                          </span>
                          <span>
                            {movie.vote_average}{" "}
                            <i className="fa-solid fa-star"></i>{" "}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="latest">
            <div className="title">
              <h1>
                <i
                  className="fa-solid fa-video"
                  style={{
                    transform: "rotate(180deg)",
                    backgroundColor: "var(--bg-2)",
                    padding: "1.5rem",
                    borderRadius: "1.5rem",
                  }}></i>{" "}
                أخر المسلسلات
              </h1>
              <Link to="/tv/latest" className="button">
                المزيد
                <span style={{ "--i": 2 }} className="dots"></span>
                <span style={{ "--i": 1 }} className="dots"></span>
                <span style={{ "--i": 0 }} className="dots"></span>
              </Link>
            </div>
            <ul className="sub-section">
              <li>
                <Link to="/tv/Arabic">
                  <i className="fas fa-tv"></i>مسلسلات <span>عربي</span>
                </Link>
              </li>
              <li>
                <Link to="/tv/Foreign">
                  <i className="fas fa-tv"></i>مسلسلات <span>اجنبي</span>
                </Link>
              </li>
              <li>
                <Link to="/tv/Turkish">
                  <i className="fas fa-tv"></i>مسلسلات <span>تركية</span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/tv/Korean">
                  <i className="fas fa-tv"></i>مسلسلات <span>كورية</span>
                </Link>
              </li>
              <li>
                <Link to="/tv/Netflix">
                  <i className="fas fa-tv"></i>مسلسلات <span>Netflix</span>{" "}
                </Link>
              </li>
            </ul>
            <Swiper
              style={{ height: "40rem" }}
              slidesPerView={5}
              spaceBetween={30}
              centeredSlides={true}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper swiperItems">
              {latestSeries.map((movie) => {
                return (
                  <SwiperSlide className="slide" key={movie.id}>
                    <Link
                      className="element"
                      to={"/description/tv/" + movie.id}
                      style={{
                        backgroundImage: `url(${Api.baseURLImg}${Api.sizeW500}${movie.poster_path})`,
                      }}>
                      <div className="info">
                        <div className="name">
                          <img src={logo} alt="logo" />
                          <h1>
                            {movie.title ||
                              movie.name ||
                              movie.original_title ||
                              movie.original_name}
                          </h1>
                        </div>
                        <div className="rating">
                          <span>
                            مسلسلات{" "}
                            {countryCategories[movie.origin_country[0]] ||
                              "أجنبي"}
                          </span>
                          <span>
                            {movie.vote_average}{" "}
                            <i className="fa-solid fa-star"></i>{" "}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="latest">
            <div className="title">
              <h1>
                <i
                  className="fa-solid fa-video"
                  style={{
                    transform: "rotate(180deg)",
                    backgroundColor: "var(--bg-2)",
                    padding: "1.5rem",
                    borderRadius: "1.5rem",
                  }}></i>{" "}
                الأكثر مشاهدة
              </h1>
            </div>
            <div className="popular">
              {popular.map((movie) => {
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
                      backgroundImage: `url(${Api.baseURLImg}${Api.sizeW500}${movie.poster_path})`,
                    }}>
                    <div className="info">
                      <div className="name">
                        <img src={logo} alt="logo" />
                        <h1>
                          {movie.title ||
                            movie.name ||
                            movie.original_title ||
                            movie.original_name}
                        </h1>
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
                        <span>
                          {movie.vote_average}{" "}
                          <i className="fa-solid fa-star"></i>{" "}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <PaginatedItems pageCount={pageCount} setCurrentPage={setCurrentPage} />
    </>
  );
}
