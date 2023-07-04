import React, {useContext} from "react"
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const ItemListaTransacoes = ({transacao}) => {

    let {authTokens} = useContext(AuthContext)

    let excluirTransacao = async () => {
        await fetch(`/api/excluir-transacao/${transacao.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authTokens.access,
            }
        })
        window.location.reload()
    }

    return (
        <div className="item-lista-informacoes">
            <div className="item-lista-informacoes-descricao">
                <Link to={`/transacao/${transacao.id}/editar`} className="link-dark">
                    <h3>{transacao.descricao}</h3>
                </Link>
            </div>
            <div className="item-lista-informacoes-valor">
                <p>R$ {transacao.valor}</p>
            </div>
            <div>
                <button className="btn-primary text-white" type="submit" onClick={excluirTransacao}>Excluir</button>
            </div>
        </div>
    )
}

export default ItemListaTransacoes
