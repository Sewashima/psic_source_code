import React, { useState, useEffect } from "react";
import PatientDataService from "../../services/PatientsService";
import { Link } from "react-router-dom";
const utils = require('../../utils');

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrievePatients();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrievePatients = () => {
        PatientDataService.getAll()
            .then(response => {
                setPatients(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrievePatients();
        setCurrentPatient(null);
        setCurrentIndex(-1);
    };

    const setActivePatient = (patient, index) => {
        setCurrentPatient(patient);
        setCurrentIndex(index);
    };

    const findByTitle = () => {
        PatientDataService.findByTitle(searchTitle)
            .then(response => {
                setPatients(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Patients List</h4>

                <ul className="list-group">
                    {patients &&
                    patients.map((patient, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActivePatient(patient, index)}
                            key={index}
                        >
                            {index + 1} - {patient.firstName} {patient.lastName}
                        </li>
                    ))}
                </ul>

                {/*<div className="container">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {patients && patients.map((patient, index) => (

                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td><button className="btn btn-info" onClick={() => setActivePatient(patient, index)}>View</button></td>
                            </tr>

                        ))}
                        </tbody>
                    </table>
                </div>*/}

            </div>
            <div className="col-md-6">
                {currentPatient ? (
                    <div>
                        <h4>Patient</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentPatient.title}
                        </div>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentPatient.firstName} {currentPatient.lastName}
                        </div>
                        <div>
                            <label>
                                <strong>Age:</strong>
                            </label>{" "}
                            {currentPatient.age}
                        </div>
                        <div>
                            <label>
                                <strong>Phone:</strong>
                            </label>{" "}
                            {currentPatient.phoneNumber}
                        </div>
                        <div>
                            <label>
                                <strong>Address:</strong>
                            </label>{" "}
                            {currentPatient.address}
                        </div>

                        <Link
                            to={"/patients/" + currentPatient.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Patient...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientsList;