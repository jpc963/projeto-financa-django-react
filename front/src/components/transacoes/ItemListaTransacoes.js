import React from "react"

const ItemListaTransacoes = ({ transacao }) => {
	return (
		<div className="item-lista-informacoes">
			<div className="item-lista-informacoes-descricao">
				<h3>{transacao.descricao}</h3>
			</div>
			<div className="item-lista-informacoes-valor">
				<p>R$ {transacao.valor}</p>
			</div>
		</div>
	)
}

export default ItemListaTransacoes
