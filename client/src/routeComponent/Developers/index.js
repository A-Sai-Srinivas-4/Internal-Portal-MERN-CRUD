import React, { useState, useEffect } from "react";
import DeveloperData from "../DeveloperData";
import Header from "../Header";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/dataSlice";
import axios from "axios";
import "./index.css";

const Developers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  //console.log(reload);

  return (
    <>
      <Header />
      <div className="sidebar-developers-container">
        <div className="dev-display-details-container">
          <div className="project-heading-add-container">
            <h1 className="project-heading">Developer-Details</h1>
            <Link to="/add_Employee" className="add-emp-form">
              <BsFillPlusCircleFill color="white" size={35} />
            </Link>
          </div>

          <DeveloperData />
        </div>
      </div>
    </>
  );
};

export default Developers;
