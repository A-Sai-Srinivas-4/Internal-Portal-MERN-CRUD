import Header from "../Header";
import "./index.css";

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">AIFA</h1>
        <p className="paragraphs"> Artificial Intelligence For All </p>
        <p className="home-description">
          At AlFA labs, we bring transformation, process improvements, and
          Machine First Human Assisted model to create the greatest impact in
          achieving business value with the best-in-class consulting.
        </p>
        <a href="https://aifalabs.com/" rel="noreferrer" target="_blank">
          <button type="button" className="website-button">
            Visit-Now
          </button>
        </a>
      </div>
      <img
        width="869"
        height="674"
        src="https://secureservercdn.net/160.153.137.91/nhd.f13.myftpupload.com/wp-content/uploads/2022/05/home-banner-gif.gif?time=1665183134"
        className="attachment-full size-full lazyloaded"
        alt="jjj"
        data-src="https://secureservercdn.net/160.153.137.91/nhd.f13.myftpupload.com/wp-content/uploads/2022/05/home-banner-gif.gif?time=1665183134"
        decoding="async"
      ></img>
    </div>
  </>
);

export default Home;
