import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

const EditApplication = () => {

    const navigate = useNavigate();
    const { id } = useParams();

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchApplication = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(
                    "https://applytrack-fkni.onrender.com//api/applications",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const application =
                    response.data.applications.find(
                        (item) => item._id === id
                    );

                if (!application) {
                    setError("Application not found.");
                    return;
                }

                setFormData({
                    company: application.company || "",
                    role: application.role || "",
                    location: application.location || "",
                    applicationDate: application.applicationDate
                        ? application.applicationDate.split("T")[0]
                        : "",
                    jobUrl: application.jobUrl || "",
                    status: application.status || "Applied",
                    notes: application.notes || ""
                });

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load application."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchApplication();

    }, [id, navigate]);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.put(
                `https://applytrack-fkni.onrender.com//api/applications/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/applications");
            }, 700);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update application."
            );

        }
    };


    if (loading) {
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

                </aside>

                <main className="main-content">

                    <section className="form-page">

                        <div className="form-card">

                            <h2>
                                Loading application...
                            </h2>

                        </div>

                    </section>

                </main>

            </div>
        );
    }


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

                        Edit Application

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
                            Edit application
                        </h2>

                        <p className="form-description">
                            Update the details of this job application.
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
                                    rows="4"
                                    className="form-input form-textarea"
                                />

                            </div>


                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    Save Changes
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

export default EditApplication;