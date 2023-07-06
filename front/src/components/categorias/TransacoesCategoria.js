import React, {useState, useEffect, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {useNavigate, useParams} from "react-router-dom"
import ItemListaTransacoes from "../transacoes/ItemListaTransacoes"

const TransacoesCategoria = () => {
    let navigate = useNavigate()
    let {user, authTokens} = useContext(AuthContext)
    let [transacoes, setTransacoes] = useState([])
    let categoriaParam = useParams()


    let getInformacaoCategoria = async () => {
        let response = await fetch(`/api/categoria/${categoriaParam.nome}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authTokens.access,
            }
        })
        if (response.status === 200) {
            getTransacoes()
        }
    }

    let getTransacoes = async () => {
        let response = await fetch("/api/transacoes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authTokens.access,
            }
        })
        let data = await response.json()
        let transacoesDaCategoria = data.filter(transacao => transacao.categoria === categoriaParam.nome)
        setTransacoes(transacoesDaCategoria)
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        getInformacaoCategoria()
    }, [categoriaParam])

    return (
        <div className="d-flex justify-content-center pt-5">
            <div className="flex-column col-11 col-md-6">
                <div className="text-center dashboard-stats-title pt-4 pb-3">
                    <h2 className="fs-2">Transações de {categoriaParam.nome}</h2>
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

export default TransacoesCategoria
