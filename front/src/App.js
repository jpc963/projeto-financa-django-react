import React, {useContext} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import AuthContext, {AuthProvider} from "./context/AuthContext"

import './App.css'

import Navbar from "./components/index/Navbar"
import Index from "./pages/Index"
import LoginPage from "./pages/user/LoginPage"
import RegisterPage from "./pages/user/RegisterPage"

function App() {

    return (
        <div className="App">
            <Router>
                <div>
                    <AuthProvider>
                        <Navbar/>
                        <Routes>
                            <Route index element={<Index/>}/>
                            <Route path="/registro" element={<RegisterPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/*" element={<PrivateRoute usuario={useContext(AuthContext)} redirectPath="/login"/>}/>
                            <Route path="*" element={<h1>Not Found</h1>}/>
                        </Routes>
                    </AuthProvider>
                </div>
            </Router>
        </div>
    )
}

export default App
