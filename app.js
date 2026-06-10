const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const playerRoute=require("./crick_api");
const algorithm=require("./algo"); 
app.use("/api/match",playerRoute);
app.use("/api/match",algorithm)
console.log(playerRoute);
app.listen(3000,()=>{console.log("Server Started Successfully!")})  