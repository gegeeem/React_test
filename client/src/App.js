import { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import HomePage from "./components/Pages/HomePage/HomePage";
import "../src/App.css";
let i = 0;

function App() {
  const [loged, setLoged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // console.log("loged: ", loged);
  // console.log("errorMessage: ", errorMessage);
  console.log("API FJA POZvana");
  const valueOfTokenInLocal = localStorage.getItem("token");

  useEffect(() => {
    if (valueOfTokenInLocal) {
      setLoged(valueOfTokenInLocal);
    }
  }, [loged]);
  if (valueOfTokenInLocal) {
    return (
      <div className="main">
        <HomePage isLoged={loged} logedFunc={(e) => setLoged(e)} />
      </div>
    );
  }

  return (
    <div className="main">
      <div>{errorMessage}</div>
      <LoginPage
        logedFunc={(e) => setLoged(e)}
        errorFunc={(e) => setErrorMessage(e)}
      />
    </div>
  );
}

export default App;
