import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "../../Quotes/Quote";
import AddNewPost from "../../AddNewPost/AddNewPost";
import TagsList from "../../TagsList/TagsList";
let counter = 1;
export default function HomePage({ isLoged, logedFunc }) {
  const [addedNewQoute, setAddedNewQoute] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [quotes, setQuotes] = useState([]);
  const [displayAddPost, setDisplayAddPost] = useState("hideContent");
  console.log("HomePagepozvana");
  const [tags, setTags] = useState([]);
  const [paramsForGetQoute, setParamsForGetQoute] = useState({
    pageSize: "3",
    page: "",
    sortBy: "createdAt",
    sortDirection: "asc",
    tags: "",
  });

  const [numberOfQoutes, setNumberOfQoutes] = useState(0);
  const [pageStep, setPageStep] = useState(1);

  const tok1 = localStorage.getItem("token");

  function LogOut() {
    localStorage.removeItem("token");
    logedFunc(false);
  }
  function NumberOfPagesForQoutes(numOfQoutes, numOfPages) {
    return Math.ceil(numOfQoutes / numOfPages);
  }
  useEffect(() => {
    setParamsForGetQoute((prev) => {
      return { ...prev, page: pageStep.toString() };
    });
  }, [pageStep]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/tags", {
        headers: {
          Authorization: "Bearer " + tok1,
        },
      })
      .then((res) => {
        //   console.log("quotes", res);
        setTags(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [tags.length]);

  useEffect(() => {
    console.log("sueEffect za parametre pozvana");
    // axios
    //   .get("http://localhost:8000/tags", {
    //     headers: {
    //       Authorization: "Bearer " + tok1,
    //     },
    //   })
    //   .then((res) => {
    //     //   console.log("quotes", res);
    //     setTags(res.data);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //   });
    // axios
    //   .post(
    //     "http://localhost:8000/quotes",
    //     {
    //       content: "Cant stop",
    //       author: "Ghandi",
    //       tags: ["hajde"],
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + tok1,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     // console.log("response", response);
    //   })
    //   .catch((e) => {
    //     console.log("grska?", e);
    //   });
    // axios
    //   .get(`http://localhost:8000/quotes`, {
    //     headers: {
    //       Authorization: "Bearer " + tok1,
    //     },
    //   })
    //   .then((res) => {
    //     //   console.log("quotes", res);
    //     setQuotes(res.data.quotes);
    //     // console.log("response from quotes", res);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //   });
    function getQoutes(params) {
      axios
        .get(
          `http://localhost:8000/quotes?sortBy=${params.sortBy}&sortDirection=${params.sortDirection}&tags=${params.tags}&pageSize=${params.pageSize}&page=${params.page}`,
          {
            headers: {
              Authorization: "Bearer " + tok1,
            },
          }
        )
        .then((res) => {
          //   console.log("quotes", res);
          setQuotes(res.data.quotes);
          setNumberOfQoutes(res.data.quotesCount);

          console.log("response from quotes", res);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    getQoutes(paramsForGetQoute);
    // }, [token, quotes.content, quotes.givenVote, paramsForGetQoute]);
  }, [token, paramsForGetQoute]);
  console.log(paramsForGetQoute);
  console.log("stepPage", pageStep);

  return (
    <>
      <div className="menu">
        <select
          defaultValue={paramsForGetQoute.sortDirection}
          onChange={(e) =>
            setParamsForGetQoute((prev) => {
              return { ...prev, sortDirection: e.target.value };
            })
          }
        >
          <option value={"asc"}>ASC</option>
          <option value={"desc"}>DESC</option>
        </select>
        <select
          onChange={(e) => {
            setParamsForGetQoute((prev) => {
              return { ...prev, sortBy: e.target.value };
            });
          }}
          defaultValue={paramsForGetQoute.sortBy}
        >
          <option value={"createdAt"}>Created At</option>
          <option value={"author"}>Author</option>
          <option value={"upvotesCount"}>Upvotes Count</option>
        </select>
        <TagsList tags={tags} checkingTags={(e) => setParamsForGetQoute(e)} />
        <button onClick={() => setDisplayAddPost("showContent")}>
          + New Post
        </button>
        <button onClick={() => LogOut()}>LogOut</button>
      </div>
      broj postova {numberOfQoutes}
      <div>Novi citat{addedNewQoute}</div>
      <div>
        {tags?.map((el, index) => (
          <span key={index}>{el}, </span>
        ))}
      </div>
      <AddNewPost
        display={displayAddPost}
        closeFunc={() => setDisplayAddPost("hideContent")}
        addNewQouteFunc={(qoutes) => setQuotes(qoutes)}
        addNewQouteTagFunc={(tags) => setTags(tags)}
      />
      <ul>
        {/* {quotes?.map((el) => (
          <li key={el.id}>
            {el.content} upvote {el.downvotesCount}
          </li>
        ))} */}

        {quotes?.map((el) => (
          <Quote
            key={el.id}
            id={el.id}
            author={el.author}
            content={el.content}
            upvotesCount={el.upvotesCount}
            downvotesCount={el.downvotesCount}
            givenVote={el.givenVote}
            updateQuoteFunc={(prev) => setQuotes(prev)}
          />
        ))}
      </ul>
      <button
        onClick={(e) => {
          // setParamsForGetQoute((prev) => {
          //   return { ...prev, page: (counter++).toString() };
          // });
          setPageStep(++counter);
          e.preventDefault();
        }}
      >
        Next
      </button>
    </>
  );
}
