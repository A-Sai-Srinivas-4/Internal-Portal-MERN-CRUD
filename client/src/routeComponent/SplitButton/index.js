import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../redux/dataSlice";

const SplitBasic = () => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
