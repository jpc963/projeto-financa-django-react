import React, {useState, useEffect, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

import ItemListaCategorias from "./ItemListaCategorias"

const ListaCategorias = () => {
    let navigate = useNavigate()
    let [categorias, setCategorias] = useState([])
    let {authTokens} = useContext(AuthContext)
    let {user} = useContext(AuthContext)

    let getCategorias = async () => {
        let response = await fetch("api/categorias", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
        })
        let data = await response.json()

        if (response.status === 200) {
            setCategorias(data)
        }
    }

    useEffect(() => {
        if (user) {
            getCategorias()
        } else {
            navigate("/login")
        }
    }, [user])

    return (
        <div className="lista-informacoes">
            <h2>Categorias</h2>
            <div className="botoes-confirma-volta">
                <Link to="/dashboard" className="link-padrao">
                    Voltar
                </Link>
                <Link to="/nova-categoria">
                    <button className="btn-primary">Nova Categoria</button>
                </Link>
            </div>
            {categorias.map((categoria, index) => (
                <ItemListaCategorias key={index} categoria={categoria}/>
            ))}
        </div>
    )
}
export default ListaCategorias
