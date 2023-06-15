import React, {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const RegisterPage = () => {
    let navigate = useNavigate()
    let {user} = useContext(AuthContext)
    const [usuario, setUsuario] = useState({})
    const [erroLogin, setErroLogin] = useState('')
    const [erroSenha, setErroSenha] = useState('')
    const [erroEmail, setErroEmail] = useState('')
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
            setErroLogin('')
            setErroSenha('')
            setErroEmail('')

            let response = await fetch('api/register', {
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
        <div>
            <div className="novo-registro">
                <h2>Cadastro</h2>
                <div className="form-inputs">
                    <form onSubmit={userRegister}>
                        <div className="campo-form">
                            <label htmlFor="username">Usuário</label>
                            <input className={!erroLogin ? '' : 'error'} maxLength="16" type="text" name="username" id="username" placeholder="Digite seu usuário"
                                   onChange={(e) => (
                                       setUsuario({...usuario, username: e.target.value})
                                   )}/>
                            {erroLogin && <p>{erroLogin}</p>}
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Senha</label>
                            <input className={!erroSenha ? '' : 'error'} maxLength="16" type="password" name="password" id="password" placeholder="Digite sua senha"
                                   onChange={(e) => (
                                       setUsuario({...usuario, password: e.target.value})
                                   )}/>
                            {erroSenha && <p>{erroSenha}</p>}
                        </div>
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input className={!erroEmail ? '' : 'error'} maxLength="40" type="email" name="email" id="email" placeholder="Digite seu email"
                                   onChange={(e) => (
                                       setUsuario({...usuario, email: e.target.value})
                                   )}/>
                            {erroEmail && <p>{erroEmail}</p>}
                        </div>
                        <div className="botoes-confirma-volta">
                            <Link to="/" className="link-padrao">
                                Voltar
                            </Link>
                            <button type="submit" className="btn-primary">
                                Concluído
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
