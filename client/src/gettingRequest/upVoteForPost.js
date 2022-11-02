import axios from "axios";

export default function upVoteForPost(id, action, method, funcVote) {
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
      console.log(res);
      alert("uspesno ste glasali");
      const a = () => {
        funcVote();
      };
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });

  // const ident = { id: "147dc7ad-e752-4f7c-9d4d-1bf41153001e" };
  // axios
  //   .post(`http://localhost:8000/quotes/${id}/upvote`, null, {
  //     // params: { id: "147dc7ad-e752-4f7c-9d4d-1bf41153001e" },
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //   .then((response) => {
  //     console.log("upvote", response);
  //   })
  //   .catch((e) => {
  //     console.log("grska?", e);
  //   });
}
