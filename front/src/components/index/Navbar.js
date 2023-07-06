import React, {useContext} from "react"
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import IconeHamburguer from "../icones/IconeHamburguer"

const Navbar = () => {
    let {user, logoutUser} = useContext(AuthContext)

    return (
        <header>
            <div className="d-flex justify-content-around align-items-center h-100">
                <div className="d-flex gap-4 align-items-center">
                    {user && <IconeHamburguer/>}
                    <Link to={user ? "/dashboard" : "/"} className="text-white fs-2">
                        <span>Finance</span>
                    </Link>
                </div>
                {user && (
                    <div className="d-none d-lg-flex gap-5">
                        <Link to="/dashboard" className="text-white">
                            Home
                        </Link>
                        <Link to="/transacoes" className="text-white">
                            Transações
                        </Link>
                        <Link to="/categorias" className="text-white">
                            Categorias
                        </Link>
                    </div>
                )}
                {user ? (
                    <div className="d-flex gap-4 navbar-buttons align-items-center">
                        <Link to="/nova-transacao" className='d-none d-md-block'>
                            <button className="btn-primary">Nova Transação</button>
                        </Link>
                        <Link className="text-white" onClick={logoutUser} to="/login">
                            Sair
                        </Link>
                    </div>
                ) : (
                    <div className="d-flex gap-4 navbar-buttons align-items-center">
                        <Link to="/registro">
                            <button className="btn-primary">Cadastro</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn-primary">Login</button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
