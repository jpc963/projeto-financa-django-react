import React, {useContext} from "react"
import {Link, useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const ItemListaCategorias = ({categoria}) => {

    let {authTokens} = useContext(AuthContext)

    let excluirCategoria = async () => {
        await fetch(`/api/excluir-categoria/${categoria.id}`, {
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
                <Link to={`/categoria/${categoria.nome}/`} className="link-dark text-decoration-none align-self-center">
                    <span className="fs-4">{categoria.nome}</span>
                </Link>
                <span className="align-self-center d-none d-block">R$ {categoria.valor_total}</span>
            </div>
            <button className="btn-primary py-2 h-100 align-self-center" type="submit" onClick={excluirCategoria}>Excluir</button>
        </div>
    )
}
export default ItemListaCategorias
