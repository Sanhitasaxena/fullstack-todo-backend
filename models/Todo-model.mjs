// import { Schema } from "mongoose"
import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    id:{
      type:String,
      required: true,
      unique: true 
    },
    TodoName:{
        type:String,
        required: true
    },
})

// creating a model using the schema. 
const Todo = mongoose.model('Todo', todoSchema)

export default Todo


