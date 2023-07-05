import React, {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const RegisterPage = () => {
    let navigate = useNavigate()
    let {user} = useContext(AuthContext)
    const [usuario, setUsuario] = useState({})
    const [erroLogin, setErroLogin] = useState("")
    const [erroSenha, setErroSenha] = useState("")
    const [erroEmail, setErroEmail] = useState("")
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

    let userRegister = async (e) => {
        e.preventDefault()
        if (usuario.username === undefined) {
            setErroLogin("Campo obrigatório")
        } else if (usuario.password === undefined) {
            setErroSenha("Campo obrigatório")
        } else if (usuario.email === undefined) {
            setErroEmail("Campo obrigatório")
        } else if (!usernameRegex.test(usuario.username)) {
            setErroLogin("Apenas letras e números")
        } else if (usuario.username.length < 3) {
            setErroLogin("Mínimo de 3 caracteres")
        } else if (usuario.username.length > 16) {
            setErroLogin("Máximo de 16 caracteres")
        } else if (usuario.password.length < 6) {
            setErroSenha("Mínimo de 6 caracteres")
        } else if (usuario.password.length > 16) {
            setErroSenha("Máximo de 16 caracteres")
        } else if (usuario.email.length < 5) {
            setErroEmail("Mínimo de 5 caracteres")
        } else if (usuario.email.length > 40) {
            setErroEmail("Máximo de 40 caracteres")
        } else if (!emailRegex.test(usuario.email)) {
            setErroEmail("Email inválido")
        } else {
            setErroLogin("")
            setErroSenha("")
            setErroEmail("")

            let response = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario)
            })
            let data = await response.json()
            if (data.error === "Usuário já existe") {
                setErroLogin("Nome de usuário já existe")
            } else if (data.error === "Email já existe") {
                setErroEmail("Email já existe")
            } else if (response.status === 200) {
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user, navigate])

    return (
        <div className="d-flex justify-content-center">
            <div className="formulario col-10 col-md-8 col-lg-6 col-xxl-5 shadow-sm">
                <div className="dashboard-stats-title pt-4 pb-3">
                    <h2 className="text-center text-white">Registro</h2>
                </div>
                <div className="dashboard-stats-info">
                    <form onSubmit={userRegister}>
                        <div className="d-flex flex-column">
                            <label htmlFor="username" className="fs-5">Usuário</label>
                            <input className="p-2 rounded bg-white"
                                   maxLength="16" type="text" name="username" id="username" placeholder="Nome de usuário"
                                   onChange={(e) => (
                                       setUsuario({...usuario, username: e.target.value})
                                   )}/>
                            {erroLogin && <p className="error">{erroLogin}</p>}
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="password" className="fs-5">Senha</label>
                            <input className="p-2 rounded bg-white"
                                   maxLength="16" type="password" name="password" id="password" placeholder="Digite sua senha"
                                   onChange={(e) => (
                                       setUsuario({...usuario, password: e.target.value})
                                   )}/>
                            {erroSenha && <p className="error">{erroSenha}</p>}
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="email" className="fs-5">Email</label>
                            <input className="p-2 rounded bg-white"
                                   maxLength="40" type="email" name="email" id="email" placeholder="Digite seu email"
                                   onChange={(e) => (
                                       setUsuario({...usuario, email: e.target.value})
                                   )}/>
                            {erroEmail && <p className="error">{erroEmail}</p>}
                        </div>
                        <div className="d-flex flex-column flex-lg-row align-items-center p-0">
                            <div className="text-center col-12 col-lg-7 order-2 order-lg-0 formulario-link">
                                <Link to="/login" className="link-dark">
                                    Já possui uma conta? <span className="text-decoration-underline">Entrar</span>
                                </Link>
                            </div>
                            <div className="col-12 col-lg justify-content-end d-flex">
                                <button type="submit" className="btn-primary">
                                    Concluído
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
