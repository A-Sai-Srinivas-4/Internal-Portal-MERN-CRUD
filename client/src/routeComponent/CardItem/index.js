import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const CardItem = ({ details }) => {
  const { ID, Name, Scrum_Master, Current_Sprint } = details;

  

  return (
    <div className="container">
      <div className="card">
        <div className="box">
          <div className="content">
            <Link
              to={`/project_details/${Name}`}
              className="card-link"
            >
              <div key={ID} >
                <h3 className="heading-text">{Name}</h3>
                <p className="">Scrum Master : {Scrum_Master}</p>
                <p className="">Current Sprint : {Current_Sprint}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
