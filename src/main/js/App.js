import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import EditPhysician from "../../../frontend/src/components/EditPhysician";
import AddPhysician from "./../../../frontend/src/components/AddPhysician";
import PhysiciansList from "./../../../frontend/src/components/PhysicianList";

import AddPatient from "./../../../frontend/src/components/patients/AddPatient";
import EditPatient from "./../../../frontend/src/components/patients/EditPatient";
import PatientsList from "./../../../frontend/src/components/patients/PatientList";

// import Patient from './../../../frontend/src/components/patients/index';
// import { AddPatient, EditPatient, PatientsList } from './../../../frontend/src/components/patients/index';

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/" className="navbar-brand">
                    PSIC
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/physicians"} className="nav-link">
                            Physicians
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/physician/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/patients"} className="nav-link">
                            Patients
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/physicians"]} component={PhysiciansList} />
                    <Route exact path="/physician/add" component={AddPhysician} />
                    <Route path="/physicians/:id" component={EditPhysician} />

                    <Route exact path="/patients" component={PatientsList} />
                    <Route exact path="/patient/add" component={AddPatient} />
                    <Route path="/patients/:id" component={EditPatient} />
                </Switch>
            </div>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
