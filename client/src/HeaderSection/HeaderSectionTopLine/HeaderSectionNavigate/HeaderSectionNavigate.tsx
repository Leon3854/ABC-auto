import "./HeaderSectionNavigate.component.css";
import { Link } from "react-router-dom";

function HeaderSectionNavigate() {
  return (
    <div className="header-block-top_navigate">
      <nav className="header-block-top_nav">
        <ul>
          <li className="header-block-top_nav-link active">
            <Link to="/choice-car">Подбор авто</Link>
          </li>
          <li className="header-block-top_nav-link">
            <Link to="/about-company">О компании</Link>
          </li>
          <li className="header-block-top_nav-link">
            <Link to="/service-center">Техцентр</Link>
          </li>
          <li className="header-block-top_nav-link">
            <Link to="/reviews">Отзывы</Link>
          </li>
          <li className="header-block-top_nav-link">
            <Link to="/contacts">Контакты</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default HeaderSectionNavigate;
