import React, {useContext, useEffect} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

const LoginPage = () => {
    let navigate = useNavigate()
    let {loginUser, user, erroLogin, authTokens} = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [])

    return (
        <div>
            <div className="novo-registro">
                <h2>Login</h2>
                <div className="form-inputs">
                    <form onSubmit={loginUser}>
                        <div className="campo-form">
                            <label htmlFor="username">Usuário</label>
                            <input type="text" name="username" id="username" placeholder="Digite seu usuário"/>
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Senha</label>
                            <input type="password" name="password" id="password" placeholder="Digite sua senha"/>
                        </div>
                        {erroLogin !== null &&
                            <div className="campo-form">
                                <p className="error">{erroLogin}</p>
                            </div>
                        }
                        <div className="botoes-confirma-volta">
                            <Link to="/" className="link-padrao">
                                Voltar
                            </Link>
                            <button type="submit" className="btn-primary">
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
