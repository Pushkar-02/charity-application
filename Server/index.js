const connectToMongo = require('./db');
const express = require('express')
const cors=require("cors");

connectToMongo()
const app = express()
const port = 5000

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})