import React, { useState, useEffect } from "react";
import "./AddNewPost.css";
import axios from "axios";
import Tag from "../Tag/Tag";

export default function AddNewPost({
  display,
  addNewQouteFunc,
  closeFunc,
  addNewQouteTagFunc,
  showMessage,
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
        setTag("");
        addNewQouteFunc((prev) => {
          return [...prev, response.data];
        });
        addNewQouteTagFunc((prev) => {
          return [...prev, response.data.tags];
        });

        showMessage({ type: "success", text: response.statusText });
        console.log("Response", response);
      })
      .catch((e) => {
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
        setTag("");
        setTags([]);
        console.log(e.response.data);
        showMessage({ type: "warning", text: e.response.data.author });
        alert(e);
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
            <div className="qoute-container">
              {/* <label htmlFor="content">Content</label> */}
              <textarea
                className="textarea-post"
                value={newPost.content}
                onFocus={(e) => (e.target.value = "")}
                type={"textarea"}
                placeholder="Add some quote here..."
                id="content"
                onChange={(e) =>
                  setNewPost((prev) => {
                    return { ...prev, content: e.target.value };
                  })
                }
                autoFocus
                required
              />

              {/* <label htmlFor="author">Author</label> */}
              <input
                className="input-author"
                value={newPost.author}
                onFocus={(e) => (e.target.value = "")}
                placeholder="Author's name..."
                id="author"
                onChange={(e) =>
                  setNewPost((prev) => {
                    return { ...prev, author: e.target.value };
                  })
                }
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="tags">Add new tags: </label>

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
                required
              />
              {tag ? (
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
              ) : (
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
                  disabled
                />
              )}
              <div>
                {/* {newPost.tags.join()} */}
                {newPost.tags.map((el, i) => (
                  <Tag
                    key={el}
                    name={el}
                    removeFunc={() => setTags(removeTag(i, tags))}
                  />
                ))}
              </div>
            </div>
            {newPost.author && newPost.content && newPost.tags.length ? (
              <input
                type="submit"
                onClick={(e) => {
                  setSendPost(newPost);
                  // addPostRequest(newPost);
                  // e.preventDefault();

                  closeFunc();
                }}
              />
            ) : (
              <input
                type="submit"
                onClick={(e) => {
                  setSendPost(newPost);
                  // addPostRequest(newPost);
                  // e.preventDefault();

                  closeFunc();
                }}
                disabled
              />
            )}
          </div>
        </div>
        {/* <div className="modal-footer">
          <h4>Qoutes</h4>
        </div> */}
      </div>
    </div>
  );
}
