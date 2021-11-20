import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard";
import FormLogin from "../pages/FormLogin";
import FormRegister from "../pages/FormRegister";
import Home from "../pages/Home";

const Routes = () => {

    const [userData] = useState(() => JSON.parse(localStorage.getItem("@KenzieHub:user")) || "")
    const [auth, setAuth] = useState(false)

  useEffect(() => {const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))

    if (token) {
      
        setAuth(true)
    }
  },[])

  return (
    <Switch>
      <Route exact path="/">
        <Home auth={auth}/>
      </Route>
      <Route path="/signup">
        <FormRegister auth={auth}/>
      </Route>
      <Route path="/login">
        <FormLogin auth={auth} setAuth={setAuth}/>
      </Route>
      <Route path="/dashboard">
        <Dashboard auth={auth} setAuth={setAuth} userData={userData}/>
      </Route>
    </Switch>
  );
};

export default Routes;