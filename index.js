const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
var ObjectId = require("mongodb").ObjectId;
// const fileUpload = require('express-fileupload');

const app = express();

const port = process.env.PORT || 8000;


// middleware
app.use(cors());
app.use(express.json());
// app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.srriw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const database = client.db('buddy'); 
        const jobsCollection = database.collection('jobs');  
    
        //post tasks
        app.post('/jobs', async (req, res) => {
            const jobs = req.body;
            const result = await jobsCollection.insertOne(jobs);
            console.log(result);
            res.json(result);
        });

        app.get('/jobs', async (req, res) => {
            const cursor = jobsCollection.find({});
            const jobs = await cursor.toArray();
            res.send(jobs);
        } )  ;


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