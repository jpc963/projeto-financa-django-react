import React from "react"

import TransacoesRecentes from "../../components/transacoes/TransacoesRecentes"
import CategoriasMaioresGastos from "../../components/categorias/CategoriasMaioresGastos"

const Dashboard = () => {
    return (
        <div className="dashboard-user">
            <section className="container d-lg-flex flex-lg-row gap-4 justify-content-center">
                <div className="col-12 col-lg-6 mb-5">
                    <TransacoesRecentes/>
                </div>
                <div className="col-12 col-lg-6 mb-5">
                    <CategoriasMaioresGastos/>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
