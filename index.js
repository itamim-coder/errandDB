const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
var ObjectId = require("mongodb").ObjectId;
// const fileUpload = require('express-fileupload');

const app = express();

const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());
// app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.srriw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        const database = client.db('testerrand'); 
        const tasksCollection = database.collection("tasks");  
    
        //post tasks

        app.post("/tasks", async(req,res) =>{
            const result = await tasksCollection.insertOne(req.body);
            res.send(result)
            console.log(result)
        }) 

        app.get('/tasks', async (req, res) => {
            const cursor = tasksCollection.find({});
            const tasks = await cursor.toArray();
            res.send(tasks);
        } )  


        console.log('connected errandDB')

    }
    finally{
        //await client.close();
    }

}

run().catch(console.dir)

app.get('/', (req, res)  =>{
    res.send('ruuning errandDB------')
})

app.listen(port, ()=>{
    console.log('running errandDB-----', port)
})