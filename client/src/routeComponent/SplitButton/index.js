import React, { useEffect } from "react";
//import Data from "../Json/data.json";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
//import { getCards } from "../../redux/dataSlice";
import { fetchData, addEmployeeDetails } from "../../redux/dataSlice";
//import axios from "axios";

const SplitBasic = () => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();

  useEffect(() => {
    //fetchData();
    dispatch(fetchData());
  }, [dispatch]);

  //console.log(Data);

  //const [Data1, setData] = useState([]);

  // const fetchData = () => {
  //   axios.get(`http://localhost:8000/api/resources`).then((res) => {
  //     const reso = res.data;
  //     //console.log(reso.length);
  //     setData(reso);
  //   });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  var Project_details;
  if (Data !== undefined) {
    Project_details = Data.Resources.Project_Details.map((eachItems) => {
      return eachItems;
    });
  }

  return (
    <Dropdown as={ButtonGroup} autoClose="outside">
      <Button href="/projects" variant="success">
        Projects
      </Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
      <div className="menu-container">
        <Dropdown.Menu>
          {Data.Resources &&
            Project_details.map((each) => (
              <Dropdown.Item
                key={each.ID}
                href={`/project_details/${each.Name}`}
              >
                {each.Name}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
};

export default SplitBasic;
