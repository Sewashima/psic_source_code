import React, { useState } from "react";
import PhysicianDataService from "../services/PhysiciansService";

const AddPhysician = () => {
    const initialPhysicianState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [physician, setPhysician] = useState(initialPhysicianState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPhysician({ ...physician, [name]: value });
    };

    const savePhysician = () => {
        var data = {
            title: physician.title,
            description: physician.description
        };

        PhysicianDataService.create(data)
            .then(response => {
                setPhysician({
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

    const newPhysician = () => {
        setPhysician(initialPhysicianState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPhysician}>
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
                            value={physician.title}
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
                            value={physician.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={savePhysician} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddPhysician;