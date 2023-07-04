import React, {useState, useEffect, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

import ItemListaTransacoes from "./ItemListaTransacoes"

const ListaTransacoes = () => {
    let navigate = useNavigate()
    let [transacoes, setTransacoes] = useState([])
    let {authTokens, user} = useContext(AuthContext)

    let getListaTransacoes = async () => {
        let response = await fetch(`api/transacoes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + authTokens.access,
            },
        })
        let data = await response.json()

        if (response.status === 200) {
            let transacoesSorteadas = data.sort((a, b) => {
                return new Date(b.data) - new Date(a.data)
            })
            setTransacoes(transacoesSorteadas)
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
            return
        }

        getListaTransacoes()
    }, [user])

    return (
        <div className="lista-informacoes">
            <h2>Transações</h2>
            <div className="botoes-confirma-volta">
                <Link to="/dashboard" className="link-dark">
                    Voltar
                </Link>
            </div>
            {transacoes.map((transacao, index) => (
                <ItemListaTransacoes key={index} transacao={transacao}/>
            ))}
        </div>
    )
}

export default ListaTransacoes
