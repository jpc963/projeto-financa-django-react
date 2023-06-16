import React, {useState, useEffect, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate, useParams} from "react-router-dom"
import ItemListaTransacoes from "../transacoes/ItemListaTransacoes"

const TransacoesCategoria = () => {
    let navigate = useNavigate()
    let {user, authTokens} = useContext(AuthContext)
    let [transacoes, setTransacoes] = useState([])
    let [categoria, setCategoria] = useState({})
    let categoriaParam = useParams()


    let getInformacaoCategoria = async () => {
        let response = await fetch(`/api/categoria/${categoriaParam.nome}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authTokens.access,
            }
        })
        if (response.status === 200) {
            let data = await response.json()
            setCategoria(data)
            getTransacoes()
        }
    }

    let getTransacoes = async () => {
        let response = await fetch("/api/transacoes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authTokens.access,
            }
        })
        let data = await response.json()
        let transacoesDaCategoria = data.filter(transacao => transacao.categoria === categoriaParam.nome)
        setTransacoes(transacoesDaCategoria)
    }

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        getInformacaoCategoria()
    }, [categoriaParam])

    return (
        <div className="lista-informacoes">
            <h2>Transações de {categoriaParam.nome}</h2>
            <div className="botoes-confirma-volta">
                <Link to="/categorias" className="link-padrao">
                    Voltar
                </Link>
            </div>
            {categoria.nome && <h2>{categoria.nome}</h2>}
            {transacoes.map((transacao, index) => (
                <ItemListaTransacoes key={index} transacao={transacao}/>
            ))}
        </div>
    )
}

export default TransacoesCategoria
