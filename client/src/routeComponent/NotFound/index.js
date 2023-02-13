import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const NotFound = () => (
  <>
    <Header />
    <div className="bg_container">
      <img
        src="https://raw.githubusercontent.com/LovarajDivili/New-Dashboard/efec298c124c14118625342f7a943e291c2b1773/src/assets/images/not-found.svg"
        alt="NotFound_image"
        className="NotFound_image"
      />
      <h1 className="heading">Oh...! Page Not Found</h1>
      <p className="discription">
        We can't see anything in this page...! You are looking for
      </p>
      <Link to="/">
        <button className="logout-btn">Back to Homepage</button>
      </Link>
    </div>
  </>
);

export default NotFound;
