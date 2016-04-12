export default {
    component: require('../containers/App').default,
    childRoutes: [

        {
            path: '/',
            getComponents: (location, callback) => {
            require.ensure([], (require) => {
                    callback(null, require('../containers/goldparadise/Goldparadise.index').default)
                })
            }
        },
        {
            path: '/newjackpot',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {

                    callback(null, require('../containers/newjackpot/NewJackpot').default)
                })
            }
        },

        {
            path: '/commodity/:lotteryId/:issue',
            getComponents: (location, callback) => {
            require.ensure([], (require) => {
                    callback(null, require('../containers/goldparadise/Goldparadise.commoditydetail').default)
                })
            }
        },
        {
            path: '/lotteryimgshow/:lotteryId/:issue',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/goldparadise/Goldparadise.commodityshowimg').default)
                })
            }
        },
        {
            path: '/historylottery/:lotteryId/:issue',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/historylottery/HistoryLottery').default)
                })
            }
        },

        {
            path: '/sharelottery/:lotteryId/:issue',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/sharelottery/ShareLottery').default)
                })
            }
        },
        {
            path: '/sharelotterydetail/:lotteryId/:issue/:shareId',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/sharelottery/ShareLotteryDetail').default)
                })
            }
        },
        {
            path: '/showlottery/:index',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/usercenter/ShowLottery').default)
                })
            }
        },
        {
            path: '/address',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/address/Address').default)
                })
            }
        },
        {
            path: '/addaddress/:addressId',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/address/AddAddress').default)
                })
            }
        },
        {
            path: '/addressdetail/:addressId',
                getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/address/AddressDetail').default)
                })
            }
        }

    ]
}