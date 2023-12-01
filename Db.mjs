import mongoose from "mongoose"
export function connectToDb(){
   const uri = "mongodb+srv://sanhita:Sanhita11@cluster0.ol2n5.mongodb.net/iTEM?retryWrites=true&w=majority"
   ;
   mongoose.connect(uri, 
      { useNewUrlParser: true, useUnifiedTopology: true })
   .then(()=>{
      console.log("connected to db")
   })
   .catch((error)=>{
     console.log("could not connect to the db", error)
   })
}