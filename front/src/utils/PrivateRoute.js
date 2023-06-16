import React, {useContext} from "react"
import {Routes, Route} from "react-router-dom"
import AuthContext from "../context/AuthContext"

import Transacoes from "../pages/transacao/Transacoes"
import NovaTransacao from "../components/transacoes/NovaTransacao"
import Categorias from "../pages/categoria/Categorias"
import NovaCategoria from "../components/categorias/NovaCategoria"
import Dashboard from "../pages/user/Dashboard"
import EditarTransacao from "../pages/transacao/EditarTransacao"
import TransacoesCategoria from "../components/categorias/TransacoesCategoria"

const PrivateRoute = ({redirectPath = "/login/", children}) => {
    let {user} = useContext(AuthContext)

    if (!user) {
        return (
            <Routes>
                <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="transacoes" element={<Transacoes/>}/>
            <Route path="nova-transacao" element={<NovaTransacao/>}/>
            <Route path="transacao/:id/editar" element={<EditarTransacao/>}/>
            <Route path="categorias" element={<Categorias/>}/>
            <Route path="nova-categoria" element={<NovaCategoria/>}/>
            <Route path="categoria/:nome" element={<TransacoesCategoria/>}/>
            <Route path="*" element={<h1>Not Found</h1>}/>
        </Routes>
    )
}

export default PrivateRoute
