import React, { useState, useEffect } from "react";
import AppointmentDataService from "../../services/AppointmentsService";
import { Link } from "react-router-dom";
const utils = require('../../utils');

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveAppointments();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveAppointments = () => {
        AppointmentDataService.getAll()
            .then(response => {
                setAppointments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveAppointments();
        setCurrentAppointment(null);
        setCurrentIndex(-1);
    };

    const setActiveAppointment = (appointment, index) => {
        setCurrentAppointment(appointment);
        setCurrentIndex(index);
    };

    const createAppointment = (data) => {
        AppointmentDataService.create(data)
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        AppointmentDataService.findByTitle(searchTitle)
            .then(response => {
                setAppointments(response.data);
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
                <h4>Appointments List</h4>

                <ul className="list-group">
                    {appointments &&
                    appointments.map((appointment, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveAppointment(appointment, index)}
                            key={index}
                        >
                            {index + 1} - {appointment.treatmentType.name} ||
                            ({appointment.patient.firstName} {appointment.patient.lastName}) ||
                            ({appointment.room} || {utils.dateYMD(appointment.time)})
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
                        {appointments && appointments.map((appointment, index) => (

                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.firstName}</td>
                                <td>{appointment.lastName}</td>
                                <td><button className="btn btn-info" onClick={() => setActiveAppointment(appointment, index)}>View</button></td>
                            </tr>

                        ))}
                        </tbody>
                    </table>
                </div>*/}

                <Link to={"/appointment/add"} className="badge badge-info">
                    Add Appointment
                </Link>
                {/*<button className="m-3 btn btn-sm btn-primary" onClick={createAppointment}>
                    Add Appointment
                </button>*/}
            </div>
            <div className="col-md-6">
                {currentAppointment ? (
                    <div>
                        <h4>Appointment</h4>
                        <div>
                            <label>
                                <strong>Treatment:</strong>
                            </label>{" "}
                            {currentAppointment.treatmentType.name}
                        </div>
                        <div>
                            <label>
                                <strong>Physician:</strong>
                            </label>{" "}
                            {currentAppointment.physician.firstName} {currentAppointment.physician.lastName}
                        </div>
                        <div>
                            <label>
                                <strong>Room:</strong>
                            </label>{" "}
                            {currentAppointment.room}
                        </div>
                        <div>
                            <label>
                                <strong>Time:</strong>
                            </label>{" "}
                            {currentAppointment.time}
                        </div>
                        <div>
                            <label>
                                <strong>Booked on:</strong>
                            </label>{" "}
                            {utils.dateYMD(currentAppointment.createdAt)}
                        </div>
                        <div>
                            <label>
                                <strong>Status :</strong>
                            </label>{" "}
                            {currentAppointment.status}
                        </div>

                        <Link
                            to={"/appointments/" + currentAppointment.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Appointment...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsList;