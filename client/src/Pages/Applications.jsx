import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Applications = () => {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    const fetchApplications = async (
        searchValue = "",
        statusValue = "",
        locationValue = ""
    ) => {

        try {

            setLoading(true);

            setError("");

            const token = localStorage.getItem("token");

            if (!token) {

                navigate("/login");

                return;

            }


            const response = await axios.get(
                "https://applytrack-1-p2en.onrender.com//api/applications",
                {
                    params: {
                        search: searchValue,
                        status: statusValue,
                        location: locationValue
                    },

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setApplications(
                response.data.applications
            );


        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");

                navigate("/login");

                return;

            }


            setError(
                error.response?.data?.message ||
                "Failed to load applications."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchApplications();

    }, []);


    const handleSearch = (event) => {

        const value = event.target.value;

        setSearch(value);

        fetchApplications(
            value,
            status,
            location
        );

    };


    const handleStatusChange = (event) => {

        const value = event.target.value;

        setStatus(value);

        fetchApplications(
            search,
            value,
            location
        );

    };


    const handleLocationChange = (event) => {

        const value = event.target.value;

        setLocation(value);

        fetchApplications(
            search,
            status,
            value
        );

    };


    const handleEdit = (id) => {

        navigate(
            `/applications/${id}/edit`
        );

    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            const token =
                localStorage.getItem("token");


            await axios.delete(
                `https://applytrack-1-p2en.onrender.com//api/applications/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            fetchApplications(
                search,
                status,
                location
            );


        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");

                navigate("/login");

                return;

            }


            setError(
                error.response?.data?.message ||
                "Failed to delete application."
            );

        }

    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    return (

        <div className="app">


            {/* SIDEBAR */}

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
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Overview
                    </a>


                    <a
                        className="nav-item active"
                    >
                        Applications
                    </a>


                    <a
                        className="nav-item"
                        onClick={() =>
                            navigate("/analytics")
                        }
                    >
                        Analytics
                    </a>


                    <a
                        className="nav-item"
                        onClick={() =>
                            navigate("/calendar")
                        }
                    >
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
                            navigate(
                                "/applications/add"
                            )
                        }
                    >
                        Add Application
                    </button>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>


                </div>


            </aside>


            {/* MAIN CONTENT */}

            <main className="main-content">


                <header className="topbar">


                    <div className="breadcrumb">

                        Workspace

                        <span>
                            /
                        </span>

                        Applications

                    </div>


                    <div className="top-actions">

                        <div className="top-avatar">
                            H
                        </div>

                    </div>


                </header>


                <section className="applications-page">


                    {/* PAGE HEADER */}

                    <div
                        className="applications-header"
                        style={{
                            position: "relative",
                            display: "block",
                            marginBottom: "28px"
                        }}
                    >


                        <div
                            className="applications-title"
                            style={{
                                width: "100%",
                                maxWidth: "none"
                            }}
                        >


                            <div
                                className="applications-heading"
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "55px",
                                    marginBottom: "40px"
                                }}
                            >


                                <p
                                    className="page-label"
                                    style={{
                                        margin: "0 0 14px",
                                        color: "#6c4cff",
                                        fontFamily:
                                            "DM Sans, sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        letterSpacing: "3px"
                                    }}
                                >
                                    APPLICATION MANAGEMENT
                                </p>


                                <h1
                                    style={{
                                        margin: "0",
                                        fontFamily:
                                            "DM Sans, sans-serif",
                                        fontSize: "44px",
                                        fontWeight: "700",
                                        lineHeight: "1.15",
                                        color: "#111827"
                                    }}
                                >
                                    Your applications
                                </h1>


                                <p
                                    style={{
                                        margin: "14px 0 0",
                                        fontFamily:
                                            "DM Sans, sans-serif",
                                        fontSize: "17px",
                                        fontWeight: "400",
                                        color: "#64748b"
                                    }}
                                >
                                    Track and manage all your job applications.
                                </p>


                            </div>


                        </div>


                        <button
                            className="applications-add-button"
                            style={{
                                position: "absolute",
                                right: "0",
                                bottom: "40px"
                            }}
                            onClick={() =>
                                navigate(
                                    "/applications/add"
                                )
                            }
                        >
                            Add Application
                        </button>


                    </div>


                    {/* FILTERS */}

                    <div className="application-filters">


                        <input
                            type="text"
                            placeholder="Search by company or role"
                            value={search}
                            onChange={handleSearch}
                        />


                        <select
                            value={status}
                            onChange={handleStatusChange}
                        >

                            <option value="">
                                All Statuses
                            </option>

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


                        <input
                            type="text"
                            placeholder="Filter by location"
                            value={location}
                            onChange={handleLocationChange}
                        />


                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="applications-error">
                            {error}
                        </div>

                    )}


                    {/* APPLICATION CARD */}

                    <div className="applications-card">


                        <div className="applications-card-header">


                            <h2>
                                All applications
                            </h2>


                            <div className="application-count">

                                {applications.length}

                                {" "}

                                {applications.length === 1
                                    ? "application"
                                    : "applications"}

                            </div>


                        </div>


                        {/* LOADING */}

                        {loading && (

                            <div className="empty-applications">

                                <p>
                                    Loading applications...
                                </p>

                            </div>

                        )}


                        {/* EMPTY */}

                        {!loading &&
                            applications.length === 0 && (

                                <div className="empty-applications">

                                    <h3>
                                        No applications found
                                    </h3>

                                    <p>
                                        Add your first job
                                        application to start tracking.
                                    </p>

                                </div>

                            )}


                        {/* APPLICATION LIST */}

                        {!loading &&
                            applications.length > 0 && (

                                <div>


                                    {applications.map(
                                        (application) => (

                                            <div
                                                className="application-row"
                                                key={
                                                    application._id
                                                }
                                            >


                                                {/* COMPANY */}

                                                <div
                                                    className="application-company"
                                                >

                                                    {application.company
                                                        .charAt(0)
                                                        .toUpperCase()}

                                                </div>


                                                {/* ROLE */}

                                                <div
                                                    className="application-info"
                                                >

                                                    <h3>
                                                        {application.role}
                                                    </h3>

                                                    <p>

                                                        {application.company}

                                                        {" - "}

                                                        {application.location ||
                                                            "Location not specified"}

                                                    </p>

                                                </div>


                                                {/* STATUS */}

                                                <div>

                                                    <span
                                                        className="application-status"
                                                    >
                                                        {application.status}
                                                    </span>

                                                </div>


                                                {/* DATE */}

                                                <div
                                                    className="application-date"
                                                >

                                                    {application.applicationDate
                                                        ? new Date(
                                                            application.applicationDate
                                                        ).toLocaleDateString()
                                                        : "Date not specified"}

                                                </div>


                                                {/* ACTIONS */}

                                                <div
                                                    className="application-actions"
                                                >

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                application._id
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                application._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>


                                            </div>

                                        )
                                    )}


                                </div>

                            )}


                    </div>


                </section>


            </main>


        </div>

    );

};


export default Applications;