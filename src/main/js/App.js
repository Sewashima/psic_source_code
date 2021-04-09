import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import Physician from "./../../../frontend/src/components/Physician";
import AddPhysician from "./../../../frontend/src/components/AddPhysician";
import PhysiciansList from "./../../../frontend/src/components/PhysicianList";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/physicians" className="navbar-brand">
                    bezKoder
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/physicians"} className="nav-link">
                            Physicians
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/physicians"]} component={PhysiciansList} />
                    <Route exact path="/add" component={AddPhysician} />
                    <Route path="/physicians/:id" component={Physician} />
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
