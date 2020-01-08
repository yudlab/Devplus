var fs = require('fs');
var path = require('path');

function readDirectory(dir, callback){

    if(!dir){
        callback("Error: no path defined.", dir)
    }
    
    fs.readdir(dir, function(err, items) {

        if(err){
            callback("Error:"+err.errno);
            return;
        }
        
        var Logs = [];
        items.forEach(function (item){
            var filePath = path.join(dir, item);
            var stat = fs.statSync(filePath);
            Logs.push([stat.isFile(), filePath]);
        })
        callback(JSON.stringify(Logs));
        
    }); 
}
exports.readDirectory = readDirectory;


// function readDirectory(dir, callback){
//     var Logs = [];
//     fs.readdir(dir, function(err, items) {
//     var stat = fs.statSync(filePath);
//        Logs.push(items, items.isFile());
//        callback(Logs);       
//     }); 
// }
// exports.readDirectory = readDirectory;