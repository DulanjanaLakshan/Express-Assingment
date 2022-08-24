const express = require('express')

// export Mongoose
const mongoose = require('mongoose')
const app = express()
const port = 4001

// routing part
const user = require('./Routes/user')

// mongodb connction part
const url = 'mongodb://localhost/fbclone'

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection;

con.on("open", ()=>{
    console.log("mongo db successfully connected");
})

app.use(express.json())
app.use("/user", user)

app.get('/',(req,res)=>{
 res.send("welcome");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})