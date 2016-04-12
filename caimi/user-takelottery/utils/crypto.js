var crypto = require('crypto');

exports.sha1 = function(str){
    return setCrypto('sha1', str);

}
exports.md5 = function(str){
    return setCrypto('md5', str);
}

function setCrypto(type, str){
    var shasum = crypto.createHash(type);
    shasum.update(str);
    return shasum.digest('hex');
}