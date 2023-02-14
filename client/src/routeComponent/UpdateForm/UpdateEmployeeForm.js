import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { fetchData, updateEmployeeCard } from "../../redux/dataSlice";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import makeAnimated from "react-select/animated";
//import { Button, Alert, CircularProgress } from "@mui/material";
import axios from "axios";


const UpdateEmployeeForm = () => {
  const Data = useSelector((state) => state.Data);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});
  const {employeeId} = useParams();
  const history = useHistory();

  //console.log(Data)

  useEffect(() => {
    dispatch(fetchData());
    axios
      .get(`/api/employeedetails/${employeeId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId,dispatch]);

  var data;
  var project_data;

  if (Data.Resources !== undefined) {
    data = Data.Resources.Employee_Details;
    project_data = Data.Resources.Project_Details;

    //console.log(data)
  }
  //console.log(project_data)

  var options = {
    Gender: [
      { name: "Male", value: "Male" },
      { name: "Female", value: "Female" },
      { name: "Others", value: "Others" },
    ],
    Role: [
      { name: "Testing", value: "Testing" },
      { name: "Jr Developer", value: "Jr Developer" },
      { name: "Sr Developer", value: "Sr Developer" },
    ],
    Team: [
      { name: "QA_Team", value: "QA_Team" },
      { name: "Development_Team", value: "Development_Team" },
      { name: "AWS_Team", value: "AWS_Team" },
    ],
    Experience: [
      { name: "Fresher", value: "Fresher" },
      { name: "<1 Year", value: "<1 Year" },
      { name: "1-3 Years", value: "1-3 Years" },
      { name: ">5 Years", value: ">5 Years" },
    ],
    TechStack: [
      { name: "React-JS", value: "React-JS" },
      { name: "Node-Js", value: "Node-Js" },
      { name: "Planet-9", value: "Planet-9" },
      { name: "AI/ML", value: "AI/ML" },
      { name: "Mongo-DB", value: "Mongo-DB" },
      { name: "Python", value: "Python" },
      { name: "Java", value: "Java" },
      { name: "C", value: "C" },
      { name: "C++", value: "C++" },
      { name: "AWS", value: "AWS" },
      { name: "SAP", value: "SAP" },
      { name: "Power BI", value: "Power BI" },
      { name: "SQL", value: "SQL" },
    ],
    Employment: [
      { name: "Full-Time", value: "Full-Time" },
      { name: "Part-Time", value: "Part-Time" },
      { name: "Internship", value: "Internship" },
      { name: "Temporary", value: "Temporary" },
    ],
    Projects: [],
  };

  if (project_data !== undefined) {
    const projectName = project_data.map((x) => x.Name);
    projectName.forEach((x) => options.Projects.push({ name: x, value: x }));
  }
  //console.log(options);

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleDetailsChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     Details: {
  //       Advance: {
  //         ...formData.Details.Advance,
  //         [event.target.name]: event.target.value,
  //       },
  //     },
  //   });
  // };

  // function handleSelectChange(selectedOption, selectedName) {
  //   setFormData({
  //     ...formData,
  //     [selectedName]: selectedOption,
  //     Details: {
  //       ...formData.Details,
  //       Advance: {
  //         ...formData.Details.Advance,
  //         [selectedName]: selectedOption,
  //       },
  //     },
  //   });
  // }

  function handleSelectChange(selectedOption, selectedName) {
    setFormData((prevFormData) => {
      if (selectedName === "Employment" || selectedName === "Experience") {
        return {
          ...prevFormData,
          Details: {
            ...prevFormData.Details,
            Advance: {
              ...prevFormData.Details.Advance,
              [selectedName]: selectedOption,
            },
          },
        };
      } else {
        return {
          ...prevFormData,
          [selectedName]: selectedOption,
          Details: {
            ...prevFormData.Details,
            Advance: {
              ...prevFormData.Details.Advance,
            },
          },
        };
      }
    });
  }

  function handleMultiSelectChange(selectedOption, selectedName) {
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      Details: {
        ...formData.Details,
        Advance: {
          ...formData.Details.Advance,
          [event.target.name]: event.target.value,
          selectedOption: event.target.value,
        },
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(formData);

    dispatch(updateEmployeeCard(formData));

    setFormData({
      ID: "",
      Name: "",
      Role: "",
      Image_url:
        "https://www.kindpng.com/picc/m/4-41409_developer-png-png-download-developer-png-no-background.png",
      Team: "",
      Details: {
        Advance: {
          Experience: "",
          TechStack: [],
          Employment: "",
          Offshore: "",
          Projects: [],
        },
      },
    });

    history.push("/developers");
  };

  function MultiSelectDropdown(formData,data, opt, key) {
    const optionList = [];

    if (data !== undefined) {
      opt.forEach((each) => {
        optionList.push({ value: each.name, label: each.name });
      });
    }
    // console.log(optionList)
    const uniq_options = uniqByKeepLast(optionList, (o) => o.value);
    //console.log(uniq_options);
    return key === "TechStack" || key === "Projects" ? (
      <Select
        components={makeAnimated()}
        theme={customTheme}
        options={uniq_options}
        onChange={(selectedOption) =>
          handleMultiSelectChange(selectedOption, key)
        }
        value={(key === "TechStack" && formData.Details.Advance.TechStack) || (key === "Projects" && formData.Details.Advance.Projects)}
        className="multi-select"
        placeholder="Select"
        isSearchable
        isMulti
      />
    ) : (
      <Select
        components={makeAnimated()}
        theme={customTheme}
        options={uniq_options}
        onChange={(selectedOption) => handleSelectChange(selectedOption, key)}
        value={(key === "Role" && formData.Role) || (key === "Team" && formData.Team)|| (key === "Employment" && formData.Details.Advance.Employment) || (key === "Experience" && formData.Details.Advance.Experience) }
        className="multi-select"
        placeholder="Select"
        isSearchable
      />
    );
  }

  return (
    formData._id !== undefined && (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="back-container">
            <Link to="/developers">
              <AiOutlineClose className="back-option" onClick={onclickClose} size={40} />
            </Link>
          </div>

          <div className="form-details-container">
            <div className="label-card">
              <label htmlFor="ID">Emp Id : </label>
              <input
                type="text"
                name="ID"
                placeholder="Emp Id"
                value={formData.ID}
                onChange={handleChange}
              />
            </div>
            <div className="label-card">
              <label htmlFor="Name">Name : </label>
              <input
                type="text"
                name="Name"
                placeholder="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>

            <div className="label-card">
              <label htmlFor="Role">Role : </label>
              {MultiSelectDropdown(formData,data, options.Role, "Role")}
            </div>
            <div className="label-card">
              <label htmlFor="Team">Team : </label>

              {MultiSelectDropdown(formData,data, options.Team, "Team")}
            </div>
            <div className="label-card">
              <label htmlFor="Experience">Experience : </label>
              {MultiSelectDropdown(formData,data, options.Experience, "Experience")}
            </div>
            <div className="label-card">
              <label htmlFor="TechStack">TechStack : </label>
              {MultiSelectDropdown(formData,data, options.TechStack, "TechStack")}
            </div>
            <div className="label-card">
              <label htmlFor="Employment">Employment : </label>
              {MultiSelectDropdown(formData,data, options.Employment, "Employment")}
            </div>

            <div className="label-card wrapper">
              <label htmlFor="Offshore">Offshore : </label>
              <div className="radio-container">
                <p className="radio">
                  <input
                    type="radio"
                    className="radio-input"
                    name="Offshore"
                    value="True"
                    checked={formData.Details.Advance.Offshore === 'True'} 
                    onChange={handleOptionChange}
                  />
                  Yes
                </p>
                <p className="radio">
                  <input
                    type="radio"
                    className="radio-input"
                    name="Offshore"
                    value="False"
                    checked={formData.Details.Advance.Offshore === 'False'} 
                    onChange={handleOptionChange}
                  />
                  No
                </p>
              </div>
            </div>

            <div className="label-card">
              <label htmlFor="Projects">Projects : </label>
              {MultiSelectDropdown(formData,data, options.Projects, "Projects")}
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
    )
  );
  
};

export default UpdateEmployeeForm;

// <Button
//             type="submit"
//             variant="contained"
//             size="small"
//             sx={{
//               margin: "0.9rem 0rem",
//               fontFamily: "'Abel', 'sansSerif'",
//             }}
//           >
//             {Data.addEmployeeCardStatus === "pending" ||
//             Data.updateTodoStatus === "pending" ? (
//               <CircularProgress size={24} color="secondary" />
//             ) : formData._id ? (
//               "Update Task"
//             ) : (
//               "Add Task"
//             )}
//           </Button>

//           {Data.addTodoStatus === "rejected" ? (
//             <Alert severity="error">{Data.addTodoError}</Alert>
//           ) : null}
//           {Data.addTodoStatus === "success" ? (
//             <Alert severity="success">Task Added...</Alert>
//           ) : null}
//           {Data.updateTodoStatus === "rejected" ? (
//             <Alert severity="error">{Data.updateTodoError}</Alert>
//           ) : null}
//           {Data.updateTodoStatus === "success" ? (
//             <Alert severity="success">Task Updated...</Alert>
//           ) : null}
//           {Data.deleteTodoStatus === "rejected" ? (
//             <Alert severity="error">{Data.deleteTodoError}</Alert>
//           ) : null}
//           {Data.deleteTodoStatus === "success" ? (
//             <Alert severity="warning">A todo was deleted...</Alert>
//           ) : null}

// ID: "",
// Name: "",
// Role: "",
// Image_url: "",
// Team: "",
// Details: {
//   Advance: {
//     Experience: "",
//     TechStack: "",
//     Employment: "",
//     Offshore: "",
//     Projects: [
//       { Project_id: "", Project: "" },
//       { Project_id: "", Project: "" },
//     ],
//   },

// <div className="label-card">
//   <label htmlFor="Gender">Gender : </label>
//   {MultiSelectDropdown(data, options.Gender)}
// </div>
