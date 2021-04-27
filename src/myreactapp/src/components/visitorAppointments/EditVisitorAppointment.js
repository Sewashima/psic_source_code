import React, {useState, useEffect, Fragment} from "react";
import AppointmentDataService from "../../services/AppointmentsService";
import {Link} from "react-router-dom";
const utils = require('../../utils');

const EditVisitorAppointment = props => {
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [message, setMessage] = useState("");

    const getAppointment = id => {
        console.log('getAppointment', {id});
        AppointmentDataService.get(id)
            .then(response => {
                setCurrentAppointment(response.data);
                console.log({ appointmentFetch: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getAppointment(props.match.params.id);
    }, [props.match.params.id]);

    const cancelAppointment = () => {
        console.log('cancel appointment called');
        AppointmentDataService.cancel(currentAppointment.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/appointments");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentAppointment ? (
                <Fragment>
                    <div>
                        <h4>Appointment</h4>
                        <div>
                            <label>
                                <strong>Treatment:</strong>
                            </label>{" "}
                            {currentAppointment.treatmentType.name || null}
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
                    </div>

                    <div>
                        {
                            currentAppointment.status === 'open' ? (
                                <button className="badge badge-danger mr-2"
                                        onClick={() => {
                                            if (confirm('Are you sure to cancel?')) {
                                                console.log('confirm truthy')
                                                cancelAppointment();
                                            }
                                        }}>
                                    Cancel
                                </button>
                            ) : null
                        }

                        <Link to={"/appointments"} className="badge badge-primary mr-2">
                            Back to Appointments
                        </Link>
                    </div>

                </Fragment>
            ) : (
                <div>
                    <br />
                    <p>No appointment found</p>
                </div>
            )}
        </div>
    );
};

export default EditVisitorAppointment;