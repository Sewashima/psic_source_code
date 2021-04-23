import React, {Fragment, useEffect, useState} from "react";
import { Dropdown } from 'semantic-ui-react'

import AppointmentDataService from "../../services/AppointmentsService";
import PatientDataService from "../../services/PatientsService";
import PhysicianDataService from "../../services/PhysiciansService";
import TreatmentTypeDataService from "../../services/TreatmentTypeService";

const AddAppointment = () => {
    const initialAppointmentState = {
        id: null,
        room: "",
        time: "",
        note: "",
        patientId: "",
        physicianId: "",
        reason: "",
        treatmentTypeId: ""
    };

    const countryOptions = [
        { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
        { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
        { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
        { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
        { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
        { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
        { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
        { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    ];
    const [countries, setountries] = useState(countryOptions);
    const [appointment, setAppointment] = useState(initialAppointmentState);
    const [expertise, setExpertise] = useState([]);
    const [consultationTime, setConsultationTime] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [patients, setPatients] = useState([]);
    const [physicians, setPhysicians] = useState([]);
    const [treatmentTypes, setTreatmentTypes] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        retrieveExpertise();
        retrievePatients();
        retrieveTreatmentTypes();
    }, []);

    const retrieveExpertise = () => {
        PhysicianDataService.getExpertise()
            .then(response => {
                setExpertise(response.data);
                console.log({ expertisesResp: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrievePatients = () => {
        PatientDataService.getAll()
            .then(response => {
                setPatients(response.data);
                console.log({ patientsResp: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrievePhysicianByExpertise = (name) => {
        console.log('retrievePhysicianByExpertise called: ', { name })
        PhysicianDataService.getPhysicianByExpertise(name)
            .then(response => {
                setPhysicians(response.data);
                console.log({ physiciansExpertiseResp: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrievePhysicianConsultationTime = (physicianId) => {
        console.log('retrievePhysicianConsultationTime called: ', { physicianId })
        PhysicianDataService.getPhysicianConsultationTime(physicianId)
            .then(response => {
                setConsultationTime(response.data);
                console.log({ physiciansConsultationTimeResp: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveTreatmentTypes = () => {
        TreatmentTypeDataService.getAll()
            .then(response => {
                setTreatmentTypes(response.data);
                console.log({ treatmentTypesResp: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleReasonChange = event => {
        const { name, value } = event.target;
        setAppointment({ ...appointment, [name]: value });
        setPhysicians([]);
        setConsultationTime([]);
        retrievePhysicianByExpertise(value);
    };

    const handlePhysicianChange = event => {
        const { name, value } = event.target;
        setAppointment({ ...appointment, [name]: value });

        let roomArr = [];
        let currentPhysician = physicians.find((physician) => physician.id == value);
        if (currentPhysician) {
            currentPhysician.rooms ? currentPhysician.rooms.map((r) => roomArr.push(r.room)) : [];
            console.log({ roomArr })
            setRooms(roomArr);
        }
        retrievePhysicianConsultationTime(value);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAppointment({ ...appointment, [name]: value });
    };

    const saveAppointment = () => {
        const data = {
            status: 'open',
            room: appointment.room,
            time: appointment.time,
            note: appointment.note,
            reason: appointment.reason,
            physicianId: appointment.physicianId,
            patientId: appointment.patientId,
            treatmentTypeId: appointment.treatmentTypeId,
        };

        AppointmentDataService.create(data)
            .then(response => {
                setAppointment({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published
                });
                setSubmitted(true);
                setError(false);
                setErrorMessage(false);
                console.log(response.data);
            })
            .catch(e => {
                console.log({ e: e.response });
                setError(true);
                setErrorMessage(e.response.data.errors);
            });
    };

    const newAppointment = () => {
        setAppointment(initialAppointmentState);
        setSubmitted(false);
        setError(false);
    };

    return (
        <Fragment>
            <h5>Add Appointment</h5>

            <div className="submit-form">
                {error ? (
                    <div className="alert alert-danger" role="alert">
                        { errorMessage }
                    </div>
                ) : null }

                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newAppointment}>
                            Book another Appointment
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">

                            <label htmlFor="patient">Countries</label>

                            <Dropdown
                            placeholder='Select Country'
                            fluid
                            search
                            selection
                            options={countryOptions}
                        />
                        </div>

                        <div className="form-group">
                            <label htmlFor="patient">Patient</label>
                            <select className="form-control"
                                onChange={handleInputChange}
                                name="patientId"
                                value={appointment.patientId}>
                                <option value=""> Select... </option>
                                {
                                    patients.map((patient, index) => (
                                        <option key={index} value={patient.id}>
                                            {patient.firstName} {patient.lastName}
                                        </option> )
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reason">Expertise</label>
                            <select className="form-control"
                                    onChange={handleReasonChange}
                                    name="reason"
                                    value={appointment.reason}>
                                <option value=""> Select... </option>
                                {
                                    expertise.map((reason, index) => (
                                        <option key={index} value={reason}>{reason}</option> )
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="physician">Physician</label>
                            <select className="form-control"
                                    onChange={handlePhysicianChange}
                                    name="physicianId"
                                    value={appointment.physicianId}>
                                <option value=""> Select... </option>
                                {
                                    physicians.map((physician, index) => (
                                        <option key={index} value={physician.id}>{physician.firstName} {physician.lastName}</option> )
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="treatmentTypeId">Treatment Type</label>
                            <select className="form-control"
                                    onChange={handleInputChange}
                                    name="treatmentTypeId"
                                    value={appointment.treatmentTypeId}>
                                <option value=""> Select... </option>
                                {
                                    treatmentTypes.map((treatmentType, index) => (
                                        <option key={index} value={treatmentType.id}>{treatmentType.name}</option> )
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">Consultation Time</label>
                            <select className="form-control"
                                    onChange={handleInputChange}
                                    name="time"
                                    value={appointment.time}>
                                <option value=""> Select... </option>
                                {
                                    consultationTime.map((time, index) => (
                                        <option key={index} value={time.time}>{time.time}</option> )
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="room">Room</label>
                            <select className="form-control"
                                    onChange={handleInputChange}
                                    name="room"
                                    value={appointment.room}>
                                <option value=""> Select... </option>
                                {
                                    rooms.map((room, index) => (
                                        <option key={index} value={room.name}>{room.name}</option> )
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Note</label>
                            <input
                                type="text"
                                className="form-control"
                                id="note"
                                value={appointment.note}
                                onChange={handleInputChange}
                                name="note"
                            />
                        </div>

                        <button onClick={saveAppointment} className="btn btn-success">
                            Submit
                        </button>

                        <button onClick={newAppointment} className="btn btn-danger float-right">
                            Clear
                        </button>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default AddAppointment;