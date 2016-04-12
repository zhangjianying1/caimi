import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import superagent from 'superagent';

import {loading, commodity} from '../../actions/action'
import ScrollLoad from '../../components/scrollload/ScrollLoad';
require('./commoditylist.scss')
let bBtn = true;

class CommodityList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            commodity: [],
        }
    }


    componentWillMount(){
        let {allCommodity, hotCommodity, flag} = this.props;

        // 如果是最热商品有缓存
        if (hotCommodity && flag == 'hot') {
            this.setState({
                commodity: hotCommodity
                });
        }


        // 如果是最全部商品有缓存
        if (allCommodity && flag == 'all') {
            this.setState({commodity:allCommodity});
        }
        this.loadFN();
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.args.elem) this.loadFN(nextProps.args.elem, nextProps.args.reset)
    }
    loadFN(elem, reset){

        let {dispatch, url} = this.props;

        if (bBtn) {
            this.state.page ++;
            // 下拉刷新
            if (elem != undefined) {
                this.state.page = 1;
                this.state.commodity = [];

            }

            bBtn = false;
            // 显示加载
            dispatch(loading(true));

            // 商品列表
            superagent.get(this.props.url).set('Accept', 'application/json').query({page: this.state.page}).then((res) => {
                // 有返回信息
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                            arrayList: [
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },

                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                }
                                ,{
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                }
                                ,{
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                },
                                {
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                }
                                ,{
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/1.png"
                                }
                            ]
                        },
                        msg: '商品信息'
                    }
                }
                if (res.ok) {
                    let body = res.body;

                    if (body.code === '0000') {
                        dispatch(loading(false));

                        if (this.state.page >=3) {
                            this.state.page = 'not';
                            body.result.arrayList = [];
                        }
                        setTimeout(() => {
                            if (elem != null) {
                                body.result.arrayList.unshift({
                                    lotteryId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    issue: 1,
                                    total: 100,
                                    buyTotal: 50,
                                    img: "./images/2.png"
                                })
                            }
                            this.setState({
                                commodity: this.state.commodity.concat(body.result.arrayList)
                            })
                            // 只缓存第一页数据
                            if (this.state.page == 1) {
                                dispatch(commodity(this.props.flag.toUpperCase(), body.result.arrayList));
                            }
                            bBtn = true;

                            if (elem != undefined) {
                                reset(elem)
                            }

                        }, 300)



                    }
                }
            })
        }

    }

    render(){
        return(
            <div>
            {this.state.commodity.length > 0 ?
             <div>
                <ul className="commodity-list">
            {
                this.state.commodity.map((val, index) => {
                    return (
                        <li key={index}>
                            <Link to={`commodity/${val.lotteryId}/${val.issue}`}>
                                <div className="commodigy-img img" id={val.img}>

                                </div>
                                <div className="commodity-msg">
                                    <p className="commodity-name">{val.lotteryName}</p>
                                    <div className="commodigy-show-buy">
                                        <div className="buy-progress">
                                            <div className="progress-line">
                                                <span style={{width: val.buyTotal / val.total * 100 + '%'}}></span>
                                            </div>
                                            <div className="progress-line-sup">
                                                <div>{val.total}
                                                    <p>总需</p>
                                                </div>
                                                <div>{val.total - val.buyTotal}
                                                    <p>剩余</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="buy-btn" >参与</div>
                                    </div>
                                </div>
                            </Link>

                        </li>
                        )
                })
                }

                </ul>
                <ScrollLoad page={this.state.page} loadFN={() => this.loadFN()} />
                </div>
                :
                null
                }
            </div>
            )
    }
}

let init = (state) => {
    return {
        allCommodity: state.allCommodity,
        hotCommodity: state.hotCommodity
    }
}
export default connect(init)(CommodityList);