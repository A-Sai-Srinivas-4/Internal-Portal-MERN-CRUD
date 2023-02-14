import { Route, Switch } from "react-router-dom";
import Developers from "./routeComponent/Developers";
import Home from "./routeComponent/Home";
import Projects from "./routeComponent/Projects";
import ProjectDetails from "./routeComponent/ProjectDetails";
import NotFound from "./routeComponent/NotFound";
import AddProjectForm from "./routeComponent/AddForm/AddProjectForm";
import AddEmployeeForm from "./routeComponent/AddForm/AddEmployeeForm";
import UpdateProjectForm from "./routeComponent/UpdateForm/UpdateProjectForm"
import UpdateEmployeeForm from "./routeComponent/UpdateForm/UpdateEmployeeForm";

import "./App.css";

const App = () => {
  return (
    <>
      <div className="app-container">
        <div className="responsive-container">
          <div className="app-body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/developers" component={Developers} />
              <Route exact path="/Projects" component={Projects} />
              <Route exact path="/project_details" component={ProjectDetails} />
              <Route exact path="/add_project" component={AddProjectForm} />
              <Route exact path="/update_project/:projectId" component={UpdateProjectForm} />
              <Route exact path="/add_Employee" component={AddEmployeeForm} />
              <Route exact path="/update_employee/:employeeId" component={UpdateEmployeeForm} />
              <Route
                exact
                path="/project_details/:projectname"
                component={ProjectDetails}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
