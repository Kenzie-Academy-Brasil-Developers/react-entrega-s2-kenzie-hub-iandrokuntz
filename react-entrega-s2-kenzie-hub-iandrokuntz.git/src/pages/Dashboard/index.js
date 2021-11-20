import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";
import api from "../../services";
import "./style.css"

const Dashboard = ({ auth, setAuth, userData }) => {

  const history = useHistory()
  const { register, handleSubmit } = useForm()

  const [token] = useState(JSON.parse(localStorage.getItem("@KenzieHub:token")) || "")
  const [tech, setTech] = useState(userData.techs)

  
  
  const loadTechs = () => {
  
      api.get(`users/${userData.id}`,
  
      {
  
      headers: {
        Authorization: `Bearer ${token}`,
      },
        }
      ).then((response) => {
          setTech(response.data.techs)
      }).catch((err) => toast.error("Requisition Fail"))
      
      
  } 
  useEffect(() => {

    loadTechs()
    
})
  const deleteTech = (tech_id) => {
    api.delete(`users/techs/${tech_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((_) => {

        toast.success("Deleted Technology")
      })

    setTech(tech.filter((tech) => tech.id !== tech_id))

  }

  const postTech = ({ title, status }) => {

    if (!title || !status) {

      return toast.error("fill in all fields")
    }
    api.post("users/techs",
        {
          title: title,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        console.log(response)
        loadTechs()
      })

      .catch((err) => toast.error("Have you already added this technology"))
  }

  if (!auth) {
    return <Redirect to="/" />
  }

  const Logout = () => {

    localStorage.clear()
    setAuth(false)
    history.push("/")

  }

  

        console.log(tech)
  return(
      <div className="Dash">
          <h2>Welcome, <span>{userData.name}</span>!</h2>
          <h3>Module: <span>{userData.course_module}</span></h3>
          <h1 className="h1Dash">My Technologies</h1>
          <form onSubmit={handleSubmit(postTech)} className="formDash">
            <input {...register("title")} type="text" placeholder="Enter the desired Technology"/>
            <select {...register("status")}>
                <option disabled selected defaultChecked value="">Choose skill status</option>
                <option value={"Beginner"}>Beginner</option>
                <option value={"Intermediary"}>Intermediary</option>
                <option value={"Advanced"}>Advanced</option>
            </select>
            <button type="submit">Register Technology</button>
        </form>
        <ul>
        {tech?.map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>Status: {item.status}</p>
              <button onClick={() => deleteTech(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button className="Logout"onClick={Logout}>Logout</button>
      </div>
      
  )
}

export default Dashboard