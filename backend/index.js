const express = require("express");
const { createTodo, updateTodo } = require("./types");
const mongoose = require("mongoose")
const { todo } = require("./db");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//creating todos
app.post("/todo", async function(req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    })
    return;
  }
  // put it in mongodb
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  })

  res.json({
    msg: "Todo created"
  })
})

//fetching all todos
app.get("/todos", async function(req, res) {

  const todos = await todo.find({});

  res.json({
    todos
  })
})

//marking todos as completed 
//will add a reverse functionnality later
app.put("/completed", async function(req, res) {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    })
    return;
  }

  //says here that objectID and such is deprecated but thats the only way it was working
  const updatemsg = await todo.updateOne(
    {_id: new mongoose.Types.ObjectId(updatePayload.id)},
    { $set: { completed: true} }, //add an ifelse block to check the current state of the button and just set its value to the opposite
  )

  console.log(updatemsg.matchedCount)

  res.json({
    msg: "Todo marked as completed",
    updatemsg
  })
})

app.listen(port);

console.log(`Example listening on port ${port}`)

