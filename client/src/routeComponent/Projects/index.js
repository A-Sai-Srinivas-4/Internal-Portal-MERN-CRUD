import ProjectData from "../ProjectData";
import GetSidebar from "../Sidebar/Sidebar";
import Header from "../Header";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./index.css";

const Projects = () => {
  return (
    <>
      <Header />

      <div className="sidebar-projects-container">
        {GetSidebar()}
        <div className="projects-container">
          <div className="project-details-back-container">
            <div className="project-heading-container">
              <h1 className="project-heading">Projects</h1>
              <Link to="/add_project" className="add-form">
              <BsFillPlusCircleFill color="white" size={35} />
            </Link>
            </div>
            
          </div>
          <ProjectData />
        </div>
      </div>
    </>
  );
};

export default Projects;
