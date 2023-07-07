import {useState, useContext, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

const schema = z.object({
    nome: z.string()
        .nonempty("O nome é obrigatório")
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(20, "O nome não pode ter mais de 20 caracteres")
        .regex(/^[a-zA-Z]{3,}( ?[a-zA-Z]+){1,20}$/, "Nome inválido")
})

type FormData = z.infer<typeof schema>

const NovaCategoria = () => {
    let navigate = useNavigate()
    let {user, authTokens} = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        mode: "onBlur",
        resolver: zodResolver(schema)
    })

    let criarCategoria = async (data: FormData) => {
        await fetch("api/nova-categoria", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
            body: JSON.stringify(data),
        })
        navigate("/categorias")
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
                    <h3 className="text-center text-white">Nova categoria</h3>
                </div>
                <form onSubmit={handleSubmit(criarCategoria)}>
                    <div className="dashboard-stats-info">
                        <div className="d-flex flex-column">
                            <label htmlFor="descricao" className="fs-5">Nome</label>
                            <input className="p-2 rounded bg-white"
                                   type="text" name="nome" id="nome" placeholder="(Max. 20 caracteres)"
                                   {...register("nome")}/>
                            {errors.nome && <p className="text-danger">{errors.nome.message}</p>}
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

export default NovaCategoria
