var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

const faceRoutes = require('./routes/face');


var app= express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));

app.use("/images",express.static(path.join("images")));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE,OPTIONS');
  next();
});



app.listen(port,()=>{
    console.log("Server is running on port ",port);
});
app.use("/api/face",faceRoutes);

module.exports.app = app;