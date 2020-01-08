var fs = require('fs');
var path = require('path');

function readDirectory(dir, callback){

    if(!dir){
        callback("Error: no path defined.", dir)
    }
    
    try {
        fs.readdir(dir, function(err, items) {

            if(err){
                callback(JSON.stringify(err.errno));
                return;
            }
            
            var Logs = [];
            items.forEach(function (item){
                var filePath = path.join(dir, item);
                try {
                    var stat = fs.statSync(filePath);
                    Logs.push([(stat.isFile())?"file":"folder", filePath]);
                }
                catch(err){
                    console.log(err)
                    console.log(err.errno)
                    console.log(err.message)
                    Logs.push([err.errno, filePath]);
                }
            })
            callback(JSON.stringify(Logs));
        
        })
    }
    catch(err) {
        
        console.log(err)
        console.log(err.errno)
        console.log(err.message)
        return err.errno;
    }
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