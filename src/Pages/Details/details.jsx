import { Link, useLocation } from "react-router-dom";
import "./details.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Api,
  countryCategories,
  languageCategories,
  languageLinks,
} from "../../Component/APIs/APIS";
import logo from "../../image/Logo-2.png";
import Loading from "../../Component/Loading/loading";
export default function Details() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const location = useLocation();
  const splitOfURL = location.pathname.split("/");
  const id = splitOfURL[splitOfURL.length - 1];
  const category = splitOfURL[splitOfURL.length - 2];
  // console.log(category);
  useEffect(() => {
    const showDetails = async () => {
      setLoading(true);
      try {
        if (category === "movie") {
          let res = await axios.get(
            Api.baseURL + Api.movie + id + Api.Key + Api.arabicLanguage
          );
          setDetails(res.data);
          let data = await axios.get(
            Api.baseURL + Api.movie + id + `/similar` + Api.Key
          );
          setRelatedProducts(data.data.results);
          // console.log(data.data.results);
          // console.log(res.data);
        } else {
          let res = await axios.get(
            Api.baseURL + Api.series + id + Api.Key + `&language=ar`
          );
          setDetails(res.data);
          // console.log(res.data.languages[0]);
          let data = await axios.get(
            Api.baseURL + Api.series + id + `/similar` + Api.Key
          );
          setRelatedProducts(data.data.results);
          setTime(res.data.last_episode_to_air.runtime || res.runtime);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    showDetails();
  }, [id, category]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Details">
          <div className="content">
            <div className="poster">
              <div className="info">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${
                      Api.baseURLImg + Api.sizeW500 + details.poster_path
                    })`,
                  }}></div>
                <div className="text">
                  <h3 className="vote">
                    10 /{" "}
                    <span>
                      <span>IMDB </span>
                      {details.vote_average}
                    </span>
                  </h3>
                  <h3>
                    {" "}
                    <i className="fas fa-heart"></i> أضافة للمفضلة{" "}
                  </h3>
                  <h3>
                    {" "}
                    <i className="fas fa-plus"></i> المشاهدة لاحقا
                  </h3>
                  <div className="disc">
                    <h1>{details.original_title || details.name}</h1>
                    <h2>
                      {" "}
                      <i className="fas fa-heart"></i> قصة العرض{" "}
                    </h2>
                    <p>
                      {details.overview ||
                        `مشاهدة وتحميل ${
                          details.original_title || details.name
                        } من خلال موقع السهرة ابدأ في المشاهدة واستمتع`}
                    </p>
                  </div>
                </div>
              </div>
              <Link to={details.homepage} className="button">
                {" "}
                <i className="fas fa-download"></i>للمشاهدة/التحميل
              </Link>
            </div>
            <div className="rank">
              <div className="box">
                <i className="fas fa-play"></i>
                <div className="text">
                  <span>التصنيف:</span>
                  <div>
                    <h1>
                      {!(category === "movie")
                        ? `مسلسلات ${
                            countryCategories[details.origin_country] ||
                            languageCategories[details.original_language] ||
                            "أجنبي"
                          }`
                        : `أفلام ${
                            countryCategories[details.origin_country] ||
                            languageCategories[details.original_language] ||
                            "أجنبي"
                          }`}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="box">
                <i className="fas fa-play"></i>
                <div className="text">
                  <span>النوع:</span>
                  <div>
                    {details.genres &&
                      details.genres.map((kind) => (
                        <h1 key={kind.id}> {kind.name}</h1>
                      ))}
                  </div>
                </div>
              </div>
              <div className="box">
                <i className="fas fa-play"></i>
                <div className="text">
                  <span>مدة العرض:</span>
                  <div>
                    <h1> {time} دقيقة</h1>
                  </div>
                </div>
              </div>
              <div className="box">
                <i className="fas fa-play"></i>
                <div className="text">
                  <span>التاريخ:</span>
                  <div>
                    <h1>{details.release_date}</h1>
                  </div>
                </div>
              </div>
              <div className="box">
                <i className="fas fa-play"></i>
                <div className="text">
                  <span>الجودة:</span>
                  <div>
                    <h1>HD</h1>
                  </div>
                </div>
              </div>
              <div className="box">
                <i className="fas fa-play"></i>
                <div className="text">
                  <span>الدولة:</span>
                  <div>
                    <h1>
                      {details.origin_country &&
                      details.origin_country[0] === "US"
                        ? "USA"
                        : details.origin_country}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="sub-section">
            <li>
              <Link
                className="active"
                to={
                  "/" +
                  category +
                  `/` +
                  languageLinks[details.original_language]
                }>
                {category === "movie" ? (
                  <i className="fas fa-film"></i>
                ) : (
                  <i className="fas fa-tv"></i>
                )}
                {category === "movie" ? "أفلام" : "مسلسلات"}{" "}
                <span>
                  {!(category === "movie")
                    ? countryCategories[details.origin_country] ||
                      languageCategories[details.original_language] ||
                      "أجنبي"
                    : countryCategories[details.origin_country] ||
                      languageCategories[details.original_language] ||
                      "أجنبي"}
                </span>{" "}
              </Link>
            </li>
            {details.genres &&
              details.genres.map((kind) => (
                <li key={kind.id}>
                  <Link to={"/" + category + "/" + kind.id}>
                    {category === "movie" ? (
                      <i className="fas fa-film"></i>
                    ) : (
                      <i className="fas fa-tv"></i>
                    )}{" "}
                    {category === "movie" ? "أفلام" : "مسلسلات"}{" "}
                    <span>{kind.name}</span>{" "}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="related">
            {relatedProducts
            .filter((movie) => movie.poster_path || movie.backdrop_path)
            .map((movie) => {
              return (
                <Link
                  to={"/description/" + category + "/" + movie.id}
                  className="element"
                  key={movie.id}
                  style={{
                    backgroundImage: `url(${Api.baseURLImg}${Api.sizeW500}${movie.poster_path|| movie.backdrop_path})`,
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
                              countryCategories[movie.origin_country] || "أجنبي"
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
    </>
  );
}
