import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage({ isLoged, logedFunc }) {
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [quotes, setQuotes] = useState([]);

  function LogOut() {
    localStorage.removeItem("token");
    logedFunc(false);
  }

  useEffect(() => {
    axios
      .post("http://localhost:8000/sessions", {
        username: "fazi",
        password: "1234",
      })
      .then((response) => {
        setToken(response.data.accessToken);
        // localStorage.setItem("token", JSON.stringify(token));
      })
      .catch((e) => {
        console.log("grska?", e);
        setStatus("los");
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      // const ident = { id: "147dc7ad-e752-4f7c-9d4d-1bf41153001e" };
      // axios
      //   .post(
      //     "http://localhost:8000/quotes/90f4b4db-380f-4f59-804d-07645ac63611/upvote",
      //     null,
      //     {
      //       // params: { id: "147dc7ad-e752-4f7c-9d4d-1bf41153001e" },
      //       headers: {
      //         Authorization: "Bearer " + token,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     console.log("upvote", response);
      //   })
      //   .catch((e) => {
      //     console.log("grska?", e);
      //     setStatus("los");
      //   });

      axios
        .post(
          "http://localhost:8000/quotes",
          {
            content: "Cant stop",
            author: "Ghandi",
            tags: ["hajde"],
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          // console.log("response", response);
        })
        .catch((e) => {
          console.log("grska?", e);
          setStatus("los");
        });

      axios
        .get("http://localhost:8000/quotes", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //   console.log("quotes", res);
          setQuotes(res.data.quotes);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <>
      <button onClick={() => LogOut()}>LogOut</button>
      HomePage?
      <ul>
        {quotes?.map((el) => (
          <li key={el.id}>
            {el.content} upvote {el.downvotesCount}
          </li>
        ))}
      </ul>
    </>
  );
}
