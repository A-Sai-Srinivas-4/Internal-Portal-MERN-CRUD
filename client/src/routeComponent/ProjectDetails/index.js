import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetSidebar from "../Sidebar/Sidebar";
import Header from "../Header";
import GetData from "../GetData";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProjectCard, fetchData } from "../../redux/dataSlice";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import "./index.css";

const ProjectDetails = ({ match }) => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { projectname } = useParams();
  const history = useHistory();

  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  
  const fetchEmpData = () => {
    const tempObj = {};

    
    
    Object.entries(Data.Resources.Project_Details).map((e) => {
      if (e[1].Name === projectname) {
        for (let [key, value] of Object.entries(e[1])) {
          if (key !== "Details") {
            tempObj[key] = value;
          } else {
            for (let [key, value] of Object.entries(e[1].Details.Advance)) {
              tempObj[key] = value;
            }
          }
        }
      }
    });

    return tempObj;
  };

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  
  
  const handleClose = () => {
    setOpen(false);
  };

  
  var Details;

  if (Data.Resources !== undefined) {
    Details = fetchEmpData();
  }

  
  const handleDelete = (event, projectId) => {
    event.preventDefault();
    handleClickOpen();
    try {
      dispatch(deleteProjectCard(projectId));
      history.push("/projects");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  const projectId = Details._id;
  

  return (
    <>
      <Header />
      <div className="sidebar-project-details-container">
        {GetSidebar()}
        <div className="project-details-card ">
          <div className="emp-details-container">
            <div className="project-heading-container">
              <h1 className="project-heading">{projectname}</h1>
            </div>
            <div className="emp-card">
              <div className="keys-values-container">
                {Data.Resources && <GetData Details={Details} />}
              </div>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ color: "white", marginRight: "60px" }}
                  href={"/update_project/" + projectId}
                >
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
                      Are you sure you want to delete this project?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={(event) => {
                        handleDelete(event, projectId);
                        handleClose();
                      }}
                      color="primary"
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
