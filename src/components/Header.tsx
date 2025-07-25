import {
  CircleFadingArrowUp,
  Trophy,
  BookText,
  Presentation,
} from "lucide-react";
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
    <header className="bg-gray-900 border-b border-gray-700 py-3 px-4">
      <div className="flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <a
              href="/compiler"
              title="ScholarHat Coding Playground"
              className="h-10 w-10 no-underline text-white"
            >
              <img src={logo} alt="logo" />
            </a>
            <span className="text-xl font-bold text-white">ScholarHat</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-4">
            <a
              href={course}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              <CircleFadingArrowUp className="w-4 h-4 rotate-90" />
              <span>Free Courses</span>
            </a>
            <a
              href={books}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              <BookText className="w-4 h-4" />
              <span>Free Interview EBooks</span>
            </a>
            <a
              href={skillTest}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              <Trophy className="w-4 h-4" />
              <span>Free Skill Tests</span>
            </a>
            <a
              href={masterClass}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              <Presentation className="w-4 h-4" />
              <span>Free Masterclass</span>
            </a>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
