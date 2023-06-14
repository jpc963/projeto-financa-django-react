import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RegisterContext = createContext(undefined)
export default RegisterContext

export const RegisterProvider = ({ children }) => {
	let usuario = useState({})
	let navigate = useNavigate()

	useEffect(() => {}, [usuario])

	let userRegister = async e => {
		e.preventDefault()
		let response = await fetch("api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ ...usuario, username: e.target.usuario.value, password: e.target.senha.value, email: e.target.email.value }),
		})

		if (response.status === 200) {
			navigate("/login")
		}
	}

	let contextData = {
		userRegister: userRegister,
	}

	return <RegisterContext.Provider value={contextData}>{children}</RegisterContext.Provider>
}
