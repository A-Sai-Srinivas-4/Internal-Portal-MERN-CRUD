import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEmployeeCard } from "../../redux/dataSlice";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { Button } from "@material-ui/core";
import "./index.css";

const PopupWindow = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const data = props.carddetails;

  const employeeId = data._id;
  const projectData = data.Details.Advance.Projects;

  const TechStackList = data.Details.Advance.TechStack.map((x) => x.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (event, employeeId) => {
    event.preventDefault();
    handleClickOpen();

    try {
      dispatch(deleteEmployeeCard(employeeId));
      history.push("/developers");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

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
                  NAME :-<span className="pop-span">{`  ${data.Name}`}</span>
                </h6>
                <h1 className="pop-heading">
                  ROLE :-
                  <span className="pop-span">{`  ${data.Role.value}`}</span>
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
        <Button onClick={props.onHide} href={"/update_employee/" + employeeId}>
          Update
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this project?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this Employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(event) => {
                handleDelete(event, employeeId);
                handleClose();
              }}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupWindow;
