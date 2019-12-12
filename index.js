const express = require('express')
const app = express()
var cors = require('cors');
const port = 3000
var pids = require('./SERVER/sites.json');
var fs = require('fs');
var path = require('path');


function walk(currentDirPath, callback, isRecursive = false) {
    fs.readdir(currentDirPath, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        files.forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                (isRecursive) ? walk(filePath, callback) : callback(filePath, stat);
                //walk(filePath, callback);
                //callback(filePath, stat);
            }
        });
    });
}

walk(__dirname+'/UI', function(filePath, stat) {
    console.log([stat.isDirectory(), stat.isFile(), filePath]);
}, true);



// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors());
app.get('/pids', (req, res) => res.send(pids))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



pid = {
    ftpUser: "",
    ftpPass: "",
    ftpHost: "",
    ftpPort: "xxx"
};
var ftp = {
    xftpUser : pid.ftpUser,
    xftpPass : pid.ftpPass,
    xftpHost : pid.ftpHost,
    xftpPort : pid.ftpPort,

    connect: function(user, pass, host, port) {
        //exec

        console.log( "PORT: ", this.xftpPort );

    }
}

ftp.connect();