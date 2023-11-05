import Logo from "../assets/logo_transparent.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-indigo-600">
      <div className="py-3 px-5 ">
        <Link to="/">
          <img src={Logo} width={130} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
