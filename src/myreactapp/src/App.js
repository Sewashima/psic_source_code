import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from "react-dom";

import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import EditPhysician from "./components/EditPhysician";
import AddPhysician from "./components/AddPhysician";
import PhysiciansList from "./components/PhysicianList";

import AddPatient from "./components/patients/AddPatient";
import EditPatient from "./components/patients/EditPatient";
import PatientsList from "./components/patients/PatientList";

import AddAppointment from "./components/appointments/AddAppointment";
import EditAppointment from "./components/appointments/EditAppointment";
import AppointmentList from "./components/appointments/AppointmentList";

import AddVisitorAppointment from "./components/visitorAppointments/AddVisitorAppointment";
import EditVisitorAppointment from "./components/visitorAppointments/EditVisitorAppointment";
import VisitorAppointmentList from "./components/visitorAppointments/VisitorAppointmentList";

import ReportsList from "./components/reports/ReportList";

// import Patient from './components/patients/index';
// import { AddPatient, EditPatient, PatientsList } from './components/patients/index';

function App() {

  /*return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );*/

  return (
      <BrowserRouter>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/index.html" className="navbar-brand">
              PSIC
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/appointments"} className="nav-link">
                  Treatment Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/visitor-appointments"} className="nav-link">
                  Visitor Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/physicians"} className="nav-link">
                  Physicians
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/patients"} className="nav-link">
                  Patients
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/reports"} className="nav-link">
                  Reports
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/index.html", "/appointments"]} component={AppointmentList} />
              <Route exact path="/appointment/add" component={AddAppointment} />
              <Route path="/appointments/:id" component={EditAppointment} />

              <Route exact path="/visitor-appointments" component={VisitorAppointmentList} />
              <Route exact path="/visitor-appointment/add" component={AddVisitorAppointment} />
              <Route path="/visitor-appointments/:id" component={EditVisitorAppointment} />

              <Route exact path="/physicians" component={PhysiciansList} />
              <Route exact path="/physician/add" component={AddPhysician} />
              <Route path="/physicians/:id" component={EditPhysician} />

              <Route exact path="/patients" component={PatientsList} />
              <Route exact path="/patient/add" component={AddPatient} />
              <Route path="/patients/:id" component={EditPatient} />

              <Route exact path="/reports" component={ReportsList} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
  );
}

/*ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("App")
);*/

export default App;
