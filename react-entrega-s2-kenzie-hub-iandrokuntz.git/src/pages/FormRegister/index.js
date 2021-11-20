import { Redirect, useHistory } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../services"
import "./style.css"

const FormRegister = ({ auth }) => {

  const history = useHistory()

  const formSchema = yup.object().shape({

    name: yup.string().required("Name Required"),
    email: yup.string().email("Invalid Email").required("Email Required"),
    password: yup.string().required("Password Required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string().required("Password Required").oneOf([yup.ref("password"), null], "Passwords do not match"),
    bio: yup.string().required("Bio Required"),
    contact: yup.string().required("Contact Required"),
    course_module: yup.string().required("Course Module Required"),

  })

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(formSchema),
  })


  const sendData = ({ name, email, password, bio, contact, course_module }) => {

        const user = { name, email, password, bio, contact, course_module }
        
        api.post("/users", user).then((_) => {

        toast.success("Register Success")
        return history.push("/login")
      })
      .catch((err) => toast.error(`${err}`))
  }

  if (auth) {
    return <Redirect to="/dashboard"/>
  }

  return(
      <div className="formRegister">
          <h1>REGISTER</h1>
          <form onSubmit={handleSubmit(sendData)} className="form">
            <input type="text" placeholder="Complete Name" {...register("name")}/>
                <span>{errors.name?.message}</span>
            <input type="email" placeholder="Email"{...register("email")}/>
                <span>{errors.email?.message}</span>
            <input type="password" placeholder="Password" {...register("password")}/>
                <span>{errors.password?.message}</span>
            <input type="password" placeholder="Password" {...register("confirmPassword")}/>
                <span>{errors.confirmPassword?.message}</span>
            <textarea type="bio" placeholder="When did your story with programming begin?" {...register("bio")}/>
                <span>{errors.bio?.message}</span>
            <input type="mobile" placeholder="Enter your contact phone number" {...register("contact")}/>
                <span>{errors.contact?.message}</span>
                <label>
                    <select {...register("course_module")}>
                        <option disabled selected value="">
                            Select your course module
                        </option>
                        <option value={"First module (Introduction to Frontend)"}>
                            First module (Introduction to Frontend)
                        </option>
                        <option value={"Second module (Advanced Front)"}>
                            Second module (Advanced Front)
                        </option>
                        <option value="Third module (Introduction to the Backend)">
                            Third module (Introduction to the Backend)
                        </option>
                        <option value="Fourth module (Advanced Backend)">
                            Fourth module (Advanced Backend)
                        </option>
                    </select>
                </label>
          <span>{errors.course_module?.message}</span>
          <button type="submit" >Register</button>
          </form>
          <button className="Login"onClick={() => history.push("/login")}>Login</button>
          <button className="goHome" onClick={() => history.push("/")}>Go Home</button>
      </div>
    )
  }
  export default FormRegister