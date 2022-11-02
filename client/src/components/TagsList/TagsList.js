import React, { useEffect, useState } from "react";
import "./TagsList.css";

export default function TagsList({ tags, checkingTags }) {
  const [checkedTags, setCheckedTags] = useState([]);
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
  console.log(checkedTags);
  return (
    <div className="listOfTags">
      {tags.map((tag, i) => (
        <div key={tag + i}>
          <input
            type={"checkbox"}
            value={tag}
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
          {tag}
        </div>
      ))}
    </div>
  );
}
