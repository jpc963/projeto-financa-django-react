import LoginPage from "./user/LoginPage"
import Dashboard from "./user/Dashboard"

const Home = () => {
    return localStorage.getItem("authTokens") === null ? (
        <LoginPage />
    ) : (
        <Dashboard />
    )
}

export default Home
