import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

import ItemListaTransacoes from "./ItemListaTransacoes"

const ListaTransacoes = () => {
	let navigate = useNavigate()
	let [transacoes, setTransacoes] = useState([])
	let { authTokens } = useContext(AuthContext)

	let getListaTransacoes = async () => {
		if (!authTokens) {
			navigate("/login")
			return
		}
		let response = await fetch(`api/transacoes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authTokens.access,
			},
		})
		let data = await response.json()

		if (response.status === 200) {
			setTransacoes(data)
		}
	}

	useEffect(() => {
		getListaTransacoes()
	}, [])

	return (
		<div className="lista-informacoes">
			<h2>Transações</h2>
			<div className="botoes-confirma-volta">
				<Link to="/dashboard" className="link-padrao">
					{" "}
					Voltar{" "}
				</Link>
			</div>
			{transacoes.map((transacao, index) => (
				<ItemListaTransacoes key={index} transacao={transacao} />
			))}
		</div>
	)
}

export default ListaTransacoes
