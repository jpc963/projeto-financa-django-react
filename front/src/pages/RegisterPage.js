import React, { useContext, useEffect } from "react"
import RegisterContext from "../context/RegisterContext"
import AuthContext from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
	let navigate = useNavigate()
	let { userRegister } = useContext(RegisterContext)
	let { user } = useContext(AuthContext)

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
							<label htmlFor="usuario">Usuário</label>
							<input type="text" name="usuario" id="usuario" placeholder="Digite seu usuário" />
						</div>
						<div className="campo-form">
							<label htmlFor="senha">Senha</label>
							<input type="password" name="senha" id="senha" placeholder="Digite sua senha" />
						</div>
						<div className="campo-form">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" placeholder="Digite seu email" />
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
