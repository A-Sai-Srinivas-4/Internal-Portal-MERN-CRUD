import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GetSidebar from "../Sidebar/Sidebar";
import Header from "../Header";
import GetData from "../GetData";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../redux/dataSlice";
import { Button } from "@material-ui/core"; // import Button component from Material UI
import Box from "@material-ui/core/Box";
import "./index.css";

const ProjectDetails = ({ match }) => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();
  const { projectname } = useParams();

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

  var Details;

  if (Data.Resources !== undefined) {
    Details = fetchEmpData();
    //console.log(Details)
  }

  const projectId = Details._id;
  console.log(projectId);

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
                  style={{ color: "white" }}
                  href={"/update_project/" + projectId}
                >
                  Update
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// //import Data from "../Json/data.json";
// import GetSidebar from "../Sidebar/Sidebar";
// import Header from "../Header";
// import GetData from "../GetData";
// import { useSelector, useDispatch } from "react-redux";
// //import { getCards } from "../../redux/dataSlice";
// import { fetchData } from "../../redux/dataSlice";
// //import axios from "axios";
// import "./index.css";

// const ProjectDetails = ({ match }) => {
//   const Data = useSelector((state) => state.Data);
//   const dispatch = useDispatch();
//   const { projectname } = useParams();

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);

//   //console.log(Data);

//   const fetchEmpData = () => {
//     const tempObj = {};

//     Object.entries(Data.Resources.Project_Details).map((e) => {
//       if (e[1].Name === projectname) {
//         for (let [key, value] of Object.entries(e[1])) {
//           if (key !== "Details") {
//             tempObj[key] = value;
//           } else {
//             for (let [key, value] of Object.entries(e[1].Details.Advance)) {
//               tempObj[key] = value;
//             }
//           }
//         }
//       }
//     });

//     return tempObj;
//   };

//   var Details;

//   if (Data.Resources !== undefined) {
//     Details = fetchEmpData();
//     //console.log(Data);
//     //console.log(Details);
//   }

//   return (
//     <>
//       <Header />
//       <div className="sidebar-project-details-container">
//         {GetSidebar()}
//         <div className="project-details-card ">
//           <div className="emp-details-container">
//             <div className="project-heading-container">
//               <h1 className="project-heading">{projectname}</h1>
//             </div>
//             <div className="emp-card">
//               <div className="keys-values-container">
//                 {Data.Resources && <GetData Details={Details} />}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectDetails;
