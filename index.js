const express = require('express');
const app = express();
require('dotenv').config();
const cors=require('cors');

const port = process.env.PORT || 3000;

const router=require('./views/server');

//middlewares
app.use(express.json()); 
app.use(cors({
  origin:"*"
}))
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use('/api',router);



app.get('/',(req,res)=>{
res.send('hello ucc');
})


app.listen(port, () => {
  console.log(`UCC backend is running at ${port}`);
});
