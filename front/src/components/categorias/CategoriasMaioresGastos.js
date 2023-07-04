import React, { useEffect, useState, useContext } from "react"
import AuthContext from "../../context/AuthContext"
import { Link } from "react-router-dom"

const CategoriasMaioresGastos = () => {
	let { authTokens } = useContext(AuthContext)
	let [categorias, setCategorias] = useState([])
	let [lastItemIndex, setLastItemIndex] = useState(null)

	let getCategorias = async () => {
		let response = await fetch("api/categorias", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(authTokens.access),
			},
		})
		let data = await response.json()

		data.sort((a, b) => b.valor_total - a.valor_total)
		data = data.slice(0, 4)
		setCategorias(data)
		setLastItemIndex(data.length - 1)
	}

	useEffect(() => {
		getCategorias()
	}, [])

	return (
		<div>
			<h2>Maiores Gastos</h2>
			<div className="lista">
				{categorias.map((categoria, index) => (
					<div className={`item-lista-informacoes-index ${index === lastItemIndex ? "ultimo-item" : ""}`} key={index}>
						<div className="item-lista-informacoes-descricao">
							<h3>{categoria.nome}</h3>
						</div>
						<div className="item-lista-informacoes-valor">
							<p>R$ {categoria.valor_total}</p>
						</div>
					</div>
				))}
			</div>
			<div className="total-gasto">
				<p>Total de categorias: {categorias.length}</p>
				<Link to="/categorias" className="link-dark">
					Mais
				</Link>
			</div>
		</div>
	)
}

export default CategoriasMaioresGastos
