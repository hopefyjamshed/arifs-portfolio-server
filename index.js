const express= require('express');
const cors= require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app= express()
require('dotenv').config()
const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('server is running successfully')
})

// mongodb connection

// mongodb+srv://PortfolioDB:<password>@cluster0.jhyqfko.mongodb.net/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jle6tre.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const aboutCollections = client.db('ArifsPortfolioDB').collection('aboutCollections')
        const serviceCollections = client.db('ArifsPortfolioDB').collection('serviceCollections')
        const skillsCollections= client.db('ArifsPortfolioDB').collection('skillsCollections')
        // const uploadCollections = client.db("ArifsPortfolioDB").collection("uploadCollections")

        // app.get('/products', async (req, res) => {
        //     const query = {}
        //     const result = await ProuductCollection.find(query).toArray()
        //     res.send(result)
        // })

        app.post('/uploadabout', async (req, res) => {
            const upload = req.body
            const result = await aboutCollections.insertOne(upload)
            res.send(result)

        })
        app.post('/uploadService', async (req, res) => {
            const upload = req.body
            const result = await serviceCollections.insertOne(upload)
            res.send(result)

        })
        app.post('/uploadSkill', async (req, res) => {
            const upload = req.body
            const result = await skillsCollections.insertOne(upload)
            res.send(result)

        })

        // app.get('/upload', async(req,res)=>{
        //     const quary={}
        //     const upload= await uploadCollections.find(quary).toArray()
        //     res.send(upload)
            
        // })
    }
    finally {

    }
}

run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})