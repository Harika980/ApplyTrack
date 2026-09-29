import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


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

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );


            const token = response.data.token;


            localStorage.setItem(
                "token",
                token
            );


            setMessage(
                "Login successful."
            );


            setTimeout(() => {

                navigate("/");

            }, 500);


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Login failed."
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
                            navigate("/register")
                        }
                    >
                        Create Account
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

                        Login

                    </div>

                </header>


                <section className="form-page">

                    <div className="form-card">

                        <h2>
                            Login to ApplyTrack
                        </h2>


                        <p className="form-description">
                            Continue managing your job applications.
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
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="form-input"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="form-input"
                                />

                            </div>


                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Login
                            </button>


                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Create Account
                            </button>

                        </form>

                    </div>

                </section>

            </main>

        </div>

    );

};

export default Login;