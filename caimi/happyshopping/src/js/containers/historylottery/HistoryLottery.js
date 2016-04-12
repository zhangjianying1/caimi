import React from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import {loading} from '../../actions/action';
import superagent from 'superagent';
import Header from '../header/Header';
import {fullZero, setDate} from '../../core/date';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import ScrollLoad from '../../components/scrollload/ScrollLoad';
import HlTemp from './HlTemp';
let bBtn = true;


require('./historylottery.scss');

class HistoryLottery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            historyLotteryList: [] // 中奖信息
        }
    }
    loadFN(elem, reset){
        let {dispatch} = this.props;
        //
        if (bBtn) {

            bBtn = false;
            // 显示加载
            dispatch(loading(true));

            if (elem != null) {
                this.setState({
                    historyLotteryList : [],
                    page: 0
                })
            }
            this.state.page ++

            superagent.get('#/goldController/historylottery').
                query({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, page: this.state.page }).then((res) => {

                // 有返回信息
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                            arrayList: [

                                {
                                    lotteryId: '2',
                                    issue: '201',
                                    lotteryName: 'iphone6s 34G',
                                    luckyNumber: '10000234',
                                    img: './images/2.png',
                                    jackpotUser: '134***449',
                                    addres: '山东 青岛',
                                    partakeCount: '129',
                                    lotteryTime: '2016-01-21 11:11:11',
                                }

                                ,
                                {
                                    lotteryId: '3',
                                    issue: '202',
                                    lotteryName: '移动50',
                                    luckyNumber: '10000999',
                                    img: './images/2.png',
                                    addres: '山东 青岛',
                                    jackpotUser: '134***449',
                                    partakeCount: '129',
                                    lotteryTime: '2016-01-20 11:11:11',
                                }
                                ,
                                {
                                    lotteryId: '3',
                                    issue: '202',
                                    lotteryName: '移动50',
                                    luckyNumber: '10000999',
                                    countdown: 0,
                                    img: './images/2.png',
                                    addres: '山东 青岛',
                                    jackpotUser: '134***449',
                                    partakeCount: '129',
                                    lotteryTime: '2016-01-20 11:11:11',
                                }
                                ,
                                {
                                    lotteryId: '3',
                                    issue: '202',
                                    lotteryName: '移动50',
                                    luckyNumber: '10000999',
                                    countdown: 0,
                                    img: './images/2.png',
                                    addres: '山东 青岛',
                                    jackpotUser: '134***449',
                                    partakeCount: '129',
                                    lotteryTime: '2016-01-20 11:11:11',
                                }

                            ]
                        },
                        msg: '中奖信息'
                    }
                }
                if (res.ok) {
                    let body = res.body;

                    if (body.code === '0000') {

                        if (this.state.page == 3) {
                            body.result.arrayList = [];
                            this.setState({
                                page : 'not',
                            })
                        } else {
                            if (elem != null) {
                                reset(elem);
                                body.result.arrayList.unshift({
                                    lotteryId: '2',
                                    issue: '201',
                                    lotteryName: 'iphone6s 34G',
                                    luckyNumber: '10000234',
                                    img: './images/1.png',
                                    jackpotUser: '134***449',
                                    addres: '山东 德州',
                                    partakeCount: '129',
                                    lotteryTime: '2016-01-21 11:11:11',
                                })
                            }

                            this.setState({
                                historyLotteryList: this.state.historyLotteryList.concat(body.result.arrayList)
                            })
                        }

                        // 打开开关变量
                        bBtn = true;
                        dispatch(loading(false));
                    }
                }
            })
        }
    }
    componentWillMount(){
        this.loadFN();
    }
    render(){

        return(
            <div className="history-lottery">
                <Header title="历史开奖" />
                <div className="body">
                    <Dorpdown callback={(elem, reset) => this.loadFN(elem, reset)}>

                    {this.state.historyLotteryList.length > 0 ?
                        <HlTemp historyLotteryList={this.state.historyLotteryList} />
                        :
                        null
                    }
                        <ScrollLoad loadFN={() => this.loadFN()} page={this.state.page} tipsText="最多能看100期" />
                    </Dorpdown>

                </div>

            </div>
            )
    }
}

export default connect()(HistoryLottery);