const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = require('./route')
const cors =require('cors')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static( `${__dirname}/upload`));
app.use(bodyParser.json())
app.use(cors())
app.use('/',router)

console.log('Server running...');
app.listen(3000);