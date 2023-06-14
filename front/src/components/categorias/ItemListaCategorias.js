import React from "react"
import { Link } from "react-router-dom"

const ItemListaCategorias = ({ categoria }) => {
	return (
		<div className="item-lista-informacoes">
			<div className="item-lista-informacoes-descricao">
				<Link to={`../api/categoria/${categoria.nome}`} className="link-padrao">
					<h3>{categoria.nome}</h3>
				</Link>
			</div>
			<div className="item-lista-informacoes-valor">
				<p>R$ {categoria.valor_total}</p>
			</div>
		</div>
	)
}
export default ItemListaCategorias
