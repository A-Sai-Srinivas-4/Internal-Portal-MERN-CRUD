import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
//import Data from "../Json/data.json";
import EmployeeCard from "../EmployeeCard";
import { useSelector, useDispatch } from "react-redux";
//import {getCards } from "../../redux/dataSlice";
import { fetchData } from "../../redux/dataSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
//import axios from "axios";
import "./index.css";

const DeveloperData = () => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [devEmpList, setDevEmpList] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  //console.log(Data);

  // async function fetchData() {
  //   await axios.get(`http://localhost:8000/api/resources`).then((res) => {
  //     const reso = res.data;
  //     //console.log(reso);
  //     setData(reso);
  //   });
  // }

  //console.log(Data.Resources)
  //console.log(Data1);
  //console.log(Data.Resources.Employee_Details.length)
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (Data.Resources.Employee_Details.length > 0) {
      //setDevEmpList(prevList => [...prevList, ...Data.Resources.Employee_Details]);
      setDevEmpList(Data.Resources.Employee_Details);
      setDataLoaded(true);
    }
  }, [Data]);

  //console.log(Data);

  // useEffect(() => {
  //   fetchData();
  //   //console.log(devEmpList);
  //   if (Data1.Resources !== undefined) {
  //     //console.log(Data1.Resources.Employee_Details);
  //     setDevEmpList(Data1.Resources.Employee_Details);
  //   }

  // }, []);

  const renderSearchSection = () => (
    <div className="search-container">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="search"
        placeholder="Search"
      />
    </div>
  );

  // console.log("data", devEmpList);

  const renderDevList = () => (
    <ul className="dev-cards-list">
      {isDataLoaded ? (
        devEmpList
          .filter((each) =>
            each.Name.toLowerCase().includes(search.toLowerCase())
          )
          .map((eachCard) => (
            <EmployeeCard cardDetails={eachCard} key={eachCard._id} />
          ))
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </ul>
  );

  const showDevDetailsByOnSite = (event) => {
    const myArray = [];
    if (Data.Resources.Employee_Details.length > 0) {
      Data.Resources.Employee_Details.map(
        (each) =>
          each.Details.Advance.Offshore === event.target.value && [
            myArray.push(each),
          ]
      );

      myArray.forEach((element) => {
        setDevEmpList(myArray);
      });
    }
  };

  const showDevDetailsByOffshore = (event) => {
    const myArray = [];
    if (Data.Resources.Employee_Details.length > 0) {
      Data.Resources.Employee_Details.map(
        (each) =>
          each.Details.Advance.Offshore === event.target.value && [
            myArray.push(each),
          ]
      );
      myArray.forEach((element) => {
        setDevEmpList(myArray);
      });
    }
  };

  const showDevDetailsByRole = (event) => {
    const myArray = [];
    if (Data.Resources.Employee_Details.length > 0) {
      Data.Resources.Employee_Details.map(
        (each) => each.Role.value === event.target.value && [myArray.push(each)]
      );
      myArray.forEach((element) => {
        setDevEmpList(myArray);
      });
    }
  };

  const DropdownByOnSite = () => {
    if (Data.Resources.Employee_Details.length > 0) {
      const onsiteDetails = [
        ...new Set(
          Data.Resources.Employee_Details.map(
            (e) => e.Details.Advance.Offshore === "False" && "False"
          )
        ),
      ];

      //console.log(onsiteDetails);

      return (
        <div className="off-shore-button-container">
          <button
            className="off-shore-option"
            onClick={showDevDetailsByOnSite}
            value="False"
          >
            On Site
          </button>
        </div>
      );
    }
  };

  const DropdownByOffshore = () => {
    if (Data.Resources.Employee_Details.length > 0) {
      const offshoreDetails = [
        ...new Set(
          Data.Resources.Employee_Details.map(
            (e) => e.Details.Advance.Offshore && "True"
          )
        ),
      ];

      //console.log(offshoreDetails);

      return (
        <div className="off-shore-button-container">
          <button
            className="off-shore-option"
            onClick={showDevDetailsByOffshore}
            value="True"
          >
            Off Shore
          </button>
        </div>
      );
    }
  };

  const DropdownByRole = () => {
    if (Data.Resources.Employee_Details.length > 0) {
      const roleDetails = [
        ...new Set(Data.Resources.Employee_Details.map((e) => e.Role.value)),
      ];

      //console.log(roleDetails)

      return (
        <Dropdown>
          <div className="roles-clear-container">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Role
            </Dropdown.Toggle>
          </div>

          <Dropdown.Menu className="drop-menu-container">
            {roleDetails.map((e) => {
              return (
                <input
                  type="button"
                  className="role-option"
                  name="Role"
                  value={e}
                  onClick={showDevDetailsByRole}
                />
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  // function renderData() {
  //   setTimeout(() => {
  //     setDevEmpList(Data.Resources.Employee_Details);
  //     setDataLoaded(isDataLoaded);
  //   }, 1);
  // }

  //console.log(Data.Resources);

  return (
    <>
      {Data.Resources.Employee_Details.length > 0 && (
        <>
          <div className="dev-display-container">
            <div className="dropdown-container">
              {DropdownByRole()}
              {DropdownByOffshore()}
              {DropdownByOnSite()}
              <button
                className="clear-btn"
                onClick={() => setDevEmpList(Data.Resources.Employee_Details)}
              >
                Clear
              </button>
            </div>

            <div>{renderSearchSection()}</div>
          </div>
          {renderDevList()}
        </>
      )}
    </>
  );
};

export default DeveloperData;
