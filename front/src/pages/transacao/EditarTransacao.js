import React, {useContext, useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const EditarTransacao = () => {
    let navigate = useNavigate()
    let [transacao, setTransacao] = useState({})
    let {authTokens, user} = useContext(AuthContext)
    let [erroDescricao, setErroDescricao] = useState(null)
    let [erroValor, setErroValor] = useState(null)
    let [erroCategoria, setErroCategoria] = useState(null)
    let transacaoValorRegex = new RegExp('^[0-9]+(\.[0-9]{1,2})?$')
    let transacaoCategoriaRegex = new RegExp('^[a-zA-Z0-9]{3,}( ?[a-zA-Z0-9]+){1,20}$')
    let transacaoDescricaoRegex = new RegExp('^[a-zA-Z0-9]{3,}( ?[a-zA-Z0-9]+){1,100}$')

    let edicaoCompleta = async (e) => {
        e.preventDefault()
        setErroDescricao(null)
        setErroValor(null)
        setErroCategoria(null)

        if (transacao.descricao === undefined) {
            setErroDescricao('A descrição não pode ficar vazia')
        } else if (transacao.descricao.length < 3) {
            setErroDescricao('A descrição deve ter no mínimo 3 caracteres')
        } else if (transacao.descricao.length > 100) {
            setErroDescricao('A descrição não pode ter mais de 100 caracteres')
        } else if (!transacaoDescricaoRegex.test(transacao.descricao)) {
            setErroDescricao('Descrição inválida')
        } else if (transacao.valor === undefined || !transacaoValorRegex.test(transacao.valor) || transacao.valor <= 0) {
            setErroValor('Valor inválido')
        } else if (transacao.categoria === undefined) {
            setErroCategoria('A categoria não pode ficar vazia')
        } else if (transacao.categoria.length < 3) {
            setErroCategoria('A categoria deve ter no mínimo 3 caracteres')
        } else if (transacao.categoria.length > 20) {
            setErroCategoria('A categoria não pode ter mais de 20 caracteres')
        } else if (!transacaoCategoriaRegex.test(transacao.categoria)) {
            setErroCategoria('Categoria inválida')
        } else {
            await fetch(`/api/transacoes/${transacao.id}/editar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + authTokens.access,
                },
                body: JSON.stringify(transacao)
            })
            navigate("/transacoes")
        }
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
    }, [user, navigate])

    return (
        <div className="novo-registro">
            <h2>Editando transação</h2>
            <div className="form-inputs">
                <label htmlFor="descricao">Descrição</label>
                <input className={!erroDescricao ? '' : 'error'} maxLength="100" type="text" name="descricao" id="descricao" placeholder={`${transacao.descricao}`} onChange={e => {
                    setTransacao({...transacao, descricao: e.target.value})
                }}/>
                {erroDescricao && <p className="error">{erroDescricao}</p>}
                <label htmlFor="valor">Valor</label>
                <input className={!erroValor ? '' : 'error'} type="text" name="valor" id="valor" placeholder={`R$ ${transacao.valor}`} onChange={e => {
                    setTransacao({...transacao, valor: e.target.value})
                }}/>
                {erroValor && <p className="error">{erroValor}</p>}
                <label htmlFor="categoria">Categoria</label>
                <input className={!erroCategoria ? '' : 'error'} maxLength="20" type="text" name="categoria" id="categoria" placeholder={`${transacao.categoria}`} onChange={e => {
                    setTransacao({...transacao, categoria: e.target.value})
                }}/>
                {erroCategoria && <p className="error">{erroCategoria}</p>}
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