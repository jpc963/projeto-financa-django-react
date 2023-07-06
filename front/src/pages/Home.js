import React from "react"
import Dashboard from "./user/Dashboard"
import MainBannerImg from "../assets/imgs/main-banner-img.png"

const Home = () => {
    if (localStorage.getItem("authTokens") === null) {
        return (
            <section className="main-banner d-flex justify-content-center align-items-center gap-5">
                <div className="text-white text-wrap col-3">
                    <p className="fs-1 fw-bold">Assuma o controle de suas finanças de forma definitiva</p>
                    <p className="fw-semibold">Cuidar do seu dinheiro pode ser simples. Com o Finance, você organiza e planeja sua vida financeira em um único lugar.</p>
                </div>
                <div>
                    <img src={MainBannerImg} alt="Main Banner"/>
                </div>
            </section>
        )
    } else {
        return <Dashboard/>
    }
}

export default Home
