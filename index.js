const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middle wares
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Dream travel server is running');
});

app.listen(port,()=>{
    console.log(`Dream travel server running on ${port}`);
})