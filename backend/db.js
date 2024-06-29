const mongoose = require("mongoose");
const conString = require("./con.json") //json file containing mongodb connection string in this format:

/*

{
  "connector" : "<your mongodb connection string here>"
}

*/

mongoose.connect(conString.connector)

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
  todo
}
