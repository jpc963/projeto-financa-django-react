import React, {useContext} from "react"
import {Link, useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const ItemListaCategorias = ({categoria}) => {

    let {authTokens} = useContext(AuthContext)

    let excluirCategoria = async () => {
        await fetch(`/api/excluir-categoria/${categoria.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authTokens.access,
            }
        })
        window.location.reload()
    }

    return (
        <div className="item-lista-informacoes">
            <div className="item-lista-informacoes-descricao">
                <Link to={`/categoria/${categoria.nome}/`} className="link-dark">
                    <h3>{categoria.nome}</h3>
                </Link>
            </div>
            <div className="item-lista-informacoes-valor">
                <p>R$ {categoria.valor_total}</p>
            </div>
            <div>
                <button className='btn-primary text-white' type="submit" onClick={excluirCategoria}>Excluir</button>
            </div>
        </div>
    )
}
export default ItemListaCategorias
