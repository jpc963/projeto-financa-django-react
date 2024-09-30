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
        let response = await fetch("http://127.0.0.1:8000/api/categorias", {
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
        <div className="d-flex justify-content-center pt-5">
            <div className="flex-column col-11 col-md-6">
                <div className="text-center dashboard-stats-title pt-4 pb-3">
                    <h2 className="fs-2">Categorias</h2>
                </div>
                <div className="dashboard-stats-info">
                    {categorias.map((categoria, index) => (
                        <ItemListaCategorias key={index} categoria={categoria}/>
                    ))}
                    <div className="d-flex justify-content-center py-4">
                        <Link to="/nova-categoria" className='text-dark'>
                            Nova Categoria
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListaCategorias
