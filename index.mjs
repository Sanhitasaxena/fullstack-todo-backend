import  Express  from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { connectToDb } from "./Db.mjs";
import Todo from "./models/Todo-model.mjs";
// const Todo = require('./models/Todo-model.mjs');
import mongoose from "mongoose"

const app = Express()

// enable cors for easy request access
app.use(cors())
app.use(bodyParser.json())

const PORT = 8000;

connectToDb()

// routes
app.get("/getUser", async(req, res)=>{
    // const User = {
    //     "name": "sanhita",
    //     "email": "sanhitasaxena96903@gmail.com"
    // }
    
    // res.send(User)
 
    const newTodo = new Todo({
        name: "Study"
       })
    
       try {
        const result = await newTodo.save();
        console.log('Todo saved:', result);
        res.send("todo added")
       } catch (error) {
        console.log(error);
       }
    
})

app.get("/getAllTodo", async(req, res)=>{
    try {
      const allTodos = await Todo.find()
      console.log(allTodos);
      res.json(allTodos)
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
})

app.post("/addTodo", (req,res)=>{
   const todoName = req.body.inputValue;
   const todoId = req.body.id;
  // console.log("todoName: ", todoName);
  // console.log("todoId: ", typeof(todoId));
  const newTodo = new Todo({
    id: todoId,
    TodoName: todoName
  });

  if (req.body) {
    res.send({ message: "Data received successfully", data: req.body });
  } else {
    console.log('No data received');
    res.status(400).send({ message: "No data received" });
  }
    // console.log("params", req.params)

   newTodo.save()
   .then((resolve)=>{
     console.log("Todo saved successfully", resolve);
   })
   .catch((error)=>{
       console.log("Something went wrong",error);
   })

  //  res.send("todo added")
})

// get todo action 
app.get("/getTodo", async(req, res)=>{
  try {
    const todos = await Todo.find()
    console.log("Please find all todos here", todos);
    res.send("succesfully fetched the data")
  } catch (error) {
    console.log("something went wrong",error);
  } 
})


app.delete("/deleteTodo/:id", async(req, res)=>{
   try {
    const todoId = req.params.id
    // console.log(typeof(todoId));
    console.log(todoId);
    // console.log("delete todo with this id",todoId);
    // console.log(req.params.id)


    const deletedTodo = await Todo.findOneAndDelete({_id: todoId})
    console.log('Deleted Todo:', deletedTodo);
    if(deletedTodo){
      res.send({message: "todo deleted successfully", deletedTodo})
    }else{
      res.status(500).send({error: "something went wrong"})
    } 

   } catch (error) {
    console.log('Error:', error.message);
  res.status(500).send({ error: 'Internal Server Error' });
   }
})

app.put("/updateTodo/:id", async(req, res)=>{
 try {
  const updatedTodoId = req.params.id
  const updatedTodoValue = req.body.editteditem
  const response = await Todo.findByIdAndUpdate(updatedTodoId, {
     TodoName: updatedTodoValue ,
     new: true 
  }) 
  
  res.json({message: "data updated successfully", response})
 } catch (error) {
  console.log(error);
 }

})



app.listen(PORT,()=>{
    console.log(`server is on port ${PORT}`)
})
