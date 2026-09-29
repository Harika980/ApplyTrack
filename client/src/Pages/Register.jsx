
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        const passwordRequirements =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRequirements.test(formData.password)) {
            setError(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
            );
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                "https://applytrack-1-p2en.onrender.com/api/auth/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            );

            setMessage(response.data.message);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Registration failed."
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
                        onClick={() => navigate("/applications")}
                    >
                        Applications
                    </a>

                    <a
                        className="nav-item"
                        onClick={() => navigate("/analytics")}
                    >
                        Analytics
                    </a>

                    <a
                        className="nav-item"
                        onClick={() => navigate("/calendar")}
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
                        onClick={() => navigate("/login")}
                    >
                        Login
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
                        Register
                    </div>

                </header>


                <section className="form-page">

                    <div className="form-card">

                        <h2>
                            Create your account
                        </h2>

                        <p className="form-description">
                            Start organizing your job search with ApplyTrack.
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

                            {/* Name */}

                            <div className="form-group">

                                <label>
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="form-input"
                                />

                            </div>


                            {/* Email */}

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


                            {/* Password */}

                            <div className="form-group">

                                <label>
                                    Password
                                </label>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        width: "100%"
                                    }}
                                >

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        required
                                        className="form-input"
                                        style={{
                                            flex: 1,
                                            minWidth: 0
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        style={{
                                            background: "#6c4cff",
                                            color: "#ffffff",
                                            border: "none",
                                            borderRadius: "8px",
                                            padding: "10px 16px",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            minWidth: "62px",
                                            height: "42px"
                                        }}
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>


                                <p
                                    className="form-description"
                                    style={{
                                        color: "red"
                                    }}
                                >
                                    Password must contain at least 8 characters,
                                    one uppercase letter, one lowercase letter,
                                    one number, and one special character.
                                </p>

                            </div>


                            {/* Confirm Password */}

                            <div className="form-group">

                                <label>
                                    Confirm Password
                                </label>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        width: "100%"
                                    }}
                                >

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        required
                                        className="form-input"
                                        style={{
                                            flex: 1,
                                            minWidth: 0
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        style={{
                                            background: "#6c4cff",
                                            color: "#ffffff",
                                            border: "none",
                                            borderRadius: "8px",
                                            padding: "10px 16px",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            minWidth: "62px",
                                            height: "42px"
                                        }}
                                    >
                                        {showConfirmPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>


                            {/* Create Account */}

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Create Account
                            </button>


                            {/* Login */}

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => navigate("/login")}
                            >
                                Already have an account? Login
                            </button>

                        </form>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Register;

