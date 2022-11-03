import React, { useEffect, useState } from "react";
import "../TagsList/TagL.css";

export default function TagL({ tags, checkingTags }) {
  const [checkedTags, setCheckedTags] = useState([]);
  const [showCheckboxList, setCheckboxList] = useState("dropdown");

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
        className="dropdown-label"
        onClick={() => {
          if (showCheckboxList === "dropdown") {
            setCheckboxList("dropdown open");
          } else if (showCheckboxList === "dropdown open") {
            setCheckboxList("dropdown");
          }
        }}
      >
        Select Options
      </label>

      <div className="dropdown-list">
        {tags.map((tag, i) => (
          <div className="checkbox">
            <input
              type="checkbox"
              value={tag}
              name="dropdown-group"
              className="check checkbox-custom"
              id={i}
              onClick={(e) => {
                if (e.target.checked) {
                  setCheckedTags((prev) => {
                    return [...prev, e.target.value];
                  });
                } else {
                  setCheckedTags(
                    checkedTags.filter((el) => el !== e.target.value)
                  );
                }

                console.log(e.target.value);
              }}
            />
            <label htmlFor={i} className="checkbox-custom-label">
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
