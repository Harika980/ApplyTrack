import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";


const Calendar = () => {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    const [currentDate, setCurrentDate] = useState(
        new Date()
    );

    const [selectedDate, setSelectedDate] = useState(
        new Date()
    );

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    navigate("/login");

                    return;
                }


                const response = await axios.get(
                    "https://applytrack-fkni.onrender.com//api/applications",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
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
                    "Failed to load calendar."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchApplications();

    }, [navigate]);


    const year =
        currentDate.getFullYear();


    const month =
        currentDate.getMonth();


    const monthName =
        currentDate.toLocaleString(
            "default",
            {
                month: "long"
            }
        );


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const previousMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month - 1,
                1
            )
        );

    };


    const nextMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month + 1,
                1
            )
        );

    };


    const goToToday = () => {

        const today = new Date();

        setCurrentDate(today);

        setSelectedDate(today);

    };


    const getApplicationsForDate = (day) => {

        return applications.filter(
            (application) => {

                const dateValue =
                    application.applicationDate;

                if (!dateValue) {

                    return false;
                }


                let applicationDate;


                /*
                    Handle YYYY-MM-DD separately
                    so timezone conversion does not
                    move the application to another day.
                */

                if (
                    typeof dateValue === "string" &&
                    /^\d{4}-\d{2}-\d{2}$/.test(
                        dateValue
                    )
                ) {

                    const [
                        dateYear,
                        dateMonth,
                        dateDay
                    ] =
                        dateValue
                            .split("-")
                            .map(Number);


                    applicationDate =
                        new Date(
                            dateYear,
                            dateMonth - 1,
                            dateDay
                        );

                } else {

                    applicationDate =
                        new Date(dateValue);

                }


                if (
                    Number.isNaN(
                        applicationDate.getTime()
                    )
                ) {

                    return false;

                }


                return (
                    applicationDate.getFullYear() ===
                        year &&

                    applicationDate.getMonth() ===
                        month &&

                    applicationDate.getDate() ===
                        day
                );

            }
        );

    };


    /*
        Get applications for the currently
        selected calendar date.
    */

    const getSelectedDateApplications = () => {

        /*
            Check applications directly against
            selectedDate instead of relying only
            on the currently displayed month.
        */

        return applications.filter(
            (application) => {

                const dateValue =
                    application.applicationDate;

                if (!dateValue) {

                    return false;
                }


                let applicationDate;


                if (
                    typeof dateValue === "string" &&
                    /^\d{4}-\d{2}-\d{2}$/.test(
                        dateValue
                    )
                ) {

                    const [
                        dateYear,
                        dateMonth,
                        dateDay
                    ] =
                        dateValue
                            .split("-")
                            .map(Number);


                    applicationDate =
                        new Date(
                            dateYear,
                            dateMonth - 1,
                            dateDay
                        );

                } else {

                    applicationDate =
                        new Date(dateValue);

                }


                if (
                    Number.isNaN(
                        applicationDate.getTime()
                    )
                ) {

                    return false;

                }


                return (
                    applicationDate.getFullYear() ===
                        selectedDate.getFullYear() &&

                    applicationDate.getMonth() ===
                        selectedDate.getMonth() &&

                    applicationDate.getDate() ===
                        selectedDate.getDate()
                );

            }
        );

    };


    const handleApplicationClick = (id) => {

        navigate(
            `/applications/${id}/edit`
        );

    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    const calendarDays = [];


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        calendarDays.push(

            <div
                key={`empty-${i}`}
                className="calendar-empty"
            />

        );

    }


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayApplications =
            getApplicationsForDate(day);


        const dateClass =
            dayApplications.length > 0
                ? "has-application"
                : "no-application";


        const isSelected =
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day;


        const selectedClass =
            isSelected
                ? " selected-date"
                : "";


        calendarDays.push(

            <div
                key={day}

                className={
                    `calendar-day ${dateClass}${selectedClass}`
                }

                onClick={() =>
                    setSelectedDate(
                        new Date(
                            year,
                            month,
                            day
                        )
                    )
                }
            >

                <div className="calendar-day-number">
                    {day}
                </div>


                {dayApplications.map(
                    (application) => (

                        <div
                            key={
                                application._id
                            }

                            className="calendar-application"

                            onClick={(event) => {

                                event.stopPropagation();

                                handleApplicationClick(
                                    application._id
                                );

                            }}
                        >

                            <div className="calendar-company">
                                {application.company}
                            </div>


                            <div className="calendar-role">
                                {application.role}
                            </div>


                            <div className="calendar-status">
                                {application.status}
                            </div>

                        </div>

                    )
                )}

            </div>

        );

    }


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
                        className="nav-item"

                        onClick={() =>
                            navigate(
                                "/applications"
                            )
                        }
                    >
                        Applications
                    </a>


                    <a
                        className="nav-item"

                        onClick={() =>
                            navigate(
                                "/analytics"
                            )
                        }
                    >
                        Analytics
                    </a>


                    <a className="nav-item active">
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

                        Calendar

                    </div>


                    <div className="top-actions">

                        <div className="top-avatar">
                            H
                        </div>

                    </div>

                </header>


                <section
                    className="calendar-page"
                >


                    {/* HEADING */}

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "55px",
                            marginBottom: "40px"
                        }}
                    >

                        <p
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
                            APPLICATION TRACKING
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
                            Calendar
                        </h1>


                        <p
                            style={{
                                margin: "14px 0 0",
                                fontFamily:
                                    "DM Sans, sans-serif",
                                fontSize: "17px",
                                color: "#64748b"
                            }}
                        >
                            Track your application dates.
                        </p>

                    </div>


                    {error && (

                        <div className="calendar-error">
                            {error}
                        </div>

                    )}


                    {loading ? (

                        <div className="calendar-loading">
                            Loading calendar...
                        </div>

                    ) : (

                        <>

                            {/* MONTH CONTROLS */}

                            <div
                                className="calendar-controls"

                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr auto 1fr",
                                    alignItems:
                                        "center",
                                    gap: "20px",
                                    marginBottom:
                                        "28px"
                                }}
                            >

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "flex-start"
                                    }}
                                >

                                    <button
                                        className="calendar-control-button"

                                        onClick={
                                            previousMonth
                                        }
                                    >
                                        Previous
                                    </button>

                                </div>


                                <h2
                                    className="calendar-month-title"

                                    style={{
                                        margin: "0",
                                        textAlign:
                                            "center",
                                        fontFamily:
                                            "DM Sans, sans-serif",
                                        fontSize: "28px",
                                        fontWeight:
                                            "700",
                                        color:
                                            "#111827",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    {monthName} {year}
                                </h2>


                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "flex-end",
                                        gap: "12px"
                                    }}
                                >

                                    <button
                                        className="calendar-control-button"

                                        onClick={
                                            goToToday
                                        }
                                    >
                                        Today
                                    </button>


                                    <button
                                        className="calendar-control-button"

                                        onClick={
                                            nextMonth
                                        }
                                    >
                                        Next
                                    </button>

                                </div>

                            </div>


                            {/* WEEKDAYS + CALENDAR */}

                            <div className="calendar-grid">

                                {[
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat"
                                ].map(
                                    (day) => (

                                        <div
                                            key={day}
                                            className="calendar-weekday"
                                        >
                                            {day}
                                        </div>

                                    )
                                )}


                                {calendarDays}

                            </div>


                            {/* SELECTED DATE APPLICATIONS */}

                            <div
                                style={{
                                    marginTop: "35px",
                                    padding: "25px",
                                    background: "#ffffff",
                                    borderRadius: "16px",
                                    border: "1px solid #e2e8f0"
                                }}
                            >

                                <h2
                                    style={{
                                        margin: "0 0 8px",
                                        color: "#111827",
                                        fontSize: "22px",
                                        fontWeight: "700"
                                    }}
                                >
                                    Applications on{" "}
                                    {selectedDate.toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        }
                                    )}
                                </h2>


                                <p
                                    style={{
                                        margin: "0 0 20px",
                                        color: "#64748b",
                                        fontSize: "14px"
                                    }}
                                >
                                    {
                                        getSelectedDateApplications()
                                            .length
                                    }{" "}

                                    {
                                        getSelectedDateApplications()
                                            .length === 1
                                            ? "application"
                                            : "applications"
                                    }{" "}

                                    submitted on this date
                                </p>


                                {
                                    getSelectedDateApplications()
                                        .length === 0
                                    ? (

                                        <div
                                            style={{
                                                padding: "25px",
                                                textAlign: "center",
                                                background: "#f8fafc",
                                                borderRadius: "12px",
                                                color: "#64748b"
                                            }}
                                        >
                                            No applications submitted
                                            on this date.
                                        </div>

                                    )
                                    : (

                                        <div>

                                            {
                                                getSelectedDateApplications()
                                                    .map(
                                                        (application) => (

                                                            <div
                                                                key={
                                                                    application._id
                                                                }

                                                                style={{
                                                                    padding: "18px",
                                                                    marginBottom: "12px",
                                                                    border: "1px solid #e2e8f0",
                                                                    borderRadius: "12px",
                                                                    background: "#ffffff",
                                                                    cursor: "pointer"
                                                                }}

                                                                onClick={() =>
                                                                    handleApplicationClick(
                                                                        application._id
                                                                    )
                                                                }
                                                            >

                                                                <div
                                                                    style={{
                                                                        fontSize: "16px",
                                                                        fontWeight: "700",
                                                                        color: "#111827",
                                                                        marginBottom: "6px"
                                                                    }}
                                                                >
                                                                    {
                                                                        application.company
                                                                    }
                                                                </div>


                                                                <div
                                                                    style={{
                                                                        fontSize: "14px",
                                                                        color: "#475569",
                                                                        marginBottom: "6px"
                                                                    }}
                                                                >
                                                                    {
                                                                        application.role
                                                                    }
                                                                </div>


                                                                <div
                                                                    style={{
                                                                        fontSize: "13px",
                                                                        color: "#64748b"
                                                                    }}
                                                                >
                                                                    Status:{" "}
                                                                    {
                                                                        application.status
                                                                    }
                                                                </div>

                                                            </div>

                                                        )
                                                    )
                                            }

                                        </div>

                                    )
                                }

                            </div>

                        </>

                    )}

                </section>

            </main>

        </div>
    );
};


export default Calendar;