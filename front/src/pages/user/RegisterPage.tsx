import {useContext, useEffect} from "react"
import AuthContext from "../../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const schema = z.object({
    username: z.string()
        .nonempty("O nome de usuário é obrigatório")
        .min(5, "O nome de usuário deve ter mais de 5 caracteres")
        .max(16, "O nome de usuário pode ter no máximo 16 caracteres")
        .regex(/^[a-zA-Z0-9]+$/, "O nome de usuário deve conter apenas letras e números")
        .toLowerCase()
        .refine((username) => {
            return username !== "admin"
        }, "O nome de usuário não pode ser 'admin'"),
    email: z.string()
        .nonempty("O email é obrigatório")
        .email("Formato de email inválido")
        .max(50, "O email pode ter no máximo 50 caracteres")
        .toLowerCase(),
    password: z.string()
        .nonempty("A senha é obrigatória")
        .min(6, "A senha deve ter mais de 6 caracteres")
        .max(16, "A senha deve ter no máximo 16 caracteres")
        .regex(/^[a-zA-Z0-9]+$/, "A senha deve conter apenas letras e números"),
    password2: z.string()
        .nonempty("A confirmação de senha é obrigatória")
        .min(6, "A confirmação de senha deve ter mais de 6 caracteres")
        .max(16, "A confirmação de senha deve ter no máximo 16 caracteres")
        .regex(/^[a-zA-Z0-9]+$/, "A confirmação de senha deve conter apenas letras e números")
})

type FormData = z.infer<typeof schema>

const RegisterPage = () => {
    let navigate = useNavigate()
    let {user} = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        mode: "onBlur",
        resolver: zodResolver(schema)
    })

    let userRegister = async (userData: FormData) => {
        let response = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        let data = await response.json()
        if (data.error) {
            alert(data.error)
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="formulario col-10 col-md-8 col-lg-6 col-xxl-5 shadow-sm">
                <div className="dashboard-stats-title pt-4 pb-3">
                    <h2 className="text-center text-white">Registro</h2>
                </div>
                <div className="dashboard-stats-info">
                    <form onSubmit={handleSubmit(userRegister)}>
                        <div className="d-flex flex-column">
                            <label htmlFor="username" className="fs-5">Usuário</label>
                            <input className="p-2 rounded bg-white"
                                   type="text" name="username" id="username" placeholder="Nome de usuário" {...register("username")}/>
                            {errors.username && <span className="text-danger">{errors.username.message}</span>}
                        </div>
                        <div className="d-flex flex-column flex-md-row gap-md-4">
                            <div className="d-flex flex-column px-0 pt-0 p-md-0 h-100 w-100">
                                <label htmlFor="password" className="fs-5">Senha</label>
                                <input className="p-2 rounded bg-white"
                                       type="password" name="password" id="password" placeholder="Digite sua senha" {...register("password")}/>
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </div>
                            <div className="d-flex flex-column px-0 pb-0 p-md-0 h-100 w-100">
                                <label htmlFor="password2" className="fs-5">Confirmar senha</label>
                                <input className="p-2 rounded bg-white"
                                       type="password" name="password2" id="password2" placeholder="Repita sua senha" {...register("password2")}/>
                                {errors.password2 && <span className="text-danger">{errors.password2.message}</span>}
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="email" className="fs-5">Email</label>
                            <input className="p-2 rounded bg-white"
                                   type="email" name="email" id="email" placeholder="Digite seu email" {...register("email")}/>
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="d-flex flex-column flex-lg-row align-items-center p-0">
                            <div className="text-center col-12 col-lg-7 order-2 order-lg-0 formulario-link">
                                <Link to="/login" className="link-dark">
                                    Já possui uma conta? <span className="text-decoration-underline">Entrar</span>
                                </Link>
                            </div>
                            <div className="col-12 col-lg justify-content-end d-flex">
                                <button type="submit" className="btn-primary">
                                    Concluído
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
