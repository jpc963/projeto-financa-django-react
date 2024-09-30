import React, {useContext} from "react"
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const ItemListaTransacoes = ({transacao}) => {

    let {authTokens} = useContext(AuthContext)
    let formatData = transacao => {
        return `${transacao.data.slice(8, 10)}/${transacao.data.slice(5, 7)}/${transacao.data.slice(0, 4)}`
    }

    let excluirTransacao = async () => {
        await fetch(`http://127.0.0.1:8000/api/excluir-transacao/${transacao.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authTokens.access,
            }
        })
        window.location.reload()
    }

    return (
        <div className="d-flex justify-content-around border-bottom py-4 lista-informacoes">
            <div className="d-flex justify-content-between col-5 col-lg-8">
                <Link to={`/transacao/${transacao.id}/editar`} className="link-dark text-decoration-none align-self-center">
                    <span className="fs-4">{transacao.descricao}</span>
                    <span className="fs-6 d-none d-lg-block">{formatData(transacao)}</span>
                </Link>
                <span className="align-self-center d-none d-block">R$ {transacao.valor}</span>
            </div>
            <button className="btn-primary py-2 h-100 align-self-center" type="submit" onClick={excluirTransacao}>Excluir</button>
        </div>
    )
}

export default ItemListaTransacoes
