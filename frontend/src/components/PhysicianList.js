import React, { useState, useEffect } from "react";
import PhysicianDataService from "../services/PhysiciansService";
import { Link } from "react-router-dom";
const utils = require('../utils');

const PhysiciansList = () => {
    const [physicians, setPhysicians] = useState([]);
    const [currentPhysician, setCurrentPhysician] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrievePhysicians();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrievePhysicians = () => {
        PhysicianDataService.getAll()
            .then(response => {
                setPhysicians(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrievePhysicians();
        setCurrentPhysician(null);
        setCurrentIndex(-1);
    };

    const setActivePhysician = (physician, index) => {
        setCurrentPhysician(physician);
        setCurrentIndex(index);
    };

    const addPhysician = () => {
        PhysicianDataService.create()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        PhysicianDataService.findByTitle(searchTitle)
            .then(response => {
                setPhysicians(response.data);
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
                <h4>Physicians List</h4>

                <ul className="list-group">
                    {physicians &&
                    physicians.map((physician, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActivePhysician(physician, index)}
                            key={index}
                        >
                            {physician.firstName} {physician.lastName}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-secondary"
                    onClick={addPhysician}
                >
                    Add Physician
                </button>


                <Link to={"/appointment/add"} className="badge badge-info">
                    Book an Appointment
                </Link>
            </div>
            <div className="col-md-6">
                {currentPhysician ? (
                    <div>
                        <h4>Physician</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentPhysician.title}
                        </div>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentPhysician.firstName} {currentPhysician.lastName}
                        </div>
                        <div>
                            <label>
                                <strong>Expertise:</strong>
                            </label>{" "}
                            {currentPhysician.expertise}
                        </div>
                        <div>
                            <label>
                                <strong>Phone:</strong>
                            </label>{" "}
                            {currentPhysician.phoneNumber}
                        </div>
                        <div>
                            <label>
                                <strong>Consultation Time:</strong>
                            </label>{" "}
                            {currentPhysician.consultationTime}
                        </div>
                        <div>
                            <label>
                                <strong>Address:</strong>
                            </label>{" "}
                            {currentPhysician.address}
                        </div>
                        <div>
                            <label>
                                <strong>Employment Date:</strong>
                            </label>{" "}
                            {utils.dateYMD(currentPhysician.createdAt)}
                        </div>

                        {/*<Link
                            to={"/physicians/" + currentPhysician.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>*/}
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Physician...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhysiciansList;