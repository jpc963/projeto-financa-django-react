import React, {useEffect, useState, useContext} from "react"
import AuthContext from "../../context/AuthContext"
import {Link} from "react-router-dom"

const CategoriasMaioresGastos = () => {
    let {authTokens} = useContext(AuthContext)
    let [categorias, setCategorias] = useState([])

    let getCategorias = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/categorias", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        })
        let data = await response.json()

        data.sort((a, b) => b.valor_total - a.valor_total)
        data = data.slice(0, 4)
        setCategorias(data)
    }

    useEffect(() => {
        getCategorias()
    }, [])

    return (
        <div className="dashboard-stats shadow-sm">
            <div className="dashboard-stats-title pt-4 pb-3">
                <h2 className="text-center fs-3">Maiores gastos</h2>
            </div>
            <div className="dashboard-stats-info">
                {categorias.map((categoria, index) => (
                    <div className="border-bottom py-2">
                        <div className="d-flex justify-content-around" key={index}>
                            <div className="d-flex flex-column align-center py-3">
                                <span className="fw-medium fs-4">{categoria.nome}</span>
                            </div>
                            <div className="d-flex">
                                <span className="align-self-center">R$ {categoria.valor_total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-around py-4">
                    <span>Total de categorias: {categorias.length}</span>
                    <Link to="/categorias" className="text-black text-decoration-underline">
                        Mais
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CategoriasMaioresGastos
