import React, {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const NovaTransacao = () => {
    let navigate = useNavigate()
    let [transacao, setTransacao] = useState({})
    let {authTokens, user} = useContext(AuthContext)
    let [erroDescricao, setErroDescricao] = useState('')
    let [erroValor, setErroValor] = useState('')
    let [erroCategoria, setErroCategoria] = useState('')
    let transacaoValorRegex = new RegExp('^[0-9]+(\.[0-9]{1,2})?$')
    let transacaoCategoriaRegex = new RegExp('^[a-zA-Z0-9]{3,}(\.?[a-zA-Z0-9]+){1,20}$')
    let transacaoDescricaoRegex = new RegExp('^[a-zA-Z0-9]{3,}(\.?[a-zA-Z0-9]+){1,100}$')

    let novaTransacao = async (e) => {
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
            setErroCategoria('A categoria só pode conter letras e espaços')
        } else if (transacao.categoria.length < 3) {
            setErroCategoria('A categoria deve ter no mínimo 3 caracteres')
        } else if (transacao.categoria.length > 20) {
            setErroCategoria('A categoria não pode ter mais de 20 caracteres')
        } else if (!transacaoCategoriaRegex.test(transacao.categoria)) {
            setErroCategoria('Categoria inválida')
        } else {
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
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    return (
        <div>
            <div className="novo-registro">
                <h2>Novo Gasto</h2>
                <div className="form-inputs">
                    <label htmlFor="descricao">Descrição</label>
                    <input className={!erroDescricao ? '' : 'error'}
                           maxLength="100"
                           type="text"
                           name="descricao"
                           id="descricao"
                           placeholder="(Max. 100 caracteres)"
                           onChange={e => {
                               setTransacao({...transacao, descricao: e.target.value})
                           }}/>
                    {erroDescricao !== null &&
                        <div className="campo-form">
                            <p className="error">{erroDescricao}</p>
                        </div>
                    }
                    <label htmlFor="valor">Valor</label>
                    <input className={!erroValor ? '' : 'error'}
                           type="text"
                           name="valor"
                           id="valor"
                           placeholder="R$"
                           onChange={e => {
                               setTransacao({...transacao, valor: e.target.value})
                           }}/>
                    {erroValor !== null &&
                        <div className="campo-form">
                            <p className="error">{erroValor}</p>
                        </div>
                    }
                    <label htmlFor="categoria">Categoria</label>
                    <input className={!erroCategoria ? '' : 'error'}
                           maxLength="20"
                           type="text"
                           name="categoria"
                           id="categoria"
                           placeholder="Lazer, Essencial..."
                           onChange={e => {
                               setTransacao({...transacao, categoria: e.target.value})
                           }}/>
                    {erroCategoria !== null &&
                        <div className="campo-form">
                            <p className="error">{erroCategoria}</p>
                        </div>
                    }
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
