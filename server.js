import app from "./index.js";
import DBconnect from "./service/DB.connect.js";
import dotenv from "dotenv";
// import express from "express"

dotenv.config(
    {
        path: "./.env"
    }
)
const port = process.env.port  || 7000



DBconnect()
// app.use(express.json())
console.log(process.env.MESSAGE)
app.listen(port, ()=>{
    console.log(`The app is listening on port http://localhost:${port}`)
})