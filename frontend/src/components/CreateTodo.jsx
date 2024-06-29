import { useState } from "react";

export function CreateTodo() {
  // react-query
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // implement rerendering of the input fields once todo is added upon clicking the button
  return <div>
    <input id="title" type="text" placeholder="title" onChange={function(e) {
      const value = e.target.value;
      setTitle(value);
    }}></input>
    <br />

    <input id="desc" type="text" placeholder="description" onChange={function(e) {
      const value = e.target.value;
      setDescription(e.target.value);
    }}></input>
    <br />

    <button  onClick={() => {
      // implement axios for fetch 
      fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(async function(res) {
          const json = await res.json();
          alert("Todo added"); // somehow trigger re render after this alert
        })
    }}>Add a todo</button>
    <br />

  </div>
}

