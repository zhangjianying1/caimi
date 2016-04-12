var role = require('../config/role');
var index = require('../routes/index')
var login = require('../routes/entry/login');
var loginout = require('../routes/entry/loginout');
var getSession = require('../routes/entry/session');
var agentManage = require('../routes/agentmanage/adduser');
var agentDetail = require('../routes/agentmanage/agentdetail');
var changeUserStatus = require('../routes/agentmanage/changeuserstatus');
var loginLog = require('../routes/agentmanage/loginlog');
var province = require('../routes/address/province');
var city = require('../routes/address/city');
var area = require('../routes/address/area');
var userSearch = require('../routes/agentmanage/usersearch');
var userStatistics = require('../routes/agentmanage/userstatistics');

module.exports = function(app) {

    app.use('/', index);
    app.use('/adminController/session', getSession);
    app.use('/adminController/login', login)
    app.use('/adminController/loginout', loginout)
    app.use('/adminController/addagent', role.isOverdue,  agentManage);
    app.use('/adminController/agentdetail',agentDetail);
    app.use('/adminController/changeuserstatus', changeUserStatus)
    app.use('/adminController/loginlog',loginLog);

    app.use('/adminController/province',role.isOverdue,  province);
    app.use('/adminController/city', city);
    app.use('/adminController/area', area);
    app.use('/adminController/usersearch', role.isOverdue,  userSearch);
    app.use('/adminController/userstatistics', role.isOverdue,  userStatistics);
}