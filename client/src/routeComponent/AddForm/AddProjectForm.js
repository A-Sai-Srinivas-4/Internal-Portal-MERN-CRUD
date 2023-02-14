import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//import { getCards } from "../../redux/dataSlice";
import { fetchData, addProjectCard } from "../../redux/dataSlice";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./index.css";

const AddProjectForm = () => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ID: "",
    Name: "",
    Scrum_Master: "",
    Current_Sprint: "",
    Details: {
      Advance: {
        Start_Date: "",
        End_Date: "",
        "Sprint_Start Date": "",
        "Sprint_Release Date": "",
        Client: "",
        Product_Owner: "",
        QA_Team: [],
        Development_Team: [],
        Technology: [],
      },
    },
  });

  const history = useHistory();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  var data;

  if (Data.Resources !== undefined) {
    data = Data.Resources.Employee_Details;
    
  }

  var options = [];

  const team = {
    QA_Team: "QA_Team",
    Development_Team: "Development_Team",
    TechStacks: [
      "React JS",
      "Node Js",
      "Planet-9",
      "AI/ML",
      "Mongo-DB",
      "Python",
      "Java",
      "C",
      "C++",
    ],
  };

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "orange",
        primary: "green",
      },
    };
  }

  function uniqByKeepLast(each, key) {
    return [...new Map(each.map((x) => [key(x), x])).values()];
  }

  const onclickClose = () => {
    history.goBack();
  };

  const handleChange = (event, optionSelected) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDetailsChange = (event) => {
    setFormData({
      ...formData,
      Details: {
        Advance: {
          ...formData.Details.Advance,
          [event.target.name]: event.target.value,
        },
      },
    });
    
  };

  function handleSelectChange(selectedOption, selectedName) {
    setFormData({
      ...formData,
      Details: {
        ...formData.Details,
        Advance: {
          ...formData.Details.Advance,
          [selectedName]: selectedOption,
        },
      },
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    dispatch(addProjectCard(formData));

    setFormData({
      ID: "",
      Name: "",
      Scrum_Master: "",
      Current_Sprint: "",
      Details: {
        Advance: {
          Start_Date: "",
          End_Date: "",
          "Sprint_Start Date": "",
          "Sprint_Release Date": "",
          Client: "",
          Product_Owner: "",
          QA_Team: [],
          Development_Team: [],
          Technology: [],
        },
      },
    });

    history.goBack();
  };

  function MultiSelectDropdown(data, team) {
    console.log(data);
    
    if (data !== undefined) {
      options = [];
      data.forEach((each) => {
        if (team === "QA_Team") {
          if (each.Team.value === team) {
            return options.push({ value: each.Name, label: each.Name });
          }
        }

        if (team === "Development_Team") {
          if (each.Team.value === team) {
            return options.push({ value: each.Name, label: each.Name });
          }
        }

        if (
          Object.keys(team).filter((x) => x === "TechStacks") &&
          team.TechStacks !== undefined
        ) {
          return team.TechStacks.forEach((e) =>
            options.push({ value: e, label: e })
          );
        }
      });
    }

    console.log(options);

    const uniq_options = uniqByKeepLast(options, (o) => o.value);

    return (
      <Select
        components={makeAnimated()}
        theme={customTheme}
        options={uniq_options}
        onChange={(selectedOption) =>
          handleSelectChange(
            selectedOption,
            (team === "QA_Team" && "QA_Team") ||
              (team === "Development_Team" && "Development_Team") ||
              (Object.keys(team).filter((x) => x === "TechStacks") &&
                "Technology")
          )
        }
        className="multi-select"
        placeholder="Select"
        isSearchable
        isMulti
      />
    );
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="back-container">
            <AiOutlineClose
              className="back-option"
              onClick={onclickClose}
              size={40}
            />
          </div>
          <div className="form-details-container">
            <div className="label-card">
              <label htmlFor="ID">ID : </label>
              <input
                type="text"
                name="ID"
                placeholder="Project ID"
                value={formData.ID}
                onChange={handleChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Name">Title : </label>
              <input
                type="text"
                name="Name"
                placeholder="Project Title"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Scrum_Master">Scrum Master : </label>
              <input
                type="text"
                name="Scrum_Master"
                placeholder="Scrum Master"
                value={formData.Scrum_Master}
                onChange={handleChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Current_Sprint">Current Sprint : </label>
              <input
                type="text"
                name="Current_Sprint"
                placeholder="Current Sprint No"
                value={formData.Current_Sprint}
                onChange={handleChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Start_Date">Start Date : </label>
              <input
                type="date"
                name="Start_Date"
                placeholder="Start Date"
                value={formData.Details.Advance.Start_Date}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="End_Date">End Date : </label>
              <input
                type="date"
                name="End_Date"
                placeholder="End Date"
                value={formData.Details.Advance.End_Date}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Sprint_Start Date">Sprint Start Date : </label>
              <input
                type="date"
                name="Sprint_Start Date"
                placeholder="Sprint Start Date"
                value={formData.Details.Advance["Sprint_Start Date"]}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Sprint_Release Date">
                Sprint Release Date :{" "}
              </label>
              <input
                type="date"
                name="Sprint_Release Date"
                placeholder="Sprint Release Date"
                value={formData.Details.Advance["Sprint_Release Date"]}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Client">Client : </label>
              <input
                type="text"
                name="Client"
                placeholder="Client"
                value={formData.Details.Advance.Client}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Product_Owner">Product Owner : </label>
              <input
                type="text"
                name="Product_Owner"
                placeholder="Product Owner"
                value={formData.Details.Advance.Product_Owner}
                onChange={handleDetailsChange}
              />
            </div>

            <div className="label-card">
              <label htmlFor="QA_Team">QA Team : </label>
              {MultiSelectDropdown(data, team.QA_Team)}
            </div>
            <div className="label-card">
              <label htmlFor="Development_Team">Development Team : </label>
              {MultiSelectDropdown(data, team.Development_Team)}
            </div>
            <div className="label-card">
              <label htmlFor="Technology">Technology : </label>
              {MultiSelectDropdown(data, team)}
            </div>
          </div>
          <div className="submit-container">
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProjectForm;


