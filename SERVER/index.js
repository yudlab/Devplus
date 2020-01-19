console.clear();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const port = 3000;
var pids = require('./sites');
var fs = require('fs');
const open = require('open');
//app.use(bodyParser.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var readDirectory = require('./includes/dir-fetch/fs-fetch');


// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Security-Policy', 'default-src *');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})
app.use(cors())


app.listen(port, () => console.log(`Started on port ${port}!`));

app.get('/pids', (req, res) => res.send(pids));

app.post('/getpath',function(req,res){
    //console.log("req.body: ", req.body)
    //console.log("req.body.dir: ", req.body.dir)
    //console.log("---")
    //console.log("req.query: ", req.query)
    //console.log("req.query.dir: ", req.query.dir)
    if(!req.body.dir){
        res.sendStatus(400)
        return;
    }
    readDirectory.readDirectory(req.body.dir, function(paths){
       res.send(paths);
       //console.log("paths: ",paths)
       //console.log(`TypeOf paths: ${typeof paths}`)
   });
});

app.post('/submit-news',function(req,res){
    if(req.body.data){
        //console.log(JSON.stringify(req.body.data))
        //console.log(req.body.data.newsData.currentPid.nlWorkingDir)
        //console.dir(myJson.newsData.currentPid.id, {colors: true})
        try {
            var week = 'S'+req.body.data.week;
            var nlFolder = req.body.data.newsData.currentPid.nlWorkingDir;
            if (!fs.existsSync(nlFolder+week)){
                console.log("Creating Folder->", nlFolder+week)
                fs.mkdirSync(nlFolder+week);
            } else {
                console.log("ALREADY EXIST.")
            }
            if (!fs.existsSync(req.body.data.folderData)){
                console.log("Creating Folder->", req.body.data.folderData)
                fs.mkdirSync(req.body.data.folderData);
                res.send("202")
                return;
            } else {
                res.send("ALREADY EXIST.")
            }
        } catch(e){
            console.log("An error occured while creating folder.")
            res.send(e)
        }
        return;
    }
});

app.post('/open',function(req,res){
    if(!req.body.data){
        res.sendStatus(400)
        return;
    }
    open(req.body.data.cwd, {app: 'explorer'});
    //await open('https://sindresorhus.com', {app: ['google chrome', '--incognito'], wait: false});
    //console.log('The explorer window was closed');
    res.sendStatus(200)
});