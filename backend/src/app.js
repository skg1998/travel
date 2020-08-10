const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()

const Middleware = require('./Middleware')
const Logs = require('./Api/Logs');
const bodyParser = require('body-parser');

//runing on port
const port = process.env.PORT || 5000

//initialze app
const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(helmet())
app.use(cors({
    origin:process.env.CORS_ORIGIN
}));

app.get('/',(req,res)=>{
    res.json({
        message:"hello "
    })
})

//routes
app.use('/api/logs',Logs)

//middleware
app.use(Middleware.notFound)
app.use(Middleware.errorHandler)

//database connection
mongoose.connect(process.env.DATABASE_URL ,{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
    console.log("MongoDb connected...")
  }).catch(err=>{
     console.log(err)
    });

//listing on port
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});