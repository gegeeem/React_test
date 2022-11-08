import React, { useState } from "react";
import "../Quotes/Quotes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import HSLToRGB from "../../HSL to RGB/HslToRgb";
import Progres from "../Progres/Progres";

// import upVoteForPost from "../../gettingRequest/upVoteForPost";

export default function Quote({
  id,
  author,
  content,
  upvotesCount,
  downvotesCount,
  givenVote,
  updateQuoteFunc,
  addedQouteFuncTrigger,
  alreadyVotedMessagefunc,
  spinnerFunc
}) {
  const [votedAnime, setVotedAnime] = useState(false);
  function startVoteAnitamtion() {
    setVotedAnime(true);
    const timer = setTimeout(() => {
      setVotedAnime(false);
    }, 3000);
    return () => clearTimeout(timer);
  }
  const gradesPercentage = (upVotes, downVotes) => {
    if (upVotes > 0 && downVotes > 0) {
      const up = (upVotes / (upVotes + downVotes)) * 100;
      return Math.round(up);
    } else if (upVotes === 0 && downVotes === 0) {
      return 0;
    } else if (upVotes > 0 && downVotes === 0) {
      return 100;
    } else if (upVotes === 0 && downVotes > 0) {
      return 100;
    }
  };
  // const colorForPercentage = (percentage, upVote, downVote) => {
  //   if (upVote > 0 && downVote > 0) {
  //     if (percentage <= 41) {
  //       return "procentOfGrades red";
  //     } else if (percentage <= 81) {
  //       return "procentOfGrades orange";
  //     } else {
  //       return "procentOfGrades green";
  //     }
  //   }
  //   if (percentage === 0) {
  //     return "procentOfGrades";
  //   } else if (upVote > 0 && downVote === 0) {
  //     return "procentOfGrades green";
  //   } else if (upVote === 0 && downVote > 0) {
  //     return "procentOfGrades red";
  //   }
  // };
  function clrByPercentage(percentage, upVote, downVote) {
    if (percentage === 0) {
      return "rgb(245, 246, 248)";
    } else if (upVote === 0 && downVote > 0) {
      return HSLToRGB(
        100 - gradesPercentage(upvotesCount, downvotesCount),
        98,
        50
      );
    } else {
      return HSLToRGB(gradesPercentage(upvotesCount, downvotesCount), 98, 50);
    }
  }
  function upVoteForPost(id, action, method, funcVote) {
    const token = localStorage.getItem("token");

    axios({
      method: method,
      url: `http://localhost:8000/quotes/${id}/${action}`,

      // params: { id: "147dc7ad-e752-4f7c-9d4d-1bf41153001e" },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        // alert("uspesno ste glasali");
        // const a = () => {
        //   funcVote = "success";
        // };
        console.log("voted response", res);
        addedQouteFuncTrigger((prev) => !prev);
        spinnerFunc("display");
       
        // addedQouteFuncTrigger(true);
      })
      .catch((err) => {
        funcVote = "error";
        alert(err);
      });
  }
  return (
    <div className="container-qoute">
      <div className="vote">
        <FontAwesomeIcon
          icon={faCaretUp}
          size={"lg"}
          beatFade={givenVote === "upvote" && votedAnime}
          color={givenVote !== "upvote" ? "rgb(55, 47, 63)" : ""}
          onClick={() => {
            let message = "";
            if (givenVote === "none") {
              upVoteForPost(id, "upvote", "post", message);
              //if upVoteForPost(id, "upvote", "post"); vote if note message
              updateQuoteFunc((prev) => {
                return prev.map((el) => {
                  if (el.id === id) {
                    return {
                      ...el,
                      givenVote: "upvote",
                      upvotesCount: el.upvotesCount + 1,
                    };
                  } else return el;
                });
              });

              startVoteAnitamtion();
            } else if (givenVote === "downvote") {
              upVoteForPost(id, "downvote", "delete");
              updateQuoteFunc((prev) => {
                return prev.map((el) => {
                  if (el.id === id) {
                    return {
                      ...el,
                      givenVote: "none",
                      downvotesCount: el.downvotesCount - 1,
                    };
                  } else return el;
                });
              });
            } else {
              // alert("Already upvoted!");
              alreadyVotedMessagefunc({
                type: "info",
                text: "Already Upvoted",
              });
            }
          }}
        />

        <div
          // className={colorForPercentage(
          //   gradesPercentage(upvotesCount, downvotesCount),
          //   upvotesCount,
          //   downvotesCount
          // )}
          className="procentOfGrades"
          style={{
            color: clrByPercentage(
              gradesPercentage(upvotesCount, downvotesCount),
              upvotesCount,
              downvotesCount
            ),
          }}
        >
          {gradesPercentage(upvotesCount, downvotesCount)}%
        </div>
        <div className="numberOfVotes">
          {upvotesCount}/{downvotesCount}
        </div>
        <FontAwesomeIcon
          icon={faCaretDown}
          size={"lg"}
          beatFade={givenVote === "downvote" && votedAnime}
          color={givenVote !== "downvote" ? "rgb(55, 47, 63)" : ""}
          onClick={() => {
            if (givenVote === "none") {
              upVoteForPost(id, "downvote", "post");
              updateQuoteFunc((prev) => {
                return prev.map((el) => {
                  if (el.id === id) {
                    return {
                      ...el,
                      givenVote: "downvote",
                      downvotesCount: el.downvotesCount + 1,
                    };
                  } else return el;
                });
              });
              startVoteAnitamtion();
            } else if (givenVote === "upvote") {
              upVoteForPost(id, "upvote", "delete");
              updateQuoteFunc((prev) => {
                return prev.map((el) => {
                  if (el.id === id) {
                    return {
                      ...el,
                      givenVote: "none",
                      upvotesCount: el.upvotesCount - 1,
                    };
                  } else return el;
                });
              });
            } else {
              // alert("Already upvoted!");
              alreadyVotedMessagefunc({
                type: "info",
                text: "Already Downvoted",
              });
            }
          }}
        />
      </div>
      <div className="textOfQuote">
        <div>{content}</div>
        <span className="author">-{author}</span>
      </div>
    </div>
  );
}
