import React, { useState, useEffect } from "react";
import AppointmentTreatmentDataService from "../../services/AppointmentsService";
import AppointmentVisitorDataService from "../../services/VisitorAppointmentsService";
import { Link } from "react-router-dom";

const ReportList = () => {
    const [treatmentAppointments, setTreatmentAppointments] = useState([]);
    const [visitorAppointments, setVisitorAppointments] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveVisitorAppointments();
        retrieveTreatmentAppointments();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveTreatmentAppointments = () => {
        AppointmentTreatmentDataService.getAll()
            .then(response => {
                setTreatmentAppointments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveVisitorAppointments = () => {
        AppointmentVisitorDataService.getAll()
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

    const refreshList = () => {
        retrieveVisitorAppointments();
        retrieveTreatmentAppointments();
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
                </div>
            </div>
            <div className="col-md-12">
                <h4>Treatment Appointments List</h4>

                {/*<div className="containerMMM">*/}
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Patient Name</th>
                            <th>Treatment Name</th>
                            <th>Physician Name</th>
                            <th>Time</th>
                            <th>Room</th>
                            <th>Status</th>
                            {/*<th></th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {treatmentAppointments && treatmentAppointments.map((appointment, index) => (

                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.patient.firstName} {appointment.patient.lastName}</td>
                                <td>{appointment.treatmentType.name}</td>
                                <td>{appointment.physician.firstName} {appointment.physician.lastName}</td>
                                {/*<td>{appointment.room}</td>*/}
                                <td>{ parseRoom(appointment.time, true) }</td>
                                <td>{ parseRoom(appointment.time) }</td>
                                <td>{appointment.status}</td>
                                {/*<td>{
                                    appointment.status === 'open' ? (
                                        <Link
                                            to={"/appointments/" + appointment.id}
                                            className="badge badge-warning"
                                        >
                                            Edit
                                        </Link>
                                    ): null
                                }</td>*/}
                                {/*<td><button className="btn btn-info" onClick={() => setActiveAppointment(appointment, index)}>View</button></td>*/}
                            </tr>

                        ))}
                        </tbody>
                    </table>
                {/*</div>*/}

                <br/>
                {/*<Link to={"/appointments"} className="badge badge-info">
                    Back to treatment appointment
                </Link>*/}
                {/*<button className="m-3 btn btn-sm btn-primary" onClick={createAppointment}>
                    Add Appointment
                </button>*/}
            </div>


            <div className="col-md-12">
                <h4>Visitor Appointments List</h4>

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
                        {/*<th></th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {visitorAppointments && visitorAppointments.map((appointment, index) => (

                        <tr key={appointment.id} onClick={() => setActiveAppointment(appointment, index)}>
                            <td>{appointment.id}</td>
                            <td>{appointment.firstName} {appointment.lastName}</td>
                            <td>{appointment.treatmentType.name}</td>
                            <td>{appointment.physician.firstName} {appointment.physician.lastName}</td>
                            <td>{ parseRoom(appointment.time, true) }</td>
                            <td>{ parseRoom(appointment.time) }</td>
                            <td>{appointment.status}</td>
                            {/*<td>{
                                appointment.status === 'open' ? (
                                    <Link
                                        to={"/appointments/" + appointment.id}
                                        className="badge badge-warning"
                                    >
                                        Edit
                                    </Link>
                                ): null
                            }</td>*/}
                            {/*<td><button className="btn btn-info" onClick={() => setActiveAppointment(appointment, index)}>View</button></td>*/}
                        </tr>

                    ))}
                    </tbody>
                </table>
                {/*</div>*/}

                <br/>
                {/*<Link to={"/appointments"} className="badge badge-info">
                    Back to treatment appointment
                </Link>*/}
                {/*<button className="m-3 btn btn-sm btn-primary" onClick={createAppointment}>
                    Add Appointment
                </button>*/}
            </div>

        </div>
    );
};

export default ReportList;