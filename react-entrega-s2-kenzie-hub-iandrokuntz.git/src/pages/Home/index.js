import { Redirect, useHistory } from "react-router";
import "./style.css"

const Home = ({ auth }) => {
  const history = useHistory();

  if (auth) {
    return <Redirect to="/dashboard" />;
  }
return (
    <div className="home">
      <div className="homeBorder">
      <div className="logo">
        <h1 className="h1HOME">Kenzie<p className="h1HUB">HUB</p></h1>
      </div>
        <button onClick={() => history.push("/signup")}>Register</button>
        <h3>It is already registered?</h3>
        <button onClick={() => history.push("/login")}>Login</button>
        </div>
    </div>

    )
}

export default Home