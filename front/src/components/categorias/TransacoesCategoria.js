import React, { useState, useEffect } from "react"

const TransacoesCategoria = () => {
	let [transacoes, setTransacoes] = useState([])

	let getTransacoes = async () => {
		let response = await fetch("api/transacoes")
		let data = await response.json()
		setTransacoes(data)
	}

	return (
		<div className="transacoes-categoria">
			<div className="transacoes-categoria-titulo">
				<h3>Transações</h3>
			</div>
			<div className="transacoes-categoria-lista"></div>
		</div>
	)
}

export default TransacoesCategoria
