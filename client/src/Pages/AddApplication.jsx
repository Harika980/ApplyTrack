import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";


const AddApplication = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        company: "",
        role: "",
        location: "",
        applicationDate: "",
        jobUrl: "",
        status: "Applied",
        notes: ""
    });


    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");


        // Required field validation
        if (!formData.company.trim()) {
            setError("Company is required.");
            return;
        }

        if (!formData.role.trim()) {
            setError("Role is required.");
            return;
        }

        if (!formData.applicationDate) {
            setError("Application Date is required.");
            return;
        }

        if (!formData.status) {
            setError("Status is required.");
            return;
        }


        try {

            const token = localStorage.getItem("token");


            if (!token) {

                setError(
                    "Please login before adding an application."
                );

                return;
            }


            const applicationData = {
                ...formData
            };


            const response = await axios.post(
                "http://localhost:5000/api/applications",
                applicationData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setMessage(response.data.message);


            setFormData({
                company: "",
                role: "",
                location: "",
                applicationDate: "",
                jobUrl: "",
                status: "Applied",
                notes: ""
            });


        } catch (error) {

            console.error(error);


            setError(
                error.response?.data?.message ||
                "Failed to add application."
            );
        }
    };


    return (

        <div className="app">

            <aside className="sidebar">

                <div className="brand">

                    <div>

                        <h1>
                            Apply<span>Track</span>
                        </h1>

                        <p>
                            JOB SEARCH OS
                        </p>

                    </div>

                </div>


                <div className="menu-label">
                    WORKSPACE
                </div>


                <nav className="navigation">

                    <a
                        className="nav-item"
                        onClick={() => navigate("/")}
                    >
                        Overview
                    </a>


                    <a
                        className="nav-item"
                        onClick={() =>
                            navigate("/applications")
                        }
                    >
                        Applications
                    </a>


                    <a className="nav-item">
                        Analytics
                    </a>


                    <a className="nav-item">
                        Calendar
                    </a>

                </nav>


                <div className="sidebar-bottom">

                    <div className="upgrade-card">

                        <h3>
                            Stay on track
                        </h3>

                        <p>
                            Keep every application,
                            interview and opportunity organized.
                        </p>

                    </div>


                    <button
                        className="add-button"
                        onClick={() =>
                            navigate("/applications/add")
                        }
                    >
                        Add Application
                    </button>

                </div>

            </aside>


            <main className="main-content">

                <header className="topbar">

                    <div className="breadcrumb">

                        Workspace

                        <span>
                            /
                        </span>

                        Add Application

                    </div>


                    <div className="top-actions">

                        <div className="top-avatar">
                            H
                        </div>

                    </div>

                </header>


                <section className="form-page">

                    <div className="form-card application-card">

                        <h2>
                            Add application
                        </h2>


                        <p className="form-description">
                            Save a new job application to your tracker.
                        </p>


                        {message && (

                            <p className="success-message">
                                {message}
                            </p>

                        )}


                        {error && (

                            <p className="error-message">
                                {error}
                            </p>

                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="common-form"
                        >

                            <div className="form-group">

                                <label>
                                    Company
                                </label>

                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Example: IBM"
                                    required
                                    className="form-input"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Role
                                </label>

                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="Example: Software Engineer"
                                    required
                                    className="form-input"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Example: Hyderabad"
                                    className="form-input"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Application Date
                                </label>

                                <input
                                    type="date"
                                    name="applicationDate"
                                    value={formData.applicationDate}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Job URL
                                </label>

                                <input
                                    type="url"
                                    name="jobUrl"
                                    value={formData.jobUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/job"
                                    className="form-input"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                >

                                    <option value="Applied">
                                        Applied
                                    </option>

                                    <option value="Assessment">
                                        Assessment
                                    </option>

                                    <option value="Interview">
                                        Interview
                                    </option>

                                    <option value="Selected">
                                        Selected
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Add notes about this application..."
                                    rows="4"
                                    className="form-input form-textarea"
                                />

                            </div>


                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    Add Application
                                </button>


                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() =>
                                        navigate("/applications")
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </section>

            </main>

        </div>

    );

};


export default AddApplication;