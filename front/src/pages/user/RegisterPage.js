import React, {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const RegisterPage = () => {
    let navigate = useNavigate()
    let [usuario, setUsuario] = useState({})
    let [msg, setMsg] = useState(null)
    let [msg2, setMsg2] = useState(null)
    let [msg3, setMsg3] = useState(null)
    let {user} = useContext(AuthContext)

    let userRegister = async (e) => {
        e.preventDefault()
        let response = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({usuario}),
        })

        if (response.status === 200) {
            navigate("/login")
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        setMsg(null)
        setMsg2(null)
        setMsg2(null)
        if (!usuario.username.match(/^[a-zA-Z0-9]+$/)) {
            setMsg("O nome de usuário deve conter apenas letras e números")
        } else if (usuario.username.length < 3) {
            setMsg("O nome de usuário deve conter no mínimo 3 caracteres")
        } else if (usuario.username.length > 16) {
            setMsg("O nome de usuário deve conter no máximo 16 caracteres")
        } else if (usuario.password.length < 6) {
            setMsg2("A senha deve conter no mínimo 6 caracteres")
        } else if (usuario.password.length > 16) {
            setMsg2("A senha deve conter no máximo 16 caracteres")
        } else if (usuario.email.length < 5) {
            setMsg3("O email deve conter no mínimo 5 caracteres")
        } else if (usuario.email.length > 25) {
            setMsg3("O email deve conter no máximo 25 caracteres")
        } else if (!usuario.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
            setMsg3("O email é inválido")
        } else {
            userRegister()
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
                    <form onSubmit={handleSubmit}>
                        <div className="campo-form">
                            <label htmlFor="username">Usuário</label>
                            <input className={!msg ? '' : 'error'} maxLength="16" type="text" name="username" id="username" placeholder="Digite seu usuário" onChange={(e) => (
                                setUsuario({...usuario, 'username': e.target.value})
                            )}/>
                            {msg && <p>{msg}</p>}
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Senha</label>
                            <input className={!msg2 ? '' : 'error'} maxLength="16" type="password" name="password" id="password" placeholder="Digite sua senha" onChange={(e) => (
                                setUsuario({...usuario, 'password': e.target.value})
                            )}/>
                            {msg2 && <p>{msg2}</p>}
                        </div>
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input className={!msg3 ? '' : 'error'} maxLength="25" type="email" name="email" id="email" placeholder="Digite seu email" onChange={(e) => (
                                setUsuario({...usuario, 'email': e.target.value})
                            )}/>
                            {msg3 && <p>{msg3}</p>}
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
