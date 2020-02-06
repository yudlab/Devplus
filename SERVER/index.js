console.clear()
const app = require('express')()
var server = require('http').Server(app)
const bodyParser = require('body-parser')
var cors = require('cors')
const port = 3000
var pids = require('./sites')
var fs = require('fs')
var ncp = require('ncp').ncp;
ncp.limit = 16;
const open = require('open')
//app.use(bodyParser.urlencoded({ extended: true }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var readDirectory = require('./includes/dir-fetch/fs-fetch')


server.listen(port);
console.log("Started on port: ", port)
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080, http://localhost:3000, http://127.0.0.1:3000, http://127.0.0.1:8080')
    res.setHeader('Content-Security-Policy', 'default-src *')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Credentials', false)
    next()
})
app.use(cors())
app.get('/', (req, res) => res.send(""))
app.get('/pids', (req, res) => res.send(pids))
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
            if(req.body.data.week==''){res.send("500: Err-> Incorrect date.");return;}
            var week = 'S'+req.body.data.week
            var nlFolder = req.body.data.newsData.currentPid.nlWorkingDir
            if (!fs.existsSync(nlFolder+week)){
                console.log("Creating Folder->", nlFolder+week)
                fs.mkdirSync(nlFolder+week)
            } else {
                console.log("ERR: Already exist.")
            }
            if (!fs.existsSync(req.body.data.folderData)){
                console.log("Creating Folder->", req.body.data.folderData)
                fs.mkdirSync(req.body.data.folderData)
                res.send(200)
                return
            } else {
                res.send("ERR: Already exist.")
            }
        } catch(e){
            console.log("ERR: CREATE")
            res.send(e)
        }
        return
    }
});

app.post('/read-exports',function(req,res){
    if(req.body.data.path){
        //console.log(JSON.stringify(req.body.data))
        //console.log(req.body.data.newsData.currentPid.nlWorkingDir)
        //console.dir(myJson.newsData.currentPid.id, {colors: true})
        try {
            if(fs.existsSync(req.body.data.path)){
                fs.readFile(req.body.data.path, function(err, data){
                    if(err){
                        console.log(err)
                        res.send(err)
                    }
                    res.send(data)
                })
            } else {
                res.send(404)
            }
        } catch(err){
            console.log(err)
            res.send(err)
        }
    } else {
        res.send("Path not valid. -> ", path)
    }
});

app.post('/open',function(req,res){
    if(!req.body.data){
        res.sendStatus(500)
        return;
    }
    open(req.body.data.cwd, {app: 'explorer'});
    //await open('https://sindresorhus.com', {app: ['google chrome', '--incognito'], wait: false});
    //console.log('The explorer window was closed');
    res.sendStatus(200)
});

app.post('/fs-copy',function(req,res){
    var from = req.body.data.from
    var to = req.body.data.to
    if(from && to){
        //console.log(JSON.stringify(req.body.data))
        //console.log(newsData.currentPid.nlWorkingDir)
        //console.dir(myJson.newsData.currentPid.id, {colors: true})
        try {
            if(fs.existsSync(from)!=='' && fs.existsSync(to)!==''){
                ncp(from, to, function (err) {
                    if (err) {
                      res.sendStatus(500)  
                      return console.error(err);
                    }
                    res.sendStatus(200)
                });
            } else {
                res.sendStatus(500)
                console.log("error wih paths")
            }
        } catch(err){
            console.log(err)
            res.send(err)
        }
    } else {
        res.sendStatus(400)
    }
});

app.post('/fs-save',function(req,res){
    var contents = req.body.data.contents
    var path = req.body.data.path
    console.log(contents)
    console.log(path)
    var fsforceWrite = (req.body.data.fsforceWrite==true)?true:false
    if(contents!=='' && '' !== path){
        try {
            if(!fs.existsSync(path)){
                fs.writeFile(path, contents, function (err) {
                    if (err) {
                        res.sendStatus(500)
                        console.log(`an error occured while saving new file: ${path}
                        contents: 
                        ${contents}`)
                        return
                    }
                    res.sendStatus(200)
                    console.log('File created successfully.')
                })
            } else {
                if(fsforceWrite){
                    fs.writeFile(path, contents, "utf8", function (err) {
                        if (err) {
                            res.sendStatus(500)
                            console.log(`an error occured while saving new
                            file: ${path}
                            fsforceWrite: ${fsforceWrite}

                            contents: ${contents}
                            
                            error(s): ${err}`)
                            return;
                        }
                        res.sendStatus(200)
                        console.log('File overwritten successfully.')
                        return;
                    })
                } else {
                    res.sendStatus(500)
                    console.log(`file: ${path} exists, fsforceWrite = ${fsforceWrite}`)
                }
            }
        } catch(err){
            console.log(err)
            res.send(err)
        }
    } else {
        res.sendStatus(400)
    }
});