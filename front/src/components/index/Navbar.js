import React, {useContext} from "react"
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const Navbar = () => {
    let {user, logoutUser} = useContext(AuthContext)

    return (
        <header>
            <div className="navbar">
                <div className="navbar-brand">
                    <Link to={user ? "/dashboard" : "/"} className="link-padrao">
                        <span>Finance</span>
                    </Link>
                </div>
                <div className="navbar-items">
                    {user && (
                        <div>
                            <Link to="/dashboard" className="link-padrao">
                                <span>Olá, {user.username}</span>
                            </Link>
                            <Link to="/transacoes" className="link-padrao">
                                <span>Transações</span>
                            </Link>
                            <Link to="#" className="link-padrao">
                                <span>Estatísticas</span>
                            </Link>
                            <Link to="/categorias" className="link-padrao">
                                <span>Categorias</span>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="navbar-btn">
                    {user ? (
                        <div>
                            <Link to="/nova-transacao">
                                <button className="btn-primary">Nova Transação</button>
                            </Link>
                            <Link onClick={logoutUser} to="/" className="link-padrao">
                                Sair
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/registro">
                                <button className="btn-primary">Cadastro</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn-primary">Login</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
