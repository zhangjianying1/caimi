var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('message', function(msg, info){
    console.log('server get:' + msg + 'form' + info.address + ':' + info.port);
    var message = new Buffer('success get message for client')
    server.send(message, 0, message.length, info.port, info.address);
});
server.on('listening', function(){
    var address = server.address();
    console.log(address.address + ':' + address.port)
});
server.bind(43314);
//var http = require('http');
//var formidable = require('formidable');
//var url = require('url');
//var util = require('util');
//var fs = require('fs');
//var querystring = require('querystring');
//var jade = require('jade');
//
//http.createServer(function(req, res){
//
//    var mimeType = req.url.substring(req.url.lastIndexOf('.'));
//
//    res.render = function(){
//        var arg1 = arguments[0];
//        var arg2 = arguments[1];
//        var file = fs.readFileSync(arg1, 'utf-8');
//        var fn = jade.compile(file, {template: arg1, pretty: false});
//        var page = fn(arg2);
//        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
//        res.end(page)
//
//    };
//    if (req.url == '/ok' && req.method.toLowerCase() == 'post') {
//        var form = new formidable.IncomingForm();
//        form.encoding = 'utf-8';		//设置编辑
//        form.uploadDir = 'D:/'	 //设置上传目录
//        form.keepExtensions = true;	 //保留后缀
//        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
//
//        form.parse(req, function(err, fileds, files){
//            console.log(util.inspect(files))
//            console.log(files.img.type)
//            console.log(files.img.path)
//            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
//
//            res.write('<img src="' + __dirname + '\images\tip.png" >');
//            fs.renameSync(files.img.path, 'D:/555.png');
//            res.end();
//
//        });
//    }
//    if (req.url == '/upload') {
//       res.render('./view/test.html', {title: '33'});
//
//    }
//        if (mimeType == '.png') {
//            pathname = url.parse(req.url).pathname;
//            var src = __dirname + pathname;
//
//
//            fs.exists(src, function(exists){
//
//                if (!exists) {
//                    res.writeHead('400', {'Content-Type': 'text/plain'});
//                    res.write('not-found')
//                    res.end();
//                } else {
//                    var fileStat = fs.statSync(src);
//                    var lastTime = fileStat.mtime.toUTCString();
//                    console.log(lastTime)
//                    console.log(lastTime == req.headers['if-modified-sice'])
//                    fs.readFile(src, function(err, file){
//
//                        if (err) {
//                            res.writeHead('500', {'Content-Type': 'text/plain'});
//                            res.write('services error');
//                            res.end();
//                        } else {
//                            res.setHeader('Expries', new Date());
//                            res.setHeader('Cache-Control', 'max-age=' + 300000);
//                            res.setHeader('Last-Modified', lastTime)
//                            res.writeHead('200', {'Content-Type': 'images/png'});
//                            res.write(file, 'binary');
//                            res.end();
//                        }
//                    })
//                }
//            })
//        }
//
//
//}).listen(8080);

//var req = http.request(options, function(req) {
//    var imgData = '';
//    req.setEncoding('binary');
//    req.on('data', function(chunk) {
//        console.log(imgData)
//        imgData += chunk;
//
//    });
//    req.on('end', function() {
//        fs.writeFile('D:/rrr.gif', imgData, 'binary', function(err){
//            if (err) {
//                console.log('image writing error:' + err.message);
//                return null;
//            }
//            else{
//                //console.log('image ' + filename + ' saved');
//                return true;
//            }
//        });
//    });
//});
//req.on('error', function(error) {
//    console.log(error);
//});
//req.end();
//var request = require('request');
//var fs = require('fs');
//request('http://o2o-sd-at.icaimi.com/h5/images/tc-logo.png', function(error, res, body) {
//    if (!error && res.statusCode == 200) {
//        request('http://o2o-sd-at.icaimi.com/h5/images/tc-logo.png').pipe(fs.createWriteStrema('D:/333.png'))
//    }
//})
