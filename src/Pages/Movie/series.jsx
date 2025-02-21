
import { Link, Outlet } from "react-router-dom";
import "./moviePage.css";

export default function SeriesPage() {
  return (
    <div className="movie content">
      <div className="title">
        <h1>
          تصفح <span>المسلسلات</span>
        </h1>
      </div>
      <ul className="sub-section">
            <li>
              <Link to="/tv/Arabic"><i className="fas fa-tv"></i>مسلسلات <span>عربي</span></Link>
            </li>
            <li>
              <Link to="/tv/Foreign"><i className="fas fa-tv"></i>مسلسلات <span>اجنبي</span></Link>
            </li>
            <li>
              <Link to="/tv/Turkish"><i className="fas fa-tv"></i>مسلسلات <span>تركية</span> </Link>
            </li>
            <li>
              <Link to="/tv/Korean"><i className="fas fa-tv"></i>مسلسلات <span>كورية</span></Link>
            </li>
            <li>
              <Link to="/tv/Animation"><i className="fas fa-tv"></i>مسلسلات <span>كرتون</span></Link>
            </li>
            <li>
              <Link to="/tv/sport"><i className="fas fa-tv"></i>مسلسلات <span>تليفزيونية</span></Link>
            </li>
            <li>
              <Link to="/tv/Netflix"><i className="fas fa-tv"></i>مسلسلات <span>Netflix</span> </Link>
            </li>
          </ul>
      <Outlet/>
    </div>
  );
}
