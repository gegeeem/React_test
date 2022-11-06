import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

export default function Login({ logedFunc }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputUserPass, setInputUserPass] = useState({
    username: "",
    password: "",
  });

  function LogIn(login) {
    axios
      .post("http://localhost:8000/sessions", login)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        logedFunc(response.data.accessToken);
        setErrorMessage(`poruka sa logina`);
        setInputUserPass({ username: "", password: "" });
        // errorFunc(errorMessage);
      })
      .catch((e) => {
        console.log("grska?", e);
        setErrorMessage("Wrong Username or Password");
        // errorFunc(errorMessage);
        setInputUserPass({ username: "", password: "" });
      });
  }

  return (
    <div className="master">
      <div className="heading">{errorMessage}</div>
      <div className="container">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Sign In</h1>
          </div>
          <form name="signin" className="form">
            <div className="input-control">
              <input
                type="email"
                id="email"
                className="input-field"
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
            </div>
            <div className="input-control">
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Password"
                onChange={(e) =>
                  setInputUserPass((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
            </div>
            <div className="input-control">
              <input
                type="submit"
                className="input-submit"
                value="Sign In"
                onClick={(e) => {
                  LogIn(inputUserPass);
                  setInputUserPass({ username: "", password: "" });
                  e.preventDefault();
                }}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
