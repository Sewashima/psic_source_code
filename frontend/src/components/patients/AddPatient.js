import React, { useState } from "react";
import PatientDataService from "../../services/PatientsService";

const AddPatient = () => {
    const initialPatientState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [patient, setPatient] = useState(initialPatientState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPatient({ ...patient, [name]: value });
    };

    const savePatient = () => {
        var data = {
            title: patient.title,
            description: patient.description
        };

        PatientDataService.create(data)
            .then(response => {
                setPatient({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPatient = () => {
        setPatient(initialPatientState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPatient}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={patient.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={patient.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={savePatient} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddPatient;