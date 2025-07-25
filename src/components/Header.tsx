import {
  CircleFadingArrowUp,
  Trophy,
  BookText,
  Presentation,
} from "lucide-react";
import "../assets/CSS/Header.css";
import logo from "../assets/images/logo.png";
interface Headerprops {
  course: string;
  books: string;
  skillTest: string;
  masterClass: string;
}
const Header: React.FC<Headerprops> = ({
  course,
  books,
  skillTest,
  masterClass,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Brand */}
        <div className="brand-section">
          <div className="brand">
            {/* <GraduationCap className="brand-icon" /> */}
            <a
              href="/compiler"
              title="ScholarHat Coding Playground"
              className=" h-10 w-10"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img src={logo} alt="logo" />
            </a>
            <span className="brand-name">ScholarHat</span>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <a href={course} className="nav-link">
              <CircleFadingArrowUp className="nav-icon play-icon" />
              <span>Free Courses</span>
            </a>
            <a href={books} className="nav-link">
              <BookText className="nav-icon" />
              <span>Free Interview EBooks</span>
            </a>
            <a href={skillTest} className="nav-link">
              <Trophy className="nav-icon" />
              <span>Free skill Tests</span>
            </a>
            <a href={masterClass} className="nav-link">
              <Presentation className="nav-icon" />
              <span>Free Masterclass</span>
            </a>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          {/* CTA Button */}
          <button className="cta-button">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
