const express = require('express')
const app = express()
var cors = require('cors');
const port = 3000
var pids = require('./SERVER/sites.json');


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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