import React from "react";
import "./index.css";

const GetData = ({ Details }) => {
  

  const getListItems = (list) => {
    const value = list.map((e) => e.value);

    if (value.length !== 0) {
      return value.map((e, index) => {
        if (index < value.length - 1) {
          return (
            <span key={index} className="list-values">
              {e},
            </span>
          );
        } else {
          return (
            <span key={index} className="list-values">
              {e}
            </span>
          );
        }
      });
    } else {
      return <span className="list-values">null</span>;
    }
  };

  return Object.entries(Details)
    .slice(1,-1)
    .map(([key, value]) => (
      <div key={key} className="key-value-card">
        {key.includes("_") ? (
          <>
            <div className="project-key-details">
              <h5>{key.replace("_", " ")} :</h5>
            </div>
            <div className="project-value-details">
              {Array.isArray(value) ? (
                <div className="list-container">{getListItems(value)}</div>
              ) : (
                <h5>{value}</h5>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="project-key-details">
              <h5>{key} :</h5>
            </div>
            <div className="project-value-details">
              {Array.isArray(value) ? (
                <div className="list-container">{getListItems(value)}</div>
              ) : (
                value
              )}
            </div>
          </>
        )}
      </div>
    ));
};

export default GetData;
