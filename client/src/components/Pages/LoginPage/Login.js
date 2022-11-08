import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteLeftAlt,
  faQuoteRight,
  faQuoteRightAlt,
} from "@fortawesome/free-solid-svg-icons";

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
        setErrorMessage("Wrong Username or Password! Please try again");
        // errorFunc(errorMessage);
        setInputUserPass({ username: "", password: "" });
      });
  }

  return (
    <div className="master">
      <div className="container">
        <p className="clrForQuote">
          <sup>
            <FontAwesomeIcon icon={faQuoteLeftAlt} size={"sm"} />
          </sup>
          <span className="headingQoute">Quotes</span>
          <sub>
            <FontAwesomeIcon icon={faQuoteRightAlt} size={"sm"} />
          </sub>
        </p>
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Sign In</h1>
            <p className="error">{errorMessage}</p>
          </div>
          <form name="signin" className="form">
            <div className="input-control">
              <input
                type="text"
                id="email"
                className="input-field"
                placeholder="Username"
                onFocus={(e) => {
                  e.target.value = "";
                  setInputUserPass((prev) => {
                    return { ...prev, username: "" };
                  });
                }}
                value={inputUserPass.username}
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
                onFocus={(e) => {
                  e.target.value = "";
                  setInputUserPass((prev) => {
                    return { ...prev, password: "" };
                  });
                }}
                value={inputUserPass.password}
              />
            </div>
            <div className="input-control">
              {inputUserPass.username && inputUserPass.password ? (
                <input
                  type="submit"
                  className="input-submit"
                  value="Sign In"
                  onClick={(e) => {
                    LogIn(inputUserPass);
                    // setInputUserPass({ username: "", password: "" });
                    e.preventDefault();
                  }}
                />
              ) : (
                <input
                  type="submit"
                  className="input-submit disabled"
                  value="Sign In"
                  disabled
                />
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}