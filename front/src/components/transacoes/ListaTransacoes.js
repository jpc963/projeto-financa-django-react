import React, {useState, useEffect, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {useNavigate} from "react-router-dom"

import ItemListaTransacoes from "./ItemListaTransacoes"

const ListaTransacoes = () => {
    let navigate = useNavigate()
    let [transacoes, setTransacoes] = useState([])
    let {authTokens, user} = useContext(AuthContext)

    let getListaTransacoes = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/transacoes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authTokens.access,
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
        <div className="d-flex justify-content-center pt-5">
            <div className="flex-column col-11 col-md-6">
                <div className="text-center dashboard-stats-title pt-4 pb-3">
                    <h2 className="fs-2">Transações</h2>
                </div>
                <div className="dashboard-stats-info">
                    {transacoes.map((transacao, index) => (
                        <ItemListaTransacoes key={index} transacao={transacao}/>
                    ))}
                    <div className="d-flex justify-content-center py-4">
                        <span>Total de transações: {transacoes.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaTransacoes
