import React, {useEffect, useState, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const TransacoesRecentes = () => {
    let navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    let [transacoes, setTransacoes] = useState([])
    let [valorTotal, setValorTotal] = useState(0)
    let [ultimoItemIndex, setUltimoItemIndex] = useState(null)

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
        let data = await response.json()
        let transacoesSorteadas = data.sort((a, b) => {
            return new Date(b.data) - new Date(a.data)
        })
        let transacoes_recentes = transacoesSorteadas.slice(0, 4)
        setTransacoes(transacoes_recentes)
        setUltimoItemIndex(transacoes_recentes.length - 1)
        setValorTotal(data.reduce((total, transacao) => total + transacao.valor, 0))
    }

    useEffect(() => {
        getListaTransacoes()
    }, [])

    let lasItem = index => {
        return index === ultimoItemIndex ? "ultimo-item" : ""
    }

    let formatData = transacao => {
        return `${transacao.data.slice(8, 10)}/${transacao.data.slice(5, 7)}/${transacao.data.slice(0, 4)}`
    }

    return (
        <div>
            <h2>Transações Recentes</h2>
            <div className="lista">
                {transacoes.map((transacao, index) => (
                    <div className={`item-lista-informacoes-index ${lasItem(index)}`} key={index}>
                        <div className="item-lista-informacoes-descricao">
                            <h3>{transacao.descricao}</h3>
                            <span>{formatData(transacao)}</span>
                        </div>
                        <div className="item-lista-informacoes-valor">
                            <p>R$ {transacao.valor.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total-gasto">
                <p>Total gasto: R$ {valorTotal.toFixed(2)}</p>
                <Link to="/transacoes" className="link-dark">
                    Mais
                </Link>
            </div>
        </div>
    )
}

export default TransacoesRecentes
