import React, {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const NovaTransacao = () => {
    let navigate = useNavigate()
    let [transacao, setTransacao] = useState({descricao: "", valor: "", categoria: ""})
    let {authTokens, user} = useContext(AuthContext)

    let novaTransacao = async () => {
        setTransacao({...transacao, user: user.user_id})
        await fetch("api/nova-transacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
            body: JSON.stringify(transacao),
        })
        navigate("/transacoes")
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    return (
        <div>
            <div className="novo-registro">
                <h2>Novo Gasto</h2>
                <div className="form-inputs">
                    <label htmlFor="descricao">Descrição</label>
                    <input maxLength="100" type="text" name="descricao" id="descricao" placeholder="(Max. 100 caracteres)" onChange={e => {
                        setTransacao({...transacao, descricao: e.target.value})
                    }}/>
                    <label htmlFor="valor">Valor</label>
                    <input type="text" name="valor" id="valor" placeholder="R$" onChange={e => {
                        setTransacao({...transacao, valor: e.target.value})
                    }}/>
                    <label htmlFor="categoria">Categoria</label>
                    <input maxLength="20" type="text" name="categoria" id="categoria" placeholder="Lazer, Essencial..." onChange={e => {
                        setTransacao({...transacao, categoria: e.target.value})
                    }}/>
                </div>
                <div className="botoes-confirma-volta">
                    <Link to="/dashboard" className="link-padrao">
                        Cancelar
                    </Link>
                    <button className="btn-primary" onClick={novaTransacao}>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NovaTransacao
