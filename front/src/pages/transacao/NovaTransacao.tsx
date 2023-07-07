import {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

const schema = z.object({
    descricao: z.string()
        .nonempty("A descrição não pode ficar vazia")
        .min(3, "A descrição deve ter no mínimo 3 caracteres")
        .max(100, "A descrição não pode ter mais de 100 caracteres")
        .regex(/^[a-zA-Z0-9]{3,}( ?[a-zA-Z0-9]+){1,100}$/, "Descrição inválida"),
    valor: z.coerce.number()
        .min(0.01, "Valor inválido")
        .max(999999.99, "Valor inválido")
        .positive("Valor não pode ser negativo"),
    categoria: z.string()
        .nonempty("A categoria não pode ficar vazia")
        .min(3, "A categoria deve ter no mínimo 3 caracteres")
        .max(20, "A categoria não pode ter mais de 20 caracteres")
        .regex(/^[a-zA-Z0-9]{3,}( ?[a-zA-Z0-9]+){1,20}$/, "Categoria inválida"),
})

type FormData = z.infer<typeof schema>

const NovaTransacao = () => {
    let navigate = useNavigate()
    let {authTokens, user} = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        mode: "onBlur",
        resolver: zodResolver(schema)
    })

    let novaTransacao = async (data: FormData) => {
        await fetch("api/nova-transacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
            body: JSON.stringify(data),
        })
        navigate("/transacoes")
    }

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    return (
        <div className="d-flex justify-content-center">
            <div className="formulario col-10 col-md-8 col-lg-6 col-xxl-5 shadow-sm">
                <div className="dashboard-stats-title pt-4 pb-3">
                    <h3 className="text-center text-white">Novo gasto</h3>
                </div>
                <form onSubmit={handleSubmit(novaTransacao)}>
                    <div className="dashboard-stats-info">
                        <div className="d-flex flex-column">
                            <label htmlFor="descricao" className="fs-5">Descrição</label>
                            <input className="p-2 rounded bg-white"
                                   type="text" name="descricao" id="descricao" placeholder="(Max. 100 caracteres)"
                                   {...register("descricao")}/>
                            {errors.descricao && <p className="text-danger">{errors.descricao.message}</p>}
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="valor" className="fs-5">Valor</label>
                            <input className="p-2 rounded bg-white"
                                   type="text" name="valor" id="valor" placeholder="R$"
                                   {...register("valor")}/>
                            {errors.valor && <p className="text-danger">{errors.valor.message}</p>}
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="categoria" className="fs-5">Categoria</label>
                            <input className="p-2 rounded bg-white"
                                   type="text" name="categoria" id="categoria" placeholder="Lazer, Essencial..."
                                   {...register("categoria")}/>
                            {errors.categoria && <p className="text-danger">{errors.categoria.message}</p>}
                        </div>
                        <div className="d-flex flex-column flex-lg-row align-items-center p-0">
                            <div className="text-center col-12 col-lg-7 order-2 order-lg-0 formulario-link">
                                <Link to="/registro" className="link-dark">
                                    Cancelar
                                </Link>
                            </div>
                            <div className="col-12 col-lg">
                                <button type="submit" className="btn-primary">
                                    Concluído
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NovaTransacao
