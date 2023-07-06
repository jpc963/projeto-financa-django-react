import React, {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const NovaTransacao = () => {
    let navigate = useNavigate()
    let [transacao, setTransacao] = useState({})
    let {authTokens, user} = useContext(AuthContext)
    let [erroDescricao, setErroDescricao] = useState("")
    let [erroValor, setErroValor] = useState("")
    let [erroCategoria, setErroCategoria] = useState("")
    let transacaoValorRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$")
    let transacaoCategoriaRegex = new RegExp("^[a-zA-Z0-9]{3,}(\.?[a-zA-Z0-9]+){1,20}$")
    let transacaoDescricaoRegex = new RegExp("^[a-zA-Z0-9]{3,}(\.?[a-zA-Z0-9]+){1,100}$")

    let novaTransacao = async (e) => {
        e.preventDefault()
        setErroDescricao(null)
        setErroValor(null)
        setErroCategoria(null)

        if (transacao.descricao === undefined) {
            setErroDescricao("A descrição não pode ficar vazia")
        } else if (transacao.descricao.length < 3) {
            setErroDescricao("A descrição deve ter no mínimo 3 caracteres")
        } else if (transacao.descricao.length > 100) {
            setErroDescricao("A descrição não pode ter mais de 100 caracteres")
        } else if (!transacaoDescricaoRegex.test(transacao.descricao)) {
            setErroDescricao("Descrição inválida")
        } else if (transacao.valor === undefined || !transacaoValorRegex.test(transacao.valor) || transacao.valor <= 0) {
            setErroValor("Valor inválido")
        } else if (transacao.categoria === undefined) {
            setErroCategoria("A categoria só pode conter letras e espaços")
        } else if (transacao.categoria.length < 3) {
            setErroCategoria("A categoria deve ter no mínimo 3 caracteres")
        } else if (transacao.categoria.length > 20) {
            setErroCategoria("A categoria não pode ter mais de 20 caracteres")
        } else if (!transacaoCategoriaRegex.test(transacao.categoria)) {
            setErroCategoria("Categoria inválida")
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
        <div className="d-flex justify-content-center">
            <div className="formulario col-10 col-md-8 col-lg-6 col-xxl-5 shadow-sm">
                <div className="dashboard-stats-title pt-4 pb-3">
                    <h3 className="text-center text-white">Novo gasto</h3>
                </div>
                <div className="dashboard-stats-info">
                    <div className="d-flex flex-column">
                        <label htmlFor="descricao" className="fs-5">Descrição</label>
                        <input className="p-2 rounded bg-white"
                               maxLength="100" type="text" name="descricao" id="descricao" placeholder="(Max. 100 caracteres)"
                               onChange={e => {
                                   setTransacao({...transacao, descricao: e.target.value})
                               }}/>
                        {erroDescricao !== "" &&
                            <div className="campo-form">
                                <p className="error">{erroDescricao}</p>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="valor" className="fs-5">Valor</label>
                        <input className="p-2 rounded bg-white"
                               type="text" name="valor" id="valor" placeholder="R$"
                               onChange={e => {
                                   setTransacao({...transacao, valor: e.target.value})
                               }}/>
                        {erroValor !== "" &&
                            <div className="campo-form">
                                <p className="error">{erroValor}</p>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="categoria" className="fs-5">Categoria</label>
                        <input className="p-2 rounded bg-white"
                               maxLength="20" type="text" name="categoria" id="categoria" placeholder="Lazer, Essencial..."
                               onChange={e => {
                                   setTransacao({...transacao, categoria: e.target.value})
                               }}/>
                        {erroCategoria !== "" &&
                            <div className="campo-form">
                                <p className="error">{erroCategoria}</p>
                            </div>
                        }
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-center p-0">
                        <div className="text-center col-12 col-lg-7 order-2 order-lg-0 formulario-link">
                            <Link to="/registro" className="link-dark">
                                Cancelar
                            </Link>
                        </div>
                        <div className="col-12 col-lg">
                            <button onClick={novaTransacao} type="submit" className="btn-primary">
                                Concluído
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovaTransacao
