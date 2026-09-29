import React from "react";


import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Applications from "./Pages/Applications";
import AddApplication from "./Pages/AddApplication";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import EditApplication from "./Pages/EditApplication";
import Analytics from "./Pages/Analytics";
import ProtectedRoute from "./ProtectedRoute";
import Calendar from "./Pages/Calendar";


const App = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC ROUTES */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* PROTECTED ROUTES */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/applications"
                    element={
                        <ProtectedRoute>
                            <Applications />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/applications/add"
                    element={
                        <ProtectedRoute>
                            <AddApplication />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/applications/:id/edit"
                    element={
                        <ProtectedRoute>
                            <EditApplication />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <Calendar />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

};


export default App;