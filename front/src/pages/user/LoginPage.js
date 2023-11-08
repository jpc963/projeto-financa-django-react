import React, { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

const LoginPage = () => {
    let navigate = useNavigate()
    let { loginUser, user, erroLogin } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="formulario col-10 col-md-8 col-lg-6 col-xxl-5 shadow-sm">
                <div className="dashboard-stats-title pt-4 pb-3">
                    <h2 className="text-center">Login</h2>
                </div>
                <div className="dashboard-stats-info">
                    <form onSubmit={loginUser}>
                        <div className="d-flex flex-column">
                            <label
                                htmlFor="username"
                                className="fs-5"
                            >
                                Usuário
                            </label>
                            <input
                                className="p-2 rounded bg-white"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Digite seu usuário"
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label
                                htmlFor="password"
                                className="fs-5"
                            >
                                Senha
                            </label>
                            <input
                                className="p-2 rounded bg-white"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Digite sua senha"
                            />
                        </div>
                        {erroLogin !== null && (
                            <div className="campo-form">
                                <p className="error">{erroLogin}</p>
                            </div>
                        )}
                        <div className="d-flex flex-column flex-lg-row align-items-center p-0">
                            <div className="text-center col-12 col-lg-7 order-2 order-lg-0 formulario-link">
                                <Link
                                    to="/registro"
                                    className="link-dark"
                                >
                                    Não possui uma conta?{" "}
                                    <span className="text-decoration-underline">
                                        Registrar
                                    </span>
                                </Link>
                            </div>
                            <div className="col-12 col-lg justify-content-end d-flex">
                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
