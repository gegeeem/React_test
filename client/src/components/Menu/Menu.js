import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeftAlt,
  faQuoteRightAlt,
} from "@fortawesome/free-solid-svg-icons";
import AscDesc from "../AscDesc/AscDesc";
import TagsMui from "../TagsList/TagsMui";

export default function Menu({
  setParamsForGetQoute,
  tags,
  setDisplayAddPost,
  logedFunc,
}) {
  function LogOut() {
    localStorage.removeItem("token");
    logedFunc(false);
  }
  return (
    <div className="menu">
      <div className="logo">
        <sup>
          <FontAwesomeIcon icon={faQuoteLeftAlt} size={"sm"} />
        </sup>
        <span className="headingQoute">Quotes</span>
        <sub>
          <FontAwesomeIcon icon={faQuoteRightAlt} size={"sm"} />
        </sub>
      </div>
      <AscDesc
        label={"Direction"}
        defaulValue={[
          { text: "ASC", value: "asc" },
          { text: "DESC", value: "desc" },
        ]}
        changeDirectionFunc={(val) =>
          setParamsForGetQoute((prev) => {
            return { ...prev, sortDirection: val, page: "1" };
          })
        }
      />

      <AscDesc
        label={"Sorted By"}
        defaulValue={[
          { text: "Created At", value: "createdAt" },
          { text: "Author", value: "author" },
          { text: "UpvotesCount", value: "upvotesCount" },
        ]}
        changeDirectionFunc={(val) => {
          setParamsForGetQoute((prev) => {
            return { ...prev, sortBy: val, page: "1" };
          });
        }}
      />

      <TagsMui tags={tags} selectTagsFunc={(e) => setParamsForGetQoute(e)} />
      <button
        className="linkButton"
        onClick={() => setDisplayAddPost("showContent")}
      >
        New Quote
      </button>

      <button className="linkButton" onClick={() => LogOut()}>
        LogOut
      </button>
    </div>
  );
}
