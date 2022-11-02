import React, { useState, useEffect } from "react";
import "./AddNewPost.css";
import axios from "axios";
import Tag from "../Tag/Tag";

export default function AddNewPost({
  display,
  addNewQouteFunc,
  closeFunc,
  addNewQouteTagFunc,
}) {
  const [newPost, setNewPost] = useState({
    content: "",
    author: "",
    tags: [],
  });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [sendPost, setSendPost] = useState({
    content: "",
    author: "",
    tags: [],
  });

  const content = `modal ${display}`; //ading none, and display css Class
  const tok1 = localStorage.getItem("token"); //getting token

  useEffect(() => {
    setNewPost((prev) => {
      return { ...prev, tags: [...tags] };
    });
  }, [tags]);
  function removeTag(index, arrayOfTags) {
    const newArr = [...arrayOfTags];
    return (arrayOfTags = newArr.filter((el, i) => {
      if (i !== index) return el;
    }));
  }
  //sending request for adding a new post
  function addPostRequest(newQuoteForAdd) {
    axios
      .post("http://localhost:8000/quotes", newQuoteForAdd, {
        headers: {
          Authorization: "Bearer " + tok1,
        },
      })
      .then((response) => {
        setSendPost({
          content: "",
          author: "",
          tags: [],
        });
        setNewPost({
          content: "",
          author: "",
          tags: [],
        });
        setTags([]);
        addNewQouteFunc((prev) => {
          return [...prev, response.data];
        });
        addNewQouteTagFunc((prev) => {
          return [...prev, response.data.tags
          ];
        });
        console.log(response);
        alert(response.status);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    if (sendPost.content) {
      addPostRequest(sendPost);
      setSendPost({
        content: "",
        author: "",
        tags: [],
      });
      setNewPost({
        content: "",
        author: "",
        tags: [],
      });
    }
  }, [sendPost]);

  return (
    <div id="myModal" className={content}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeFunc}>
            &times;
          </span>
          <h2>Add New Quote</h2>
        </div>
        <div className="modal-body">
          <div className="form">
            <div>
              <label htmlFor="content">Content</label>
              <input
                value={newPost.content}
                onFocus={(e) => (e.target.value = "")}
                type={"text"}
                placeholder="Add some quote here..."
                id="content"
                onChange={(e) =>
                  setNewPost((prev) => {
                    return { ...prev, content: e.target.value };
                  })
                }
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input
                value={newPost.author}
                onFocus={(e) => (e.target.value = "")}
                type={"text"}
                placeholder="Author's name..."
                id="author"
                onChange={(e) =>
                  setNewPost((prev) => {
                    return { ...prev, author: e.target.value };
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="tags">Add new tags: </label>
              {/* {newPost.tags.join()} */}
              {newPost.tags.map((el, i) => (
                <Tag
                  key={el}
                  name={el}
                  removeFunc={() => setTags(removeTag(i, tags))}
                />
              ))}

              <input
                value={tag}
                onFocus={(e) => (e.target.value = "")}
                type={"text"}
                id="tags"
                placeholder="tag..."
                // onChange={(e) =>
                //   setNewPost((prev) => {
                //     return { ...prev, tags: [e.target.value] };
                //   })
                // }
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />
              <input
                type={"submit"}
                value={"add"}
                onClick={(e) => {
                  setTags((prev) => {
                    return [...prev, tag];
                  });
                  setTag("");
                  e.preventDefault();
                }}
              />
            </div>
            <input
              type="submit"
              onClick={(e) => {
                setSendPost(newPost);
                // addPostRequest(newPost);
                // e.preventDefault();
                closeFunc();
              }}
            />
          </div>
        </div>
        <div className="modal-footer">
          <h4>Qoutes</h4>
        </div>
      </div>
    </div>
  );
}
