import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "../../Quotes/Quote";
import AddNewPost from "../../AddNewPost/AddNewPost";
import "./HomePage.css";

import PaginationFor from "../../Pagination/Pagination";
import PopUpMessage from "../../PopUpMessage/PopUpMessage";
import Menu from "../../Menu/Menu";

export default function HomePage({ isLoged, logedFunc }) {
  const [addedNewQoute, setAddedNewQoute] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [quotes, setQuotes] = useState([]);
  const [displayAddPost, setDisplayAddPost] = useState("hideContent");
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
  const [spinner, setSpinner] = useState(false);

  const tok1 = localStorage.getItem("token");

  function LogOut() {
    localStorage.removeItem("token");
    logedFunc(false);
  }
  function NumberOfPagesForQoutes(numOfQoutes, numOfPages) {
    return Math.ceil(numOfQoutes / numOfPages);
  }

  useEffect(() => {
    if (!tok1) {
      logedFunc(false);
    }
  }, [tok1]);

  //
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
        setTags(res.data);
      })
      .catch((err) => {});
  }, [tags.length]);

  useEffect(() => {
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
          setQuotes(res.data.quotes);
          setNumberOfQoutes(res.data.quotesCount);

        })
        .catch((err) => {});
    }
    getQoutes(paramsForGetQoute);
  }, [token, paramsForGetQoute, tags.length, addedNewQoute, message]);
  return (
    <div className="main-container">
      <div className="main-listOfQuotes-cntnt">
        <Menu
          setParamsForGetQoute={(val) => setParamsForGetQoute(val)}
          tags={tags}
          setDisplayAddPost={(val) => setDisplayAddPost(val)}
          logedFunc={() => logedFunc()}
        />
        <h2 className="headingQuote">
          Total number of Quotes <span>{numberOfQoutes}</span>
        </h2>

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
              spinnerFunc={(val) => setSpinner(val)}
            />
          ))}
        </ul>
      </div>

      <div className="pagination">
        <PaginationFor
          currPage={+paramsForGetQoute.page}
          numberOfPage={Math.ceil(numberOfQoutes / 5)}
          selectPageFunc={(val) =>
            setParamsForGetQoute((prev) => {
              return { ...prev, page: val };
            })
          }
        />
      </div>
    </div>
  );
}
