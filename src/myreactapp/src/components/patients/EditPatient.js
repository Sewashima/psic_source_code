import React, { useState, useEffect } from "react";
import PatientDataService from "../../services/PatientsService";

const EditPatient = props => {
    const initialPatientState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentPatient, setCurrentPatient] = useState(initialPatientState);
    const [message, setMessage] = useState("");

    const getPatient = id => {
        console.log('getPatient', {id})
        PatientDataService.get(id)
            .then(response => {
                setCurrentPatient(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        console.log({ iii: props.match.params })
        getPatient(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPatient({ ...currentPatient, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentPatient.id,
            title: currentPatient.title,
            description: currentPatient.description,
            published: status
        };

        PatientDataService.update(currentPatient.id, data)
            .then(response => {
                setCurrentPatient({ ...currentPatient, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updatePatient = () => {
        PatientDataService.update(currentPatient.id, currentPatient)
            .then(response => {
                console.log(response.data);
                setMessage("The patient was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePatient = () => {
        PatientDataService.remove(currentPatient.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/patients");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentPatient ? (
                <div className="edit-form">
                    <h4>Patient</h4>
                    <form>
                        <div className="form-group">

                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentPatient.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentPatient.firstName}
                                // value={`${currentPatient.firstName} ${currentPatient.lastName}`}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentPatient.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentPatient.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deletePatient}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updatePatient}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Patient...</p>
                </div>
            )}
        </div>
    );
};

export default EditPatient;