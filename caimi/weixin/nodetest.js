var fs = require('fs');
var file = fs.createReadStream('./nodetest.txt', {start:3, end: 11});
file.on('open', function(fd){
    console.log('打开文件');
})
file.on('data', function(data){
    console.log('读取文件')
    console.log(data.toString())
})
// 暂停
file.pause();
setTimeout(function(){
    // 恢复
    file.resume();
}, 2000)

file.on('end', function(){
    console.log('文件已读取完')
})
file.on('close', function(){
    console.log('关闭文件')
})
file.on('error', function(err){
    console.log('文件读取失败')
})