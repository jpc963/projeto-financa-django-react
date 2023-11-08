import React, { useContext } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import AuthContext, { AuthProvider } from "./context/AuthContext"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./App.css"

import Home from "./pages/Home"
import Navbar from "./components/index/Navbar"
import LoginPage from "./pages/user/LoginPage"
import RegisterPageTs from "./pages/user/RegisterPage.tsx"

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <AuthProvider>
                        <Navbar />
                        <Routes>
                            <Route
                                index
                                element={<Home />}
                            />
                            <Route
                                path="/registro"
                                element={<RegisterPageTs />}
                            />
                            <Route
                                path="/login"
                                element={<LoginPage />}
                            />
                            <Route
                                path="/*"
                                element={
                                    <PrivateRoute
                                        usuario={useContext(AuthContext)}
                                        redirectPath="/login"
                                    />
                                }
                            />
                            <Route
                                path="*"
                                element={<h1>Not Found</h1>}
                            />
                        </Routes>
                    </AuthProvider>
                </div>
            </Router>
        </div>
    )
}

export default App
