import React, { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import AuthContext from "../context/AuthContext"

import Transacoes from "../pages/Transacoes"
import NovaTransacao from "../components/transacoes/NovaTransacao"
import Categorias from "../pages/Categorias"
import NovaCategoria from "../components/categorias/NovaCategoria"
import Dashboard from "../pages/Dashboard"

const PrivateRoute = ({ redirectPath = "login", children }) => {
	let { user } = useContext(AuthContext)

	if (!user) {
		return (
			<Routes>
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="transacoes" element={<Transacoes />} />
			<Route path="nova-transacao" element={<NovaTransacao />} />
			<Route path="categorias" element={<Categorias />} />
			<Route path="nova-categoria" element={<NovaCategoria />} />
			<Route path="*" element={<h1>Not Found</h1>} />
		</Routes>
	)
}

export default PrivateRoute