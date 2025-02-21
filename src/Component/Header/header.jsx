import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../image/Logo.png";
import { useEffect, useRef, useState } from "react";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  // console.log(searchText);
  const headerRef = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (headerRef.current) {
        if (scrollTop > lastScrollTop) {
          headerRef.current.style.top = "-10rem";
        } else {
          headerRef.current.style.top = "0";
        }
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <header ref={headerRef}>
      <nav className="content">
        <div className="headerItems">
          <div className="bars" onClick={() => setOpen((prev) => !prev)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
          <ul className="items">
            <li className="recent">
              <Link to="/latest">
                <i className="fa-solid fa-clock-rotate-left"></i>
                اخر الأضافات
              </Link>
            </li>
            <li>
              <Link to="/">الصفحة الرئيسية</Link>
            </li>
            <li className="series">
              <Link to="/tv/latest">
                المسلسلات
                <i className="fa-solid fa-angle-left"></i>
              </Link>
              <ul className="sub-items">
                <li>
                  <Link to="/tv/Arabic">مسلسلات عربي</Link>
                </li>
                <li>
                  <Link to="/tv/Foreign">مسلسلات اجنبي</Link>
                </li>
                <li>
                  <Link to="/tv/Turkish">مسلسلات تركية </Link>
                </li>
                <li>
                  <Link to="/tv/Korean">مسلسلات كورية</Link>
                </li>
                <li>
                  <Link to="/tv/Carton">مسلسلات كرتون</Link>
                </li>
                <li>
                  <Link to="/tv/sport">برامج تليفزيونية</Link>
                </li>
                <li>
                  <Link to="/tv/Netflix"> مسلسلات Netflix </Link>
                </li>
              </ul>
            </li>
            <li className="films">
              <Link to="/movie/latest">
                الأفلام
                <i className="fa-solid fa-angle-left"></i>
              </Link>
              <ul className="sub-items">
                <li>
                  <Link to="/movie/Netflix">افلام Netflix </Link>
                </li>
                <li>
                  <Link to="/movie/Foreign">افلام اجنبي</Link>
                </li>
                <li>
                  <Link to="/movie/Arabic">افلام عربي</Link>
                </li>
                <li>
                  <Link to="/movie/Turkish">افلام تركية </Link>
                </li>
                <li>
                  <Link to="/movie/Asian">افلام اسيوية</Link>
                </li>
                <li>
                  <Link to="/movie/Indian">افلام هندي</Link>
                </li>
                <li>
                  <Link to="/movie/Classic">افلام كلاسيكية</Link>
                </li>
                <li>
                  <Link to="/movie/Animation">افلام انيميشن</Link>
                </li>
                <li>
                  <Link to="/movie/Dubbed">افلام مدبلجة</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/wresting">مصارعه</Link>
            </li>
          </ul>
        </div>
        <div className="otherItems">
          <i
            className={search ? "fa-solid fa-times" : "fa-solid fa-search"}
            onClick={() => setSearch((prev) => !prev)}></i>
          <div className="recent">
            <Link to="/login">تسجيل الدخول</Link>
          </div>
        </div>
        <div className="search" style={{ display: search ? "flex" : "none" }}>
          <input
            type="text"
            placeholder="Search of Every thing"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Link to={`/search/${searchText}`} className="button">
            {" "}
            <i className="fa-solid fa-search"></i> بحث
          </Link>
        </div>
      </nav>
      <ul
        className="items-sm"
        style={{
          opacity: open ? "1" : "0",
          visibility: open ? "visible" : "hidden",
          right: open ? "0rem" : "-100%",
        }}
        onClick={() => setOpen((prev) => !prev)}>
        <li>
          <Link to="/latest">
            <i className="fa-solid fa-clock-rotate-left"></i>
            اخر الأضافات
          </Link>
        </li>
        <li>
          <Link to="/">الصفحة الرئيسية</Link>
        </li>
        <li>
          <Link to="/tv/latest">
            <i className="fa-solid fa-angle-left"></i>المسلسلات
          </Link>
          <ul className="sub-items">
            <li>
              <Link to="/tv/Arabic">مسلسلات عربي</Link>
            </li>
            <li>
              <Link to="/tv/Foreign">مسلسلات اجنبي</Link>
            </li>
            <li>
              <Link to="/tv/Turkish">مسلسلات تركية </Link>
            </li>
            <li>
              <Link to="/tv/Korean">مسلسلات كورية</Link>
            </li>
            <li>
              <Link to="/tv/Carton">مسلسلات كرتون</Link>
            </li>
            <li>
              <Link to="/tv/sport">برامج تليفزيونية</Link>
            </li>
            <li>
              <Link to="/tv/Netflix"> مسلسلات Netflix </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/movie/latest">
            <i className="fa-solid fa-angle-left"></i>الأفلام
          </Link>
          <ul className="sub-items">
            <li>
              <Link to="/movie/Netflix">افلام Netflix </Link>
            </li>
            <li>
              <Link to="/movie/Foreign">افلام اجنبي</Link>
            </li>
            <li>
              <Link to="/movie/Arabic">افلام عربي</Link>
            </li>
            <li>
              <Link to="/movie/Turkish">افلام تركية </Link>
            </li>
            <li>
              <Link to="/movie/Asian">افلام اسيوية</Link>
            </li>
            <li>
              <Link to="/movie/Indian">افلام هندي</Link>
            </li>
            <li>
              <Link to="/movie/Classic">افلام كلاسيكية</Link>
            </li>
            <li>
              <Link to="/movie/Animation">افلام انيميشن</Link>
            </li>
            <li>
              <Link to="/movie/Dubbed">افلام مدبلجة</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/wresting">مصارعه</Link>
        </li>
      </ul>
    </header>
  );
}
