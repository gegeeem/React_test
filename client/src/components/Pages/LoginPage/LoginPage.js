import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoginPage({ logedFunc, errorFunc }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputUserPass, setInputUserPass] = useState({
    username: "",
    password: "",
  });

  function LogIn(login) {
    setErrorMessage("logging");

    axios
      .post("http://localhost:8000/sessions", login)
      .then((response) => {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        logedFunc(true);
        setErrorMessage(`poruka sa logina`);
        setInputUserPass({ username: "", password: "" });
        // errorFunc(errorMessage);
      })
      .catch((e) => {
        console.log("grska?", e);
        setErrorMessage("greska");
        // errorFunc(errorMessage);
        setInputUserPass({ username: "", password: "" });
      });

    console.log("login pozvana");
  }
  console.log(inputUserPass);

  return (
    <>
      {errorMessage}
      <form id="login-form">
        <input
          type="text"
          id="username-field"
          className="login-form-field"
          defaultValue={inputUserPass.username}
          placeholder="Username"
          onFocus={(e) => {
            e.target.value = "";
          }}
          onChange={(e) =>
            setInputUserPass((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        />
        <input
          type="password"
          id="password-field"
          className="login-form-field"
          placeholder="Password"
          defaultValue={inputUserPass.password}
          onChange={(e) =>
            setInputUserPass((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <input
          type="submit"
          value="Login"
          id="login-form-submit"
          onClick={(e) => {
            LogIn(inputUserPass);
            setInputUserPass({ username: "", password: "" });
            e.preventDefault();
          }}
        />
      </form>
    </>
  );
}
