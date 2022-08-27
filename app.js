const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4001

const user = require('./Routes/user')


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fb-clone:XbtCsu9vtS1AkcKh@cluster0.1ie9jw2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");

  client.close();
});


mongoose.connect(uri, {useNewUrlParser:true})
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