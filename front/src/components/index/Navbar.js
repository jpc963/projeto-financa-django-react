import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import Offcanvas from "react-bootstrap/Offcanvas"

const Navbar = () => {
    let {user, logoutUser} = useContext(AuthContext)
    let [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <header>
            <div className="d-flex justify-content-around align-items-center h-100">
                <div className="d-flex gap-4 align-items-center">
                    {user &&
                        <div>
                            <i onClick={handleShow} className="bi bi-list text-white fs-2"/>
                            <Offcanvas className='navbar-offcanvas' show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title><span className='fs-2 fw-medium'>Finance</span></Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <div className="d-flex flex-column gap-4">
                                        <Link to="/dashboard" className="text-white">
                                            Olá, {user.username}
                                        </Link>
                                        <Link to="/transacoes" className="text-white">
                                            Transações
                                        </Link>
                                        <Link to="#" className="text-white">
                                            Estatísticas
                                        </Link>
                                        <Link to="/categorias" className="text-white">
                                            Categorias
                                        </Link>
                                        <Link className="text-white" onClick={logoutUser} to="/login">
                                            Sair
                                        </Link>
                                    </div>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>
                    }
                    <Link to={user ? "/dashboard" : "/"} className="text-white fs-2">
                        <span>Finance</span>
                    </Link>
                </div>
                {user && (
                    <div className="d-none d-lg-flex gap-4">
                        <Link to="/dashboard" className="text-white">
                            Olá, {user.username}
                        </Link>
                        <Link to="/transacoes" className="text-white">
                            Transações
                        </Link>
                        <Link to="#" className="text-white">
                            Estatísticas
                        </Link>
                        <Link to="/categorias" className="text-white">
                            Categorias
                        </Link>
                    </div>
                )}
                {user ? (
                    <div className="d-flex gap-4 navbar-buttons align-items-center">
                        <Link to="/nova-transacao">
                            <button className="btn-primary text-white">Nova Transação</button>
                        </Link>
                        <Link className="text-white" onClick={logoutUser} to="/login">
                            Sair
                        </Link>
                    </div>
                ) : (
                    <div className="d-flex gap-4 navbar-buttons align-items-center">
                        <Link to="/registro">
                            <button className="btn-primary text-white">Cadastro</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn-primary text-white">Login</button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
