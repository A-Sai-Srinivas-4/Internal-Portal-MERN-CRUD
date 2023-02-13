import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CardItem from "../CardItem";
//import Data from "../Json/data.json";
import { useSelector, useDispatch } from "react-redux";
// import { getCards } from "../../redux/dataSlice";
import { fetchData, addEmployeeDetails } from "../../redux/dataSlice";
//import axios from "axios";
import "./index.css";

const ProjectData = () => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();

  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);

  console.log(Data);

  // const fetchData = () => {
  //   axios.get(`http://localhost:8000/api/resources`).then((res) => {
  //     const reso = res.data;
  //     //console.log(reso.length);
  //     setData(reso);
  //   });
  // };
  useEffect(() => {
    //fetchData();
    dispatch(fetchData());
  }, [dispatch]);

  var Project_details;
  if (Data.Resources !== undefined) {
    Project_details = Data.Resources.Project_Details.map((eachItems) => {
      return eachItems;
    });
    console.log(Data.Resources);

    //console.log(Data);
    //console.log(Project_details);

    const newArray = [];
    Project_details.map((eachItem) => {
      const y = newArray.push(eachItem.Name);
      return y;
    });
  }

  console.log(Project_details);

  // //console.log(newArray);
  // const uniq_project_names = [...details,...new Set(newArray)];
  // //console.log(uniq_project_names)

  return (
    <>
      <div className="project-cards-lists">
        {Data.Resources &&
          Project_details.map((each) => {
            return <CardItem key={uuidv4()} details={each} />;
          })}
      </div>
    </>
  );
};

export default ProjectData;

//
