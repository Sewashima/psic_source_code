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

    const parseRoom = (roomTime, first = false) => {
        const part = first ? 0 : 1;
        if (roomTime) {
            const room = roomTime.split('(')[part];
            return room.substring(0, room.length - 1);
        }
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
            <div className="col-md-12">
                <h4>Treatment Appointments List</h4>

                <Link to={"/appointment/add"} className="badge badge-info">
                    Book an Appointment
                </Link>
                <br/> <br/>

                {/*<ul className="list-group">
                    {appointments &&
                    appointments.map((appointment, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveAppointment(appointment, index)}
                            key={index}
                        >
                            {index + 1} - ({appointment.patient.firstName} {appointment.patient.lastName})
                            - {appointment.treatmentType.name} --- {appointment.time}
                        </li>
                    ))}
                </ul>*/}

                {/*<div className="containerMMM">*/}
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Patient Name</th>
                            <th>Treatment Name</th>
                            <th>Physician Name</th>
                            {/*<th>Room</th>*/}
                            <th>Time</th>
                            <th>Room</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments && appointments.map((appointment, index) => (

                            <tr key={appointment.id} onClick={() => setActiveAppointment(appointment, index)}>
                                <td>{appointment.id}</td>
                                <td>{appointment.patient.firstName} {appointment.patient.lastName}</td>
                                <td>{appointment.treatmentType.name}</td>
                                <td>{appointment.physician.firstName} {appointment.physician.lastName}</td>
                                {/*<td>{appointment.room}</td>*/}
                                <td>{ parseRoom(appointment.time, true) }</td>
                                <td>{ parseRoom(appointment.time) }</td>
                                <td>{appointment.status}</td>
                                <td>{
                                    appointment.status === 'open' ? (
                                        <Link
                                            to={"/appointments/" + appointment.id}
                                            className="badge badge-warning"
                                        >
                                            Edit
                                        </Link>
                                    ): null
                                }</td>
                                {/*<td><button className="btn btn-info" onClick={() => setActiveAppointment(appointment, index)}>View</button></td>*/}
                            </tr>

                        ))}
                        </tbody>
                    </table>
                {/*</div>*/}

                <br/>
                {/*<button className="m-3 btn btn-sm btn-primary" onClick={createAppointment}>
                    Add Appointment
                </button>*/}
            </div>
            {/*<div className="col-md-4">
                {currentAppointment ? (
                    <div>
                        <h4>Appointment</h4>
                        <div>
                            <label>
                                <strong>Treatment Name:</strong>
                            </label>{" "}
                            {currentAppointment.treatmentType.name}
                        </div>
                        <div>
                            <label>
                                <strong>Physician Name:</strong>
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

                        {
                            currentAppointment.status === 'open' ? (
                                <Link
                                    to={"/appointments/" + currentAppointment.id}
                                    className="badge badge-warning"
                                >
                                    Edit
                                </Link>
                            ): null
                        }
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Appointment to view...</p>
                    </div>
                )}
            </div>*/}
        </div>
    );
};

export default AppointmentsList;