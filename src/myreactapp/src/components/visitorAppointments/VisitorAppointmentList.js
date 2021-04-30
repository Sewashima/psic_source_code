import React, { useState, useEffect } from "react";
import VisitorAppointmentDataService from "../../services/VisitorAppointmentsService";
import { Link } from "react-router-dom";
const utils = require('../../utils');

const VisitorAppointmentsList = () => {
    const [appointments, setVisitorAppointments] = useState([]);
    const [currentVisitorAppointment, setCurrentVisitorAppointment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveVisitorAppointments();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveVisitorAppointments = () => {
        VisitorAppointmentDataService.getAll()
            .then(response => {
                setVisitorAppointments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveVisitorAppointments();
        setCurrentVisitorAppointment(null);
        setCurrentIndex(-1);
    };

    const setActiveVisitorAppointment = (appointment, index) => {
        setCurrentVisitorAppointment(appointment);
        setCurrentIndex(index);
    };

    const createVisitorAppointment = (data) => {
        VisitorAppointmentDataService.create(data)
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        VisitorAppointmentDataService.findByTitle(searchTitle)
            .then(response => {
                setVisitorAppointments(response.data);
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
                <h4>VisitorAppointments List</h4>

                <Link to={"/visitor-appointment/add"} className="badge badge-info">
                    Book a Visitor Appointment
                </Link>
                <br/> <br/>

                {/*<div className="containerMMM">*/}
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Visitor's Name</th>
                            <th>Treatment Name</th>
                            <th>Physician Name</th>
                            <th>Time</th>
                            <th>Room</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments && appointments.map((appointment, index) => (

                            <tr key={appointment.id} onClick={() => setActiveVisitorAppointment(appointment, index)}>
                                <td>{appointment.id}</td>
                                <td>{appointment.firstName} {/*{appointment.lastName}*/}</td>
                                <td>{appointment.treatmentType.name}</td>
                                <td>{appointment.physician.firstName} {appointment.physician.lastName}</td>
                                {/*<td>{appointment.room}</td>*/}
                                <td>{ parseRoom(appointment.time, true) }</td>
                                <td>{ parseRoom(appointment.time) }</td>
                                <td>{appointment.status}</td>
                                <td>{
                                    appointment.status === 'open' ? (
                                        <Link
                                            to={"/visitor-appointments/" + appointment.id}
                                            className="badge badge-warning"
                                        >
                                            Edit
                                        </Link>
                                    ): null
                                }</td>
                                {/*<td><button className="btn btn-info" onClick={() => setActiveVisitorAppointment(appointment, index)}>View</button></td>*/}
                            </tr>

                        ))}
                        </tbody>
                    </table>
                {/*</div>*/}

                <br/>
                {/*<button className="m-3 btn btn-sm btn-primary" onClick={createVisitorAppointment}>
                    Add VisitorAppointment
                </button>*/}
            </div>
            {/*<div className="col-md-4">
                {currentVisitorAppointment ? (
                    <div>
                        <h4>VisitorAppointment</h4>
                        <div>
                            <label>
                                <strong>Treatment Name:</strong>
                            </label>{" "}
                            {currentVisitorAppointment.treatmentType.name}
                        </div>
                        <div>
                            <label>
                                <strong>Physician Name:</strong>
                            </label>{" "}
                            {currentVisitorAppointment.physician.firstName} {currentVisitorAppointment.physician.lastName}
                        </div>
                        <div>
                            <label>
                                <strong>Room:</strong>
                            </label>{" "}
                            {currentVisitorAppointment.room}
                        </div>
                        <div>
                            <label>
                                <strong>Time:</strong>
                            </label>{" "}
                            {currentVisitorAppointment.time}
                        </div>
                        <div>
                            <label>
                                <strong>Booked on:</strong>
                            </label>{" "}
                            {utils.dateYMD(currentVisitorAppointment.createdAt)}
                        </div>
                        <div>
                            <label>
                                <strong>Status :</strong>
                            </label>{" "}
                            {currentVisitorAppointment.status}
                        </div>

                        {
                            currentVisitorAppointment.status === 'open' ? (
                                <Link
                                    to={"/appointments/" + currentVisitorAppointment.id}
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
                        <p>Please click on a VisitorAppointment to view...</p>
                    </div>
                )}
            </div>*/}
        </div>
    );
};

export default VisitorAppointmentsList;