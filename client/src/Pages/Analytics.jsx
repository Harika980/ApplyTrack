import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

const Analytics = () => {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:5000/api/applications",
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

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                setError(
                    error.response?.data?.message ||
                    "Failed to load analytics."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchApplications();

    }, [navigate]);


    const totalApplications = applications.length;

    const appliedCount = applications.filter(
        (application) =>
            application.status === "Applied"
    ).length;

    const assessmentCount = applications.filter(
        (application) =>
            application.status === "Assessment"
    ).length;

    const interviewCount = applications.filter(
        (application) =>
            application.status === "Interview"
    ).length;

    const selectedCount = applications.filter(
        (application) =>
            application.status === "Selected"
    ).length;

    const rejectedCount = applications.filter(
        (application) =>
            application.status === "Rejected"
    ).length;


    const interviewRate =
        totalApplications > 0
            ? Math.round(
                (interviewCount / totalApplications) * 100
            )
            : 0;

    const selectionRate =
        totalApplications > 0
            ? Math.round(
                (selectedCount / totalApplications) * 100
            )
            : 0;


    const statusData = [
        {
            label: "Applied",
            count: appliedCount
        },
        {
            label: "Assessment",
            count: assessmentCount
        },
        {
            label: "Interview",
            count: interviewCount
        },
        {
            label: "Selected",
            count: selectedCount
        },
        {
            label: "Rejected",
            count: rejectedCount
        }
    ];


    const chartData = [
        {
            name: "Applied",
            value: appliedCount
        },
        {
            name: "Assessment",
            value: assessmentCount
        },
        {
            name: "Interview",
            value: interviewCount
        },
        {
            name: "Selected",
            value: selectedCount
        },
        {
            name: "Rejected",
            value: rejectedCount
        }
    ];


    const chartColors = [
        "#7055ff",
        "#477cff",
        "#26a69a",
        "#2e8b57",
        "#d9534f"
    ];


    const getPercentage = (count) => {

        if (totalApplications === 0) {
            return 0;
        }

        return Math.round(
            (count / totalApplications) * 100
        );
    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    const metricStyle = {
        flex: "1",
        minWidth: "160px",
        padding: "24px",
        borderRadius: "18px",
        background: "#ffffff",
        border: "1px solid #aeb7c7",
        boxShadow:
            "0 10px 25px rgba(30, 38, 60, 0.10)"
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
                        className="nav-item"
                        onClick={() =>
                            navigate("/applications")
                        }
                    >
                        Applications
                    </a>


                    <a className="nav-item active">
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

                        Analytics

                    </div>


                    <div className="top-actions">

                        <div className="top-avatar">
                            H
                        </div>

                    </div>

                </header>


                <section
                    style={{
                        width: "100%",
                        maxWidth: "1200px",
                        margin: "0 auto"
                    }}
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
                            PERFORMANCE INSIGHTS
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
                            Analytics
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
                            Understand how your job search is progressing.
                        </p>

                    </div>


                    {error && (

                        <div
                            style={{
                                padding: "15px",
                                marginBottom: "20px",
                                borderRadius: "12px",
                                background: "#f5d7d7",
                                color: "#9b2c2c"
                            }}
                        >
                            {error}
                        </div>

                    )}


                    {loading ? (

                        <div
                            style={{
                                textAlign: "center",
                                padding: "80px 20px",
                                color: "#596275"
                            }}
                        >
                            Loading analytics...
                        </div>

                    ) : (

                        <>

                            {/* METRICS */}

                            <div
                                style={{
                                    display: "flex",
                                    gap: "18px",
                                    flexWrap: "wrap",
                                    marginBottom: "24px"
                                }}
                            >

                                <div style={metricStyle}>

                                    <p>
                                        Total Applications
                                    </p>

                                    <h3>
                                        {totalApplications}
                                    </h3>

                                </div>


                                <div style={metricStyle}>

                                    <p>
                                        Interviews
                                    </p>

                                    <h3>
                                        {interviewCount}
                                    </h3>

                                </div>


                                <div style={metricStyle}>

                                    <p>
                                        Selected
                                    </p>

                                    <h3>
                                        {selectedCount}
                                    </h3>

                                </div>


                                <div style={metricStyle}>

                                    <p>
                                        Selection Rate
                                    </p>

                                    <h3>
                                        {selectionRate}%
                                    </h3>

                                </div>

                            </div>


                            {/* PIPELINE + PERFORMANCE */}

                            <div
                                style={{
                                    display: "flex",
                                    gap: "24px",
                                    flexWrap: "wrap",
                                    marginBottom: "24px"
                                }}
                            >

                                {/* PIPELINE */}

                                <div
                                    style={{
                                        flex: "1",
                                        minWidth: "400px",
                                        padding: "28px",
                                        borderRadius: "20px",
                                        background: "#ffffff",
                                        border: "1px solid #aeb7c7",
                                        boxShadow:
                                            "0 12px 30px rgba(30, 38, 60, 0.10)"
                                    }}
                                >

                                    <h2 style={{ color: "#000000" }}>
                                        Application Pipeline
                                    </h2>

                                    <p>
                                        Breakdown of your current applications.
                                    </p>


                                    {statusData.map((item) => {

                                        const percentage =
                                            getPercentage(
                                                item.count
                                            );

                                        return (

                                            <div
                                                key={item.label}
                                                style={{
                                                    marginBottom: "22px"
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        marginBottom: "8px",
                                                        fontSize: "13px",
                                                        fontWeight: "600"
                                                    }}
                                                >

                                                    <span>
                                                        {item.label}
                                                    </span>

                                                    <span>
                                                        {item.count}
                                                    </span>

                                                </div>


                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "9px",
                                                        borderRadius: "10px",
                                                        background: "#b8bfcc",
                                                        overflow: "hidden"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width:
                                                                `${percentage}%`,
                                                            height: "100%",
                                                            borderRadius:
                                                                "10px",
                                                            background:
                                                                "linear-gradient(90deg, #7055ff, #477cff)"
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        );

                                    })}

                                </div>


                                {/* SEARCH PERFORMANCE */}

                                <div
                                    style={{
                                        flex: "1",
                                        minWidth: "300px",
                                        padding: "28px",
                                        borderRadius: "20px",
                                        background: "#ffffff",
                                        border: "1px solid #aeb7c7",
                                        boxShadow:
                                            "0 12px 30px rgba(30, 38, 60, 0.10)"
                                    }}
                                >

                                    <h2 style={{ color: "#000000" }}>
                                        Search Performance
                                    </h2>

                                    <p>
                                        Key conversion numbers from your job search.
                                    </p>


                                    <div
                                        style={{
                                            marginTop: "30px"
                                        }}
                                    >

                                        <p>
                                            Interview Rate
                                        </p>

                                        <h3>
                                            {interviewRate}%
                                        </h3>

                                    </div>


                                    <div
                                        style={{
                                            marginTop: "25px"
                                        }}
                                    >

                                        <p>
                                            Assessment Stage
                                        </p>

                                        <h3>
                                            {assessmentCount}
                                        </h3>

                                    </div>


                                    <div
                                        style={{
                                            marginTop: "25px"
                                        }}
                                    >

                                        <p>
                                            Rejected
                                        </p>

                                        <h3>
                                            {rejectedCount}
                                        </h3>

                                    </div>

                                </div>

                            </div>


                            {/* PIE CHART */}

                            <div
                                style={{
                                    padding: "28px",
                                    borderRadius: "20px",
                                    background: "#ffffff",
                                    border: "1px solid #aeb7c7",
                                    boxShadow:
                                        "0 12px 30px rgba(30, 38, 60, 0.10)",
                                    marginBottom: "24px"
                                }}
                            >

                                <h2 style={{ color: "#000000" }}>
                                    Application Distribution
                                </h2>

                                <p>
                                    Visual breakdown of applications by stage.
                                </p>


                                <ResponsiveContainer
                                    width="100%"
                                    height={330}
                                >

                                    <PieChart>

                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={110}
                                            label
                                        >

                                            {chartData.map(
                                                (entry, index) => (

                                                    <Cell
                                                        key={
                                                            `cell-${index}`
                                                        }
                                                        fill={
                                                            chartColors[index]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>


                            {/* BAR CHART */}

                            <div
                                style={{
                                    padding: "28px",
                                    borderRadius: "20px",
                                    background: "#ffffff",
                                    border: "1px solid #aeb7c7",
                                    boxShadow:
                                        "0 12px 30px rgba(30, 38, 60, 0.10)"
                                }}
                            >

                                <h2 style={{ color: "#000000" }}>
                                    Application Distribution
                                </h2>

                                <p>
                                    Number of applications at each stage.
                                </p>


                                <ResponsiveContainer
                                    width="100%"
                                    height={320}
                                >

                                    <BarChart
                                        data={chartData}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />

                                        <XAxis
                                            dataKey="name"
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                        />

                                        <Tooltip />

                                        <Bar
                                            dataKey="value"
                                            fill="#7055ff"
                                            radius={[
                                                6,
                                                6,
                                                0,
                                                0
                                            ]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </>

                    )}

                </section>

            </main>

        </div>
    );
};

export default Analytics;