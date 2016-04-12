export default {
    component: require('../containers/App').default,
        childRoutes: [
        {
            path: '/exchange/:code',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/exchange/Exchange').default)
                })
            }
        },
        {
            path: '/inputexchange',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/exchange/InputExchange').default)
                })
            }
        },
        {
            path: '/exchangeSuccess/:couponcode',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/exchange/ExchangeSuccess').default)
                })
            }
        },
        {
            path: '/usercenter',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/UserCenter').default)
                })
            }
        },
        {
            path: '/prefectcash',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/PrefectCash').default)
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
            path: '/taskrecord',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/TaskRecord').default)
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
            path: '/invitationrecord',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/InvitationRecord').default)
                })
            }
        },
        {
            path: '/exchangerecord',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/ExchangeRecord').default)
                })
            }
        },
        {
            path: '/incomequery',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/incomequery/IncomeQuery').default)
                })
            }
        },
        {
            path: '/exchangequery',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/incomequery/ExchangeQuery').default)
                })
            }
        },
        {
            path: '/withdrawcash',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/incomequery/Withdrawcash').default)
                })
            }
        },
        {
            path: '/withdrawcashrecord',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/incomequery/WithdrawcashRecord').default)
                })
            }
        },

    ]
}