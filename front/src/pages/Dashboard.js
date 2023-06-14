import React from "react"

import TransacoesRecentes from "../components/transacoes/TransacoesRecentes"
import CategoriasMaioresGastos from "../components/categorias/CategoriasMaioresGastos"

const Dashboard = () => {
	return (
		<div>
			<section className="section-main">
				<div className="lista-index">
					<TransacoesRecentes />
				</div>
				<div className="lista-index">
					<CategoriasMaioresGastos />
				</div>
			</section>
		</div>
	)
}

export default Dashboard
