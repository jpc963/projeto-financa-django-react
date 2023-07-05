import Offcanvas from "react-bootstrap/Offcanvas"
import {Link} from "react-router-dom"
import React, {useState} from "react"

const IconeHamburguer = () => {
    let [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div className="d-lg-none">
            <i onClick={handleShow} className="bi bi-list text-white fs-2"/>
            <Offcanvas className="navbar-offcanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><span className="fs-2 fw-medium">Finance</span></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex flex-column gap-4">
                        <Link to="/dashboard">
                            Home
                        </Link>
                        <Link to="/nova-transacao">
                            Nova Transação
                        </Link>
                        <Link to="/transacoes">
                            Transações
                        </Link>
                        <Link to="/categorias">
                            Categorias
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default IconeHamburguer