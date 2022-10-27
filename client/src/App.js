import { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import HomePage from "./components/Pages/HomePage/HomePage";

function App() {
  const [loged, setLoged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("loged: ", loged);
  console.log("errorMessage: ", errorMessage);

  const valueOfTokenInLocal = localStorage.getItem("token");

  useEffect(() => {
    if (valueOfTokenInLocal) {
      setLoged(true);
    }
  }, [loged]);
  if (valueOfTokenInLocal) {
    return (
      <div>
        {errorMessage}
        <HomePage isLoged={loged} logedFunc={(e) => setLoged(e)} />
      </div>
    );
  }

  return (
    <>
      <div>{errorMessage}</div>
      <LoginPage
        logedFunc={(e) => setLoged(e)}
        errorFunc={(e) => setErrorMessage(e)}
      />
    </>
  );
}

export default App;
