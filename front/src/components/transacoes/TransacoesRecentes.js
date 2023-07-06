import React, {useEffect, useState, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const TransacoesRecentes = () => {
    let navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    let [transacoes, setTransacoes] = useState([])
    let [valorTotal, setValorTotal] = useState(0)

    let getListaTransacoes = async () => {
        if (!authTokens) {
            navigate("/login")
            return
        }
        let response = await fetch("api/transacoes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        })
        await response.json().then(organizarTransacoes)
    }

    let organizarTransacoes = (data) => {
        let transacoesSorteadas = data.sort((a, b) => {
            return new Date(b.data) - new Date(a.data)
        })
        let transacoes_recentes = transacoesSorteadas.slice(0, 4)
        setTransacoes(transacoes_recentes)
        setValorTotal(data.reduce((total, transacao) => total + transacao.valor, 0))
    }

    useEffect(() => {
        getListaTransacoes()
    }, [])

    let formatData = transacao => {
        return `${transacao.data.slice(8, 10)}/${transacao.data.slice(5, 7)}/${transacao.data.slice(0, 4)}`
    }

    return (
        <div className="dashboard-stats shadow-sm">
            <div className="dashboard-stats-title pt-4 pb-3">
                <h2 className="text-center fs-3">Transações Recentes</h2>
            </div>
            <div className="dashboard-stats-info">
                {transacoes.map((transacao, index) => (
                    <div className="border-bottom">
                        <div className="d-flex justify-content-around" key={index}>
                            <div className="d-flex flex-column align-center py-3">
                                <span className="fw-medium fs-4">{transacao.descricao}</span>
                                <span className="fs-6">{formatData(transacao)}</span>
                            </div>
                            <div className="d-flex">
                                <span className="align-self-center">R$ {transacao.valor.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-around py-4">
                    <span>Total gasto: R$ {valorTotal.toFixed(2)}</span>
                    <Link to="/transacoes" className="text-black text-decoration-underline">
                        Mais
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TransacoesRecentes
