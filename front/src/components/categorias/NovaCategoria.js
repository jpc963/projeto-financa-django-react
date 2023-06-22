import React, {useState, useContext, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

import AuthContext from "../../context/AuthContext"

const NovaCategoria = () => {
    let navigate = useNavigate()
    let [categoria, setCategoria] = useState({nome: ""})
    let {user, authTokens} = useContext(AuthContext)
    let [erroNome, setErroNome] = useState(null)
    let categoriaRegex = new RegExp('^[a-zA-Z]{3,}( ?[a-zA-Z]+){1,20}$')

    let criarCategoria = async (e) => {
        e.preventDefault()
        setErroNome(null)

        if (categoria.nome === undefined) {
            setErroNome('O nome não pode ficar vazio')
        } else if (categoria.nome.length < 3) {
            setErroNome('O nome deve ter no mínimo 3 caracteres')
        } else if (categoria.nome.length > 20) {
            setErroNome('O nome não pode ter mais de 20 caracteres')
        } else if (!categoriaRegex.test(categoria.nome)) {
            setErroNome('Nome inválido')
        } else {
            setCategoria({...categoria, user: user.user_id})
            await fetch("api/nova-categoria", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authTokens.access,
                },
                body: JSON.stringify(categoria),
            })
            navigate("/categorias")
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
                <h2>Nova Categoria</h2>
                <div className="form-inputs">
                    <label htmlFor="nome">Nome</label>
                    <input className={!erroNome ? '' : 'error'}
                           maxLength="20"
                           type="text"
                           name="nome"
                           id="nome"
                           placeholder="(Max. 20 caracteres)"
                           onChange={e => {
                               setCategoria({...categoria, nome: e.target.value})
                           }}/>
                    {erroNome && <p className="error">{erroNome}</p>}
                </div>
                <div className="botoes-confirma-volta">
                    <Link to="/dashboard" className="link-padrao">
                        Cancelar
                    </Link>
                    <button className="btn-primary" onClick={criarCategoria}>
                        Criar Categoria
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NovaCategoria
