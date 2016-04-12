//import React from 'react';
//import {Router, Route} from 'react-router';
//
//import App from '../containers/App';
//import Login from '../containers/login/Login';
//import FindPsd from '../containers/login/FindPsd';
//import ForgetSetPsd from '../containers/login/ForgetSetPsd';
//import Lottery from '../containers/lottery/Lottery';
//import FootBall from '../containers/football/FootBall';
//import LotteryHistory from '../containers/lottery/LotteryHistory';
//import LotteryDetail from '../containers/lottery/LotteryDetail';
//import UserCenter from '../containers/usercenter/UserCenter';
//import ModifyUsername from '../containers/usercenter/ModifyUsername';
//import ManagePassword from '../containers/usercenter/ManagePassword';
//import SetPhone from '../containers/usercenter/SetPhone';
//import SetRealName from '../containers/usercenter/SetRealName';
//import createBrowserHistory from 'history/lib/createHashHistory'
//
//let history = createBrowserHistory();
//
//let routes = (
//    <Router history={history}>
//        <Route path="/" component={App}>
//            <Route path="login" component={Login}>
//            </Route>
//            <Route path="findpsd" component={FindPsd} />
//            <Route path="forgetsetpsd" component={ForgetSetPsd} />
//            <Route path="usercenter" component={UserCenter} />
//            <Route path="modifyusername" component={ModifyUsername} />
//            <Route path="managepassword" component={ManagePassword} />
//            <Route path="setphone" component={SetPhone} />
//            <Route path="setrealname" component={SetRealName} />
//            <Route path="lottery" component={Lottery} />
//            <Route path="football" component={FootBall}/>
//            <Route path="lotteryhistory" component={LotteryHistory}/>
//            <Route path="lotterydetail" component={LotteryDetail}/>
//
//
//
//        </Route>
//    </Router>
//    );
//let redirectLogin = (nextState, replaceState) => {
//
//        replaceState(null, '/login')
//
//
//}

export default {
    component: require('../containers/App').default,
    childRoutes: [


        {
            path: '/login',
            getComponents: (location, callback) => {
            require.ensure([], (require) => {
                    callback(null, require('../containers/login/Login').default)
                })
            }
        },
        {
            path: '/forgetsetpsd',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/login/ForgetSetPsd').default)
                })
            }
        },
        {
            path: '/findpsd',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/login/FindPsd').default)
                })
            }
        },
        {
            path: 'usercenter',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/usercenter').default)
                })
            }
        },
        {
            path: '/setphone',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/SetPhone').default)
                })
            }
        },
        {
            path: '/managepassword',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/Managepassword').default)
                })
            }
        },
        {
            path: '/modifyusername',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/ModifyUserName').default)
                })
            }
        },
        {
            path: '/setrealname',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/SetRealName').default)
                })
            }
        },
        {
            path: 'lottery',
            getComponent: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/lottery/Lottery').default)
                })
            }
        },
        {
            path: 'lotteryhistory/:lotteryId',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/lottery/LotteryHistory').default)
                })
            }
        },
        {
            path: 'lotterydetail/:issue',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/lottery/LotteryDetail').default)
                })
            }
        },
        {
            path: 'football',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/football/Football').default)
                })
            }
        }
    ]
}