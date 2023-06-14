import React, { useState, useContext, useEffect } from "react"
import { Link, redirect, useNavigate } from "react-router-dom"

import AuthContext from "../../context/AuthContext"

const NovaCategoria = () => {
	let navigate = useNavigate()
	let [categoria, setCategoria] = useState({ nome: "" })
	let { user, authTokens } = useContext(AuthContext)

	let criarCategoria = async () => {
		setCategoria({ ...categoria, user: user.user_id })
		await fetch("api/nova-categoria", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authTokens.access,
			},
			body: JSON.stringify(categoria),
		})
		navigate("/categorias")
	}

	useEffect(() => {
		if (!user) {
			redirect("/login")
		}
	}, [])

	return (
		<div>
			<div className="novo-registro">
				<h2>Nova Categoria</h2>
				<div className="form-inputs">
					<label htmlFor="nome">Nome</label>
					<input
						maxLength="20"
						type="text"
						name="nome"
						id="nome"
						placeholder="(Max. 20 caracteres)"
						onChange={e => {
							setCategoria({ ...categoria, nome: e.target.value })
						}}
					/>
				</div>
				<div className="botoes-confirma-volta">
					<Link to="/dashboard" className="link-padrao">
						Cancelar
					</Link>
					<button className="btn-primary" onClick={criarCategoria}>
						Criar Categoria
					</button>
				</div>
			</div>
		</div>
	)
}

export default NovaCategoria
