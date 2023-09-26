
const express = require("express");
const { connection } = require("./config/db");


const app = express();


app.use(express.json());


app.use(express.urlencoded({extended:true}))


app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running on port 8080")
})

