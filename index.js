const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middle wares
app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vivqooe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const serviceCollection = client.db('dreamTravel').collection('services');
        const reviewCollection = client.db('dreamTravel').collection('reviews');
        const myServiceCollection = client.db('dreamTravel').collection('myServices');

        app.get('/services',async(req,res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/service-details/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        app.get('/reviews',async(req,res)=>{
            let query = {};
            if(req.query.id){
                query = {
                    serviceId: req.query.id
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })

        app.get('/reviews',async(req,res)=>{
            let query = {};
            if(req.query.id){
                query = {
                    userId: req.query.id
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })

        app.post('/reviews',async(req,res)=>{
            const review = req.body;
            const result = reviewCollection.insertOne(review);
            res.send(result);
        })
        app.post('/my-services',async(req,res)=>{
            const service = req.body;
            const result = myServiceCollection.insertOne(service);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(error=>console.log(error));


app.get('/',(req,res)=>{
    res.send('Dream travel server is running');
});

app.listen(port,()=>{
    console.log(`Dream travel server running on ${port}`);
});