import React, { useEffect, useState } from "react";
import "../TagsList/SearchTags.css";

export default function TagL({ tags, checkingTags }) {
  const [inputTag, setInputTag] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [showCheckboxList, setCheckboxList] = useState("dropdown");

  useEffect(() => {
    setFilteredTags(
      tags.filter((el) => {
        console.log(el.includes(inputTag));
        if (!el.search(inputTag)) {
          return el;
        }
      })
    );
  }, [inputTag]);
  console.log("filteredTags", filteredTags);
  useEffect(() => {
    if (checkedTags.length) {
      checkingTags((prev) => {
        return { ...prev, tags: checkedTags.join(",") };
      });
    } else {
      checkingTags((prev) => {
        return { ...prev, tags: "" };
      });
    }
  }, [checkedTags]);
  return (
    <div className={showCheckboxList}>
      <label
        className="dropdown-label2"
        onClick={() => {
          if (showCheckboxList === "dropdown") {
            setCheckboxList("dropdown open");
          } else if (showCheckboxList === "dropdown open") {
            setCheckboxList("dropdown");
          }
        }}
      >
        <input
          type={"text"}
          placeholder="Add Tags"
          className="input-label"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onFocus={(e) => (e.target.value = "")}
        />
        <input
          className="input-label-submit"
          type={"button"}
          value="Add"
          onClick={(e) => {
            setCheckedTags((prev) => {
              return [...prev, inputTag];
            });
            e.preventDefault();
          }}
        />
      </label>

      <div className="dropdown-list">
        {filteredTags.map((tag, i) => (
          <div className="checkbox" key={tag}>
            <input
              type="checkbox"
              value={tag}
              name="dropdown-group"
              className="check checkbox-custom"
              id={tag}
              onClick={(e) => {
                if (e.target.checked) {
                  setCheckedTags((prev) => {
                    return [...prev, e.target.value];
                  });
                  setInputTag(e.target.value);
                } else {
                  setCheckedTags(
                    checkedTags.filter((el) => el !== e.target.value)
                  );
                }

                console.log(e.target.value);
              }}
            />
            <label htmlFor={tag} className="checkbox-custom-label">
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
