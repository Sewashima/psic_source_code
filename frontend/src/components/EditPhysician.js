import React, { useState, useEffect } from "react";
import PhysicianDataService from "../services/PhysiciansService";

const EditPhysician = props => {
    const initialPhysicianState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentPhysician, setCurrentPhysician] = useState(initialPhysicianState);
    const [message, setMessage] = useState("");

    const getPhysician = id => {
        console.log('getPhysician', {id})
        PhysicianDataService.get(id)
            .then(response => {
                setCurrentPhysician(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        console.log({ iii: props.match.params })
        getPhysician(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPhysician({ ...currentPhysician, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentPhysician.id,
            title: currentPhysician.title,
            description: currentPhysician.description,
            published: status
        };

        PhysicianDataService.update(currentPhysician.id, data)
            .then(response => {
                setCurrentPhysician({ ...currentPhysician, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updatePhysician = () => {
        PhysicianDataService.update(currentPhysician.id, currentPhysician)
            .then(response => {
                console.log(response.data);
                setMessage("The physician was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePhysician = () => {
        PhysicianDataService.remove(currentPhysician.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/physicians");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentPhysician ? (
                <div className="edit-form">
                    <h4>Physician</h4>
                    <form>
                        <div className="form-group">

                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentPhysician.title}
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
                                value={currentPhysician.firstName}
                                // value={`${currentPhysician.firstName} ${currentPhysician.lastName}`}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentPhysician.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentPhysician.published ? (
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

                    <button className="badge badge-danger mr-2" onClick={deletePhysician}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updatePhysician}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Physician...</p>
                </div>
            )}
        </div>
    );
};

export default EditPhysician;