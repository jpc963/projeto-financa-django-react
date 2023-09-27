import React from "react"
import Dashboard from "./user/Dashboard"

const Home = () => {
	if (localStorage.getItem("authTokens") === null) {
		return (
			<section className="main-banner d-flex justify-content-center align-items-center gap-5">
				<div className="text-white text-wrap col-12 col-md-8 my-5 text-center">
					<p className="fs-2 md-fs-1 fw-bold">
						Assuma o controle de suas finanças de forma definitiva
					</p>
					<p className="fw-semibold">
						Cuidar do seu dinheiro pode ser simples. Com o Finance, você
						organiza e planeja sua vida financeira em um único lugar.
					</p>
				</div>
			</section>
		)
	} else {
		return <Dashboard />
	}
}

export default Home
