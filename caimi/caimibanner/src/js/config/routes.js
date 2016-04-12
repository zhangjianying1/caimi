export default {
    component: require('../containers/App').default,
        childRoutes: [
        {
            path: '/extension',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/extension/Extension').default)
                })
            }
        },
        {
            path: '/extensiondetail',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/extension/ExtensionDetail').default)
                })
            }
        },
        {
            path: '/extensiondes',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/extension/ExtensionDes').default)
                })
            }
        },
        {
            path: '/usercenter',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/Usercenter').default)
                })
            }
        },
        {
            path: '/addadmin',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/AddAdmin').default)
                })
            }
        },
        {
            path: '/publicnumbermanage',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/PublicNumberManage').default)
                })
            }
        },
        {
            path: '/verificationphone/:mobile',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/VerificationPhone').default)
                })
            }
        },
        {
            path: '/editadmin',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/EditAdmin').default)
                })
            }
        },
        {
            path: '/activityrecord',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/ActivityRecord').default)
                })
            }
        },
        {
            path: '/extensionrecord',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/ExtensionRecord').default)
                })
            }
        },
        {
            path: '/extensionquery',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/extensionquery/ExtensionQuery').default)
                })
            }
        },
        {
            path: '/activity/:id',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/extensionquery/Activity').default)
                })
            }
        }
    ]
}