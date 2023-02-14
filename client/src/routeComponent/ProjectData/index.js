import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CardItem from "../CardItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../redux/dataSlice";
import "./index.css";

const ProjectData = () => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();
 
  useEffect(() => {
   
    dispatch(fetchData());
  }, [dispatch]);

  var Project_details;
  if (Data.Resources !== undefined) {
    Project_details = Data.Resources.Project_Details.map((eachItems) => {
      return eachItems;
    });
    
    const newArray = [];
    Project_details.map((eachItem) => {
      const y = newArray.push(eachItem.Name);
      return y;
    });
  }

  


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


