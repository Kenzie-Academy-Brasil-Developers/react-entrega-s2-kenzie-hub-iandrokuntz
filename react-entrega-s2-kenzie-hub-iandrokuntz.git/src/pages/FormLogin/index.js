import { Redirect, useHistory } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services";
import { toast } from "react-toastify";
import { useEffect } from "react";
import "./style.css"

const FormLogin = ({ auth, setAuth}) => {
    
  const history = useHistory()
  
  const formSchema = yup.object().shape({

    email: yup.string().email("Invalid Email").required("Email Required"),
    password: yup.string().required("Password Required").min(6, "Password must be at least 6 characters"),
  
  })

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(formSchema),
  })

  const callApi = (data) => {

    api.post("/sessions", data).then((response) => {
        const { token, user } = response.data

        
        localStorage.setItem("@KenzieHub:token", JSON.stringify(token))
        localStorage.setItem("@KenzieHub:user", JSON.stringify(user))
        
        setAuth(true)

        history.push("/dashboard")

      })
      .catch((err) => toast.error("Invalid email or password"))
  
  }

  const handleLogin = (data) => {

    callApi(data)

  }

  useEffect(() => {

    if (auth) {
        return <Redirect to="/dashboard" />
      }

  },[auth])

  return(
    <div className="formLogin">
      <h1 className="h1Login">LOGIN</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="loginForm">
            <input type="email" placeholder="Email" {...register("email")} required/>
                <span>{errors.email?.message}</span>
            <input type="password" placeholder="Password" {...register("password")} required/>
                <span>{errors.password?.message}</span>
            <button type="submit">Login</button>
        </form>
            <button className="goHome" onClick={() => history.push("/")}>Go Home</button>
    </div>

  )
}

export default FormLogin