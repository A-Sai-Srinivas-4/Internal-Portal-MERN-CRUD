import React, { useState } from "react";
import PopupWindow from "../PopupWindow";
import { ButtonToolbar } from "react-bootstrap";
import Card from "react-animated-3d-card";
import "./index.css";

const EmployeeCard = (props) => {
  const [addModalShow, setModalShow] = useState(false);

  // const randomcolors = () => {
  //   return "#" + Math.floor(Math.random() * 26743815).toString(16);
  // };

  const colorPalette = () => {
    const colors = [
      "#2596be", // shade of cyan
      "#9370DB", // MediumPurple
      "#663399", // RebeccaPurple
      "#4B0082", // Indigo
      "#7B68EE", // MediumSlateBlue
      "#483D8B", // DarkSlateBlue
      "#0f470f",
      "#008080", // Teal
      "#228B22", // ForestGreen
      "#6B8E23", // OliveDrab
      "#FFFF00", // Yellow
      "#FFD700", // Gold
      "#FFA500", // Orange
      "#FF8C00", // DarkOrange
      "#FF4500", // OrangeRed
      "#B22222", // FireBrick
      "#A52A2A", // Brown
      "#D2691E", // Chocolate
      "#8B4513", // SaddleBrown
      "#696969", // DimGray
      "#808080", // Gray
      "#A9A9A9", // DarkGray
      "#C0C0C0", // Silver
      "#D3D3D3", // LightGray
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  let addModalClose = () => setModalShow(false);

  const { cardDetails } = props;
  //console.log(cardDetails)
  const { ID, Name, Image_url, Role, Details } = cardDetails;
  const { Advance } = Details;
  const { Projects } = Advance;
  // const { id, Name, Role, image_url, Projects } = cardDetails;
  // console.log(Name)

  return (
    <>
      <ButtonToolbar key={ID}>
        <Card
          onClick={() => setModalShow(true)}
          style={{
            width: "20rem",
            height: "14rem",
            margin: "1rem",
            backgroundColor: colorPalette(),
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          <div className="card_container">
            <div className="card_image">
              <img src={Image_url} alt="imagess" className="dev-image" />

              <h4 className="headings">{Name}</h4>
            </div>
            <hr />
            <div className="card_bottom">
              <h6 className="role_heading">
                ROLE :- <span className="span">{Role.value}</span>
              </h6>

              <div className="card_project">
                <h6 className="project_heading">Project-Name:-</h6>

                <div className="span_project">
                  {Projects.length > 0 ? (
                    Projects.map((each) => (
                      <span className="span">{each.value}</span>
                    ))
                  ) : (
                    <h6> -------- </h6>
                  )}
                </div>
              </div>

              {Projects.length > 2 ? (
                <h3 className="anchor">Show-More >>></h3>
              ) : (
                " "
              )}
            </div>
          </div>
        </Card>

        <PopupWindow
          show={addModalShow}
          onHide={addModalClose}
          carddetails={cardDetails}
        />
      </ButtonToolbar>
    </>
  );
};

export default EmployeeCard;
