import React from "react"
import {Link} from "react-router-dom"

const ItemListaTransacoes = ({transacao}) => {

    return (
        <div className="item-lista-informacoes">
            <div className="item-lista-informacoes-descricao">
                <Link to={`${transacao.id}/editar`} className="link-padrao">
                    <h3>{transacao.descricao}</h3>
                </Link>
            </div>
            <div className="item-lista-informacoes-valor">
                <p>R$ {transacao.valor}</p>
            </div>
        </div>
    )
}

export default ItemListaTransacoes
