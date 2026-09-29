import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Dashboard = () => {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);


    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
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

                setApplications(
                    response.data.applications
                );

            } catch (error) {

                console.error(error);

            }

        };

        fetchApplications();

    }, []);


    const totalApplications =
        applications.length;


    const appliedCount =
        applications.filter(
            (application) =>
                application.status === "Applied"
        ).length;


    const assessmentCount =
        applications.filter(
            (application) =>
                application.status === "Assessment"
        ).length;


    const interviewCount =
        applications.filter(
            (application) =>
                application.status === "Interview"
        ).length;


    const selectedCount =
        applications.filter(
            (application) =>
                application.status === "Selected"
        ).length;


    const progress =
        totalApplications > 0
            ? Math.round(
                (
                    (
                        interviewCount +
                        selectedCount
                    ) /
                    totalApplications
                ) * 100
            )
            : 0;


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

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

                    <a className="nav-item active">
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
                            navigate("/applications/add")
                        }
                    >
                        Add Application
                    </button>


                    <button
                        onClick={handleLogout}
                        style={{
                            width: "100%",
                            marginTop: "10px",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>


                    <div className="sidebar-user">

                        <div className="user-avatar">
                            H
                        </div>


                        <div>

                            <strong>
                                Harika
                            </strong>

                            <small>
                                Job Seeker
                            </small>

                        </div>

                    </div>

                </div>

            </aside>


            <main className="main-content">

                <header className="topbar">

                    <div className="breadcrumb">

                        Workspace

                        <span>
                            /
                        </span>

                        Overview

                    </div>


                    <div className="top-actions">

                        <div className="top-avatar">
                            H
                        </div>

                    </div>

                </header>


                <section className="hero">

                    <div className="hero-content">

                        <span className="eyebrow">
                            YOUR JOB SEARCH DASHBOARD
                        </span>


                        <h2>

                            Your next opportunity

                            <br />

                            starts <span>here.</span>

                        </h2>


                        <p>
                            Keep your applications organized,
                            track your progress and never miss
                            an opportunity.
                        </p>

                    </div>


                    <div className="hero-orbit">

                        <div className="orbit-ring">
                        </div>

                        <div className="orbit-center">
                        </div>

                        <div className="orbit-dot dot-one">
                        </div>

                        <div className="orbit-dot dot-two">
                        </div>

                        <div className="orbit-dot dot-three">
                        </div>

                    </div>

                </section>


                <section className="overview-grid">

                    <div className="main-stat-card">

                        <div className="card-top">

                            <span className="card-label">
                                TOTAL APPLICATIONS
                            </span>

                        </div>


                        <div className="big-number">
                            {totalApplications}
                        </div>


                        <div className="stat-footer">

                            <span className="positive">
                                {totalApplications}
                            </span>

                            <span>
                                total tracked
                            </span>

                        </div>

                    </div>


                    <div className="progress-card">

                        <div className="card-top">

                            <span className="card-label">
                                APPLICATION PROGRESS
                            </span>


                            <span className="progress-percent">
                                {progress}%
                            </span>

                        </div>


                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${progress}%`
                                }}
                            >
                            </div>

                        </div>


                        <div className="progress-info">

                            <span>
                                {interviewCount + selectedCount} of {
                                    totalApplications
                                } advanced
                            </span>


                            <span>
                                Keep going
                            </span>

                        </div>

                    </div>

                </section>


                <section className="section-block">

                    <div className="section-heading">

                        <div>

                            <span className="section-eyebrow">
                                APPLICATION FLOW
                            </span>


                            <h2>
                                Your pipeline
                            </h2>

                        </div>


                        <button
                            className="view-button"
                            onClick={() =>
                                navigate("/applications")
                            }
                        >
                            View applications
                        </button>

                    </div>


                    <div className="pipeline">

                        <div className="pipeline-stage">

                            <div className="stage-number blue">
                                {appliedCount}
                            </div>


                            <div>

                                <h3>
                                    Applied
                                </h3>

                                <p>
                                    Waiting for response
                                </p>

                            </div>

                        </div>


                        <div className="pipeline-line">
                        </div>


                        <div className="pipeline-stage">

                            <div className="stage-number yellow">
                                {assessmentCount}
                            </div>


                            <div>

                                <h3>
                                    Assessment
                                </h3>

                                <p>
                                    Tests and challenges
                                </p>

                            </div>

                        </div>


                        <div className="pipeline-line">
                        </div>


                        <div className="pipeline-stage">

                            <div className="stage-number purple">
                                {interviewCount}
                            </div>


                            <div>

                                <h3>
                                    Interview
                                </h3>

                                <p>
                                    Meet the team
                                </p>

                            </div>

                        </div>


                        <div className="pipeline-line">
                        </div>


                        <div className="pipeline-stage">

                            <div className="stage-number green">
                                {selectedCount}
                            </div>


                            <div>

                                <h3>
                                    Selected
                                </h3>

                                <p>
                                    Offer received
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="activity-section">

                    <div className="section-heading">

                        <div>

                            <span className="section-eyebrow">
                                RECENT ACTIVITY
                            </span>


                            <h2>
                                Latest applications
                            </h2>

                        </div>


                        <button
                            className="view-button"
                            onClick={() =>
                                navigate("/applications")
                            }
                        >
                            See all
                        </button>

                    </div>


                    <div className="activity-list">

                        {applications
                            .slice(0, 3)
                            .map((application) => (

                                <div
                                    className="activity-item"
                                    key={application._id}
                                >

                                    <div className="company-circle">

                                        {application.company
                                            .charAt(0)
                                            .toUpperCase()}

                                    </div>


                                    <div className="activity-info">

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


                                    <div className="activity-status">

                                        {application.status}

                                    </div>


                                    <div className="activity-date">

                                        {application.applicationDate
                                            ? new Date(
                                                application.applicationDate
                                            ).toLocaleDateString()
                                            : "Date not specified"}

                                    </div>

                                </div>

                            ))}


                        {applications.length === 0 && (

                            <p>
                                No applications found.
                            </p>

                        )}

                    </div>

                </section>

            </main>

        </div>

    );

};

export default Dashboard;