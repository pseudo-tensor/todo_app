import { useCallback } from 'react'

// format of rendered todo: 

/* 
 * todos = [
   {
    title: "go to gym",
    description: "go to gym",
   } 
   ]
*/

//_id field of todos is present but never rendered

export function Todos({todos}) {

  //implemented usecallback to prevent function being called at every re render and triggering another re render 
  const updateTodo = useCallback((todoId) => {
    fetch("http://localhost:3000/completed", {
      method: "PUT",
      body: JSON.stringify({
        id: todoId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const resultJson = await res.json();
        console.log(resultJson);
      });
  }, []);

  return <div>
    {todos.map(function(todo) {
      return <div key = {todo._id}>
        <h2>{todo.title}</h2>
        <h4>{todo.description}</h4>
        <button onClick = {() => updateTodo(todo._id)}>{todo.completed == true ? "Completed" : "Mark as Complete"}</button>
      </div>
    })}
  </div>
}


