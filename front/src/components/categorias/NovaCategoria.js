import React, {useState, useContext, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

import AuthContext from "../../context/AuthContext"

const NovaCategoria = () => {
    let navigate = useNavigate()
    let [categoria, setCategoria] = useState({nome: ""})
    let {user, authTokens} = useContext(AuthContext)
    let [erroNome, setErroNome] = useState(null)
    let categoriaRegex = new RegExp("^[a-zA-Z]{3,}( ?[a-zA-Z]+){1,20}$")

    let criarCategoria = async (e) => {
        e.preventDefault()
        setErroNome(null)

        if (categoria.nome === undefined) {
            setErroNome("O nome não pode ficar vazio")
        } else if (categoria.nome.length < 3) {
            setErroNome("O nome deve ter no mínimo 3 caracteres")
        } else if (categoria.nome.length > 20) {
            setErroNome("O nome não pode ter mais de 20 caracteres")
        } else if (!categoriaRegex.test(categoria.nome)) {
            setErroNome("Nome inválido")
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
        <div className="d-flex justify-content-center">
            <div className="formulario col-10 col-md-8 col-lg-6 col-xxl-5 shadow-sm">
                <div className="dashboard-stats-title pt-4 pb-3">
                    <h3 className="text-center text-white">Nova categoria</h3>
                </div>
                <div className="dashboard-stats-info">
                    <div className="d-flex flex-column">
                        <label htmlFor="descricao" className="fs-5">Nome</label>
                        <input className="p-2 rounded bg-white"
                               maxLength="20" type="text" name="nome" id="nome" placeholder="(Max. 20 caracteres)"
                               onChange={e => {
                                   setCategoria({...categoria, nome: e.target.value})
                               }}/>
                        {erroNome && <p className="error">{erroNome}</p>}
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-center p-0">
                        <div className="text-center col-12 col-lg-7 order-2 order-lg-0 formulario-link">
                            <Link to="/registro" className="link-dark">
                                Cancelar
                            </Link>
                        </div>
                        <div className="col-12 col-lg">
                            <button onClick={criarCategoria} type="submit" className="btn-primary">
                                Concluído
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NovaCategoria
