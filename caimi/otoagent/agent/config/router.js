va role = require('../config/role');
var index = require('../routes/index')
var login = require('../routes/entry/login');
var agentManage = require('../routes/agentmanage/adduser');
var province = require('../routes/address/province');
var city = require('../routes/address/city');
var area = require('../routes/address/area');
var userSearch = require('../routes/agentmanage/usersearch');
var userStatistics = require('../routes/agentmanage/userstatistics');
var userlogin = require('../routes/agentmanage/userlogin')
module.exports = function(app) {
    app.use('/', role.islogin, role.isAuthority, index);

    app.use('/adminController/login', login)
    app.use('/adminController/addagent', role.islogin, role.isAuthority, agentManage);
    app.use('/adminController/province', province);
    app.use('/adminController/city', city);
    app.use('/adminController/area', area);
    app.use('/adminController/usersearch', role.islogin, role.isAuthority, userSearch);
    app.use('/adminController/userstatistics', role.islogin, role.isAuthority, userStatistics);
    app.use('/adminController/userlogin', userlogin);
}