import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./index.css";

const PopupWindow = (props) => {
  //console.log(props);
  const data = props.carddetails;
  //console.log(data);
  const employeeId = data._id
  const projectData = data.Details.Advance.Projects;
  //console.log(projectData);
  //console.log(data.Details.Advance.TechStack.value)
  const TechStackList = data.Details.Advance.TechStack.map((x) => x.value);

  //console.log(TechStackList);
  return (
    <Modal
      {...props}
      key={props._id}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      autoFocus="true"
      className="transition"
      backdrop="false"
      contentClassName="body-color"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Developer Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body-color">
        <>
          <div className="details_container">
            <div className="top_details_container">
              <img src={data.Image_url} alt="" className="pop-image" />
              <div className="pop-card">
                <h6 className="pop-heading">
                  NAME :-<span className="pop-span">{ `  ${data.Name}`}</span>
                </h6>
                <h1 className="pop-heading">
                  ROLE :-<span className="pop-span">{`  ${data.Role.value}`}</span>
                </h1>
                <h1 className="pop-heading">
                  EXPERIENCE :-{" "}
                  <span className="pop-span">
                    {`  ${data.Details.Advance.Experience.value}`}
                  </span>
                </h1>
                <div className="skills-container">
                  <h1 className="pop-heading">Skills :</h1>
                  <span className="skills-list">
                    {TechStackList.map((x) => (
                      <span className="pop-span">{`${x} `}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
            <div className="projects-list">
              {projectData.map((eachItems) => {
                return (
                  <div className="pop-project_container">
                    <h1 className="pop-heading">
                      PROJECT :
                      <span className="pop-span">{`  ${eachItems.value}`}</span>
                    </h1>
                    <h1 className="pop-heading">
                      Role :
                      <span className="pop-span">{`  ${data.Role.value}`}</span>
                    </h1>
                   
                  </div>
                );
              })}
            </div>
          </div>
        </>
      </Modal.Body>
      <Modal.Footer className="close-btn">
        <Button onClick={props.onHide} href={"/update_employee/" + employeeId }>Update</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
     
    </Modal>
  );
};

export default PopupWindow;

// <h1 className="pop-heading">
// Allocation :
// <span className="pop-span">{`${eachItems.Allocation}`}</span>
// </h1>
