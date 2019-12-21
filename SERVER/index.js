const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const port = 3000;
var pids = require('./sites');
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
var readDirectory = require('./includes/dir-fetch/fs-fetch');


// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})

app.use(cors())
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/pids', (req, res) => res.send(pids));

app.post('/getpath',function(req,res){
    readDirectory.readDirectory(req.query.dir, function(logFiles){
       res.json({logFiles});
   });
});

