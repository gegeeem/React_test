import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "../../Quotes/Quote";
import AddNewPost from "../../AddNewPost/AddNewPost";
import TagsList from "../../TagsList/TagsList";
import TagL from "../../TagsList/TagL";
import MultipleSelectCheckmarks from "../../TagsList/MTagList";
import "./HomePage.css";
import SearchTags from "../../TagsList/SearchTags";
import AscDesc from "../../AscDesc/AscDesc";
import TagsMui from "../../TagsList/TagsMui";
import Pagination from "../../Pagination/Pagination";
import PaginationFor from "../../Pagination/Pagination";
import PopUpMessage from "../../PopUpMessage/PopUpMessage";
import { Button } from "@mui/material";

let counter = 1;
export default function HomePage({ isLoged, logedFunc }) {
  const [addedNewQoute, setAddedNewQoute] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [quotes, setQuotes] = useState([]);
  const [displayAddPost, setDisplayAddPost] = useState("hideContent");
  console.log("HomePagepozvana");
  const [tags, setTags] = useState([]);
  const [paramsForGetQoute, setParamsForGetQoute] = useState({
    pageSize: "5",
    page: "",
    sortBy: "createdAt",
    sortDirection: "asc",
    tags: "",
  });

  const [numberOfQoutes, setNumberOfQoutes] = useState(0);
  const [pageStep, setPageStep] = useState(1);
  const [message, setMessage] = useState({
    type: "success",
    text: "",
  });
  const [displayMessage, setDisplayMessage] = useState("pop"); // for clasname dipla block

  const tok1 = localStorage.getItem("token");

  function LogOut() {
    localStorage.removeItem("token");
    logedFunc(false);
  }
  function NumberOfPagesForQoutes(numOfQoutes, numOfPages) {
    return Math.ceil(numOfQoutes / numOfPages);
  }
  // useEffect(() => {
  //   function PopMessage() {
  //     setDisplayMessage("show");
  //     // setTimeout(2000);
  //     // setMessage("");
  //     // setDisplayMessage("pop");
  //     const timer = setTimeout(() => {
  //       setDisplayMessage("pop");
  //       setMessage("");
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  //   if (message) {
  //     PopMessage();
  //   }
  //   console.log("message", message);
  // }, [message]);

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
    //
    //ili resetuj ovde ako je moguce da je page: "1" za paramsForGetQoute
    //
    // }, [token, quotes.content, quotes.givenVote, paramsForGetQoute]);
    console.log("useEffect za qotes eequest parasms POZVANA");
  }, [token, paramsForGetQoute, tags.length, addedNewQoute]);
  console.log("paramsforgetqoute", paramsForGetQoute);
  console.log("message", message);
  return (
    <div className="main-container">
      <div className="menu">
        <AscDesc
          label={"Direction"}
          defaulValue={["asc", "desc"]}
          changeDirectionFunc={(val) =>
            setParamsForGetQoute((prev) => {
              return { ...prev, sortDirection: val, page: "1" };
            })
          }
        />
        {/* <select
          className="ascDesc"
          defaultValue={paramsForGetQoute.sortDirection}
          onChange={(e) =>
            setParamsForGetQoute((prev) => {
              return { ...prev, sortDirection: e.target.value };
            })
          }
        >
          <option className="optAscDesc" value={"asc"}>
            ASC
          </option>
          <option className="optAscDesc" value={"desc"}>
            DESC
          </option>
        </select> */}
        <AscDesc
          label={"Sorted By"}
          defaulValue={["createdAt", "author", "upvotesCount"]}
          changeDirectionFunc={(val) => {
            setParamsForGetQoute((prev) => {
              return { ...prev, sortBy: val, page: "1" };
            });
          }}
        />
        {/* <select
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
        </select> */}
        {/* <TagsList tags={tags} checkingTags={(e) => setParamsForGetQoute(e)} /> */}
        {/* <TagL tags={tags} checkingTags={(e) => setParamsForGetQoute(e)} /> */}
        <TagsMui tags={tags} selectTagsFunc={(e) => setParamsForGetQoute(e)} />
        <button onClick={() => setDisplayAddPost("showContent")}>
          + New Quote
        </button>
        <Button size="large" className="newQouteButton button">
          New Quote
        </Button>

        <button onClick={() => LogOut()}>LogOut</button>

        {/* <SearchTags tags={tags} checkingTags={(e) => setParamsForGetQoute(e)} /> */}

        {/* <MultipleSelectCheckmarks /> */}
      </div>
      broj postova {numberOfQoutes}
      <AddNewPost
        display={displayAddPost}
        closeFunc={() => setDisplayAddPost("hideContent")}
        addNewQouteFunc={(qoutes) => setQuotes(qoutes)}
        addNewQouteTagFunc={(tags) => setTags(tags)}
        showMessage={(val) => setMessage(val)}
      />
      <PopUpMessage
        typeOfMessage={message.type}
        message={message.text}
        messageFuncSetUp={(val) => setMessage(val)}
      />
      <ul className="listOfQoutes">
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
            addedQouteFuncTrigger={(e) => setAddedNewQoute(e)}
            alreadyVotedMessagefunc={(e) => setMessage(e)}
          />
        ))}
      </ul>
      <PaginationFor
        currPage={+paramsForGetQoute.page}
        numberOfPage={Math.ceil(numberOfQoutes / 5)}
        selectPageFunc={(val) =>
          setParamsForGetQoute((prev) => {
            return { ...prev, page: val };
          })
        }
      />
      {/* <button
        onClick={(e) => {
          // setParamsForGetQoute((prev) => {
          //   return { ...prev, page: (counter++).toString() };
          // });
          const a = pageStep + 1;
          setPageStep(a);
          e.preventDefault();
        }}
      >
        Next
      </button> */}
    </div>
  );
}
