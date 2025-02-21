
import { Link, Outlet } from "react-router-dom";
import "./moviePage.css";

export default function MoviePage() {
  return (
    <div className="movie content">
      <div className="title">
        <h1>
          تصفح <span>الأفلام</span>
        </h1>
      </div>
      <ul className="sub-section">
            <li>
              <Link to="/movie/Netflix"><i className="fas fa-film"></i>افلام <span>Netflix</span> </Link>
            </li>
            <li>
              <Link to="/movie/Foreign"><i className="fas fa-film"></i>افلام <span>اجنبي</span></Link>
            </li>
            <li>
              <Link to="/movie/Arabic"><i className="fas fa-film"></i>افلام <span>عربي</span></Link>
            </li>
            <li>
              <Link to="/movie/Turkish"><i className="fas fa-film"></i>افلام <span>تركية</span> </Link>
            </li>
            <li>
              <Link to="/movie/Asian"><i className="fas fa-film"></i>افلام <span>اسيوية</span></Link>
            </li>
            <li>
              <Link to="/movie/Indian"><i className="fas fa-film"></i>افلام <span>هندي</span></Link>
            </li>
            <li>
              <Link to="/movie/Classic"><i className="fas fa-film"></i>افلام <span>كلاسيكية</span></Link>
            </li>
            <li>
              <Link to="/movie/Animation"><i className="fas fa-film"></i>افلام <span>انيميشن</span></Link>
            </li>
            <li>
              <Link to="/movie/Dubbed"><i className="fas fa-film"></i>افلام <span>مدبلجة</span></Link>
            </li>
          </ul>
      <Outlet/>
    </div>
  );
}
