import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';


import superagent from 'superagent';
import Tab from '../../components/tab/Tab';
import Pane from '../../components/tab/Pane';

import CommodityList from '../../components/commodity/CommodityList';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import ScrollTransverse from '../../components/scrolltransverse/ScrollTransverse';
import Auth from '../../core/Auth';
Auth.setUserCode();
require('./goldparadise.index.scss')

class GoldParadiseIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultActiveKey: 0,
            args: {}
        }
    }

    jackpotLoad(elem, reset){

        // 中奖信息
        superagent.get('#/glodController/jackpot').set('Accept', 'application/json').then((res) => {
            // 有返回信息
            res = {
            ok: true,
                body: {
                    code: '0000',
                    result:{
                        arrayList: [
                            {
                                lotteryId: Math.random(),
                                issue: 1,
                                lotteryName: 'iphone6s 64G',
                                jackpotUser: '134***789'
                            },
                            {
                                lotteryId: '2',
                                issue: 2,
                                lotteryName: 'iphone6s 34G',
                                jackpotUser: '134***449'
                            }
                        ]
                    },
                    msg: '中奖信息'
                }
            }
            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    this.setState({
                        jackpot: body.result.arrayList,
                        args: {}
                    })
                }
            }
        })
    }

    loadFN(elem, reset){
        this.setState({
            args: {
                elem: elem,
                reset: reset
            }
        })
        this.jackpotLoad();
    }
    componentWillMount(){
        this.jackpotLoad()
    }
    render(){

        return(
            <div className="gold-index">
                <header id="header">
                    <a href="lanxun:back" className="go-back"></a>
                    <h1>一元购</h1>
                    <a className="header-control" href="xunlan:usercenter">我的</a>
                </header>
                <div className="body">
                    <Dorpdown callback={(elem, reset) => this.loadFN(elem, reset)} >
                        <section className="gold-nav">
                            <nav>
                                <Link to="newjackpot" className="nav-block">
                                    <i className="icon icon-jackpot"></i>
                                    <span>最新中奖</span>
                                </Link>
                                <Link to="sharelottery/0/0" className="nav-block">

                                    <i className="icon icon-wall"></i>
                                    <span>晒单墙</span>
                                </Link>
                                <a href="xunlan:problem" className="nav-block">
                                    <i className="icon icon-problem"></i>
                                    <span>常见问题</span>
                                </a>
                                <a href="xunlan:exchange" className="nav-block">
                                    <i className="icon icon-gold"></i>
                                    <span>充金币</span>
                                </a>
                            </nav>
                        </section>
                        <section className="show-jackpot-msg">
                            <ScrollTransverse data={this.state.jackpot}/>
                        </section>
                        <section className="gold-commodity">
                                <Tab defaultActiveKey={this.state.defaultActiveKey} >
                                <Pane title="最热奖品">
                                    <CommodityList url="#/goldController/hotcommodity" flag="hot" args={this.state.args}/>
                                </Pane>
                                <Pane title="全部奖品">
                                    <CommodityList url="#/goldController/allcommodity" flag="all" args={this.state.args}/>
                                </Pane>
                            </Tab>
                        </section>
                    </Dorpdown>
                </div>

            </div>
            )
    }
}

export default GoldParadiseIndex;