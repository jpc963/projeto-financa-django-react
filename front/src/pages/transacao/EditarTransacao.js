import React, {useContext, useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const EditarTransacao = () => {
    let navigate = useNavigate()
    let [transacao, setTransacao] = useState({})
    let {authTokens, user} = useContext(AuthContext)

    let edicaoCompleta = async () => {
        await fetch(`/api/transacoes/${transacao.id}/editar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + authTokens.access,
            },
            body: JSON.stringify(transacao)
        })
        navigate("/transacoes")
    }

    let pegarTransacao = async () => {
        let response = await fetch('/api/transacoes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + authTokens.access,
            }
        })
        let data = await response.json()
        setTransacao(data = data.filter(transacao => transacao.id === parseInt(window.location.pathname.split("/")[2]))[0])
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }

        pegarTransacao()
    }, [user])

    return (
        <div className="novo-registro">
            <h2>Editando transação</h2>
            <div className="form-inputs">
                <label htmlFor="descricao">Descrição</label>
                <input maxLength="100" type="text" name="descricao" id="descricao" placeholder={`${transacao.descricao}`} onChange={e => {
                    setTransacao({...transacao, descricao: e.target.value})
                }}/>
                <label htmlFor="valor">Valor</label>
                <input type="text" name="valor" id="valor" placeholder={`R$ ${transacao.valor}`} onChange={e => {
                    setTransacao({...transacao, valor: e.target.value})
                }}/>
                <label htmlFor="categoria">Categoria</label>
                <input maxLength="20" type="text" name="categoria" id="categoria" placeholder={`${transacao.categoria}`} onChange={e => {
                    setTransacao({...transacao, categoria: e.target.value})
                }}/>
            </div>
            <div className="botoes-confirma-volta">
                <Link to="/dashboard" className="link-padrao">
                    Cancelar
                </Link>
                <button className="btn-primary" onClick={edicaoCompleta}>
                    Concluído
                </button>
            </div>
        </div>
    )
}

export default EditarTransacao