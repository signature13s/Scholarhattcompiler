import { GraduationCap, FileText, TestTube } from "lucide-react";
import "../assets/CSS/Header.css";
import logo from "../assets/images/logo.png";
const Header = () => {
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
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <img src={logo} height="40px" alt="logo" />
            </a>
            <span className="brand-name">ScholarHat</span>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <a href="#" className="nav-link">
              <GraduationCap className="nav-icon" />
              <span>Free Courses</span>
            </a>
            <a href="#" className="nav-link">
              <FileText className="nav-icon" />
              <span>Free Interview EBooks</span>
            </a>
            <a href="#" className="nav-link">
              <TestTube className="nav-icon" />
              <span>Free skill Tests</span>
            </a>
            <a href="#" className="nav-link">
              <TestTube className="nav-icon" />
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
