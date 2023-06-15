import React, { createContext, useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(undefined)
export default AuthContext

export const AuthProvider = ({ children }) => {
	let navigate = useNavigate()

	let [authTokens, setAuthTokens] = useState(localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
	let [user, setUser] = useState(localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null)
	let [loading, setLoading] = useState(true)

	let loginUser = async e => {
		e.preventDefault() // Evita que a página seja recarregada
		let response = await fetch("/api/token/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value }),
		})
		let data = await response.json()

		if (response.status === 200) {
			setAuthTokens(data)
			setUser(jwtDecode(data.access))
			localStorage.setItem("authTokens", JSON.stringify(data))
			navigate("/dashboard")
		} else {
			alert("Usuário ou senha incorretos")
		}
	}

	let updateToken = async () => {
		if (!authTokens?.refresh) {
			// O ponto de interrogação é para evitar erro caso o token não exista
			return
		}
		let response = await fetch("/api/token/refresh/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh: authTokens.refresh }),
		})
		let data = await response.json()

		if (response.status === 200) {
			setAuthTokens(data)
			setUser(jwtDecode(data.access))
			localStorage.setItem("authTokens", JSON.stringify(data))
		} else if (response.status === 401) {
			logoutUser()
		}
	}

	let logoutUser = () => {
		setAuthTokens(null)
		setUser(null)
		localStorage.removeItem("authTokens")
		navigate("/login")
	}

	let contextData = {
		user: user,
		authTokens: authTokens,
		loginUser: loginUser,
		logoutUser: logoutUser,
	}

	useEffect(() => {
		if (loading) {
			updateToken().then(r => setLoading(false))
		}

		setTimeout(() => {
			if (authTokens) {
				updateToken()
			}
		}, 240000) // 4 mins
	}, [authTokens, loading, updateToken])

	return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
}
