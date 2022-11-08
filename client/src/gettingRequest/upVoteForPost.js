import axios from "axios";

export default function upVoteForPost(id, action, method, funcVote) {
  const token = localStorage.getItem("token");

  axios({
    method: method,
    url: `http://localhost:8000/quotes/${id}/${action}`,

    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      const a = () => {
        funcVote();
      };
    })
    .catch((err) => {
      alert(err);
    });
}
