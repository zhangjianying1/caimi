import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading, confirm, alert} from '../../actions/action';
import superagent from 'superagent';
import {Slider} from '../../components/slider/Slider';
import Tab from '../../components/tab/Tab';
import Pane from '../../components/tab/Pane';
import CommodityList from '../../components/commodity/CommodityList';
import Buy from '../../components/commodity/Buy';
import PartakeList from '../../components/list/PartakeList';
import ToggleShow from '../../components/toggleshow/ToggleShow';
import Confirm from '../../components/dialog/Confirm';
import Alert from '../../components/dialog/Alert';
import Header from '../header/Header';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import Lottery from './Lottery';
import {setToFixed} from '../../core/object';
import Auth from '../../core/Auth';
require('./commoditydetail.scss');

class GoldParadiseComodityDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lottery: {
                images: [],
                myPartake: [],
                takeLottery: {}
            },
            isShow: false,
            sendNotice: false,
            userCode: Auth.getUserCode('userCode')
        }


    }

    hideBuyLayer(){
        this.setState({
            isShow: false
        })
    }
    showBuyLayer(){
        this.setState({
            isShow: true
        })
    }


    subFn(number){

        if (number > 0) {

            //购买商品
            superagent.get('#/glodController/buylottery').set('Content-Type', 'application/x-www-form-urlencoded').
                send({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, number: number}).end((res) => {
                // 有返回信息
                res = {
                ok: true,
                body: {
                    code: '0000',
                    result: {}
                }
            }
            if (res.ok) {
                let body = res.body,
                    {dispatch} = this.props;

                    if (body.code === '0000') {
                        // 隐藏购买层
                        this.hideBuyLayer();
                        // 提示购买成功
                        dispatch(alert(true))
                    } else if (body.code === '2001') {

                    }
                }
            })
        } else {
            const {dispatch} = this.props;
            dispatch(confirm({bBtn: true}));

        }

    }
    componentWillMount(elem, reset){
        let {dispatch} = this.props;

        // 下拉刷新 (通知partakelist 更新数据)
        if (elem != null) {
            this.state.sendNotice = true;
        }


        // 显示加载loading
        dispatch(loading(true));
        // 商品信息
        superagent.get('#/glodController/lotterydetail').set('Accept', 'application/json').query({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',

                    result:{
                        lotteryType: '0', // 0 => 实物， 1=》虚拟
                        nextLotteryIssue: '111', // 下一期的期号
                        lotteryStatus: Math.floor(Math.random() * 3), // 0 =》 进行中 1 =》待开奖 2 =》已开奖
                        lotteryId: '1',
                        issue: 1,
                        lotteryName: 'iphone6s 64G',
                        lotteryDes: "iphone6s 64Giphone6s 64Giphone6s 64Giphone6s 64Giphone6s 64Giphone6s 64Giphone6s 64G",
                        lotteryStartTime: '2016-01-23 12:00:11',
                        price: "1",
                        total: 100,

                        buyTotal: 50,
                        images: ["./images/1.png","./images/2.png"],
                        myPartake: ['10000022'],
                        takeLottery: {
                            luckyNumber: 10000222,
                            userCode: 12,
                            userName: '小明',
                            userPhoto: './images/photo.png',
                            userAddress: '山东 青岛市',
                            partakeCount: 5,
                            lotteryTime: '2016-01-23 18:00:11',
                            takeLotteryStatus: 0, // 0 =》 未领奖， 1 =》未配送， 2 =》配送中, 3 =>签收异常 ， 4 =》签收
                            share: Math.floor(Math.random() * 2), // 0 =》 未分享， 1 =》已分享
                            shareId: 12222,
                            expressNumber: 123455,
                            expressName: '顺风快递'
                        },
                        msg: '商品'
                    }
                }
            }
            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    body.result.myPartake.sort();

                    this.setState({
                        lottery: body.result
                    })

                    if (elem != null) reset(elem);
                    dispatch(loading(false));
                }
            }
        })

    }
    // 下一期
    goTo(nextId){
        this.props.params.issue = nextId;
        this.componentWillMount();
    }
    // 充值
    exchangeHandle(){
        location.href = 'xunlan:exchange'
    }
    render(){
        let lottery = this.state.lottery;

    console.log(Auth.getUserCode('userCode'))
        return(
            <div className="">
                <Header title="奖品详情" />
                <div className="body commodity-detail">
                    <Dorpdown callback={(elem , reset) => this.componentWillMount(elem, reset)}>
                        <div className="lottery-show">
                            <section className="lottery-imgs">
                                <Slider data={lottery.images} autoPlay="off" loop="off" />
                            </section>
                            <section className="lottery-msg">
                                <div className="lottery-name">
                                    <span className="status-btn">

                                    {
                                        (lottery.lotteryStatus == 0) ? '进行中' :  (lottery.lotteryStatus == 1) ?  '待开奖'  : (lottery.lotteryStatus == 2) ? '已开奖'  : null
                                     }
                                    </span>
                                    <h2>{lottery.lotteryName}</h2>
                                </div>
                                <div className="lottery-des">
                                    {lottery.lotteryDes}
                                </div>
                                {
                                    lottery.lotteryStatus == 0 ?
                                        <div className="buy-progress">
                                            <div className="progress-line"><span style={{width: lottery.buyTotal / lottery.total * 100 + '%'}}></span></div>
                                            <div className="progress-line-sup"><div>总需人次：{lottery.total}</div><div><em>剩余人次：</em>{lottery.total-lottery.buyTotal}</div></div>
                                        </div>
                                        : lottery.lotteryStatus == 1 ?
                                        <div className="prompt-box waiting-lottery">等待开奖，请稍后......</div>
                                        : lottery.lotteryStatus == 2 ?
                                        <div className="show-lottery-msg">
                                            <div className="prompt-box lucky-lottery">
                                                <time className="fs11 fr">{lottery.takeLottery.lotteryTime}</time>
                                                <span className="fs11" >幸运号码：</span>{lottery.takeLottery.luckyNumber}
                                            </div>
                                            <div className="comd-cont lucky-lottery-show">
                                                <div className="comd-left">
                                                    <div className="c-l-img" style={{backgroundImage: `url(${lottery.takeLottery.userPhoto})`}}>
                                                         <span className="icon icon-king"></span>
                                                    </div>
                                                </div>
                                                <div className="comd-right">
                                                     <p>中奖者：<span className="text-blue">{lottery.takeLottery.userName}</span> （{lottery.takeLottery.userAddress}）</p>
                                                     <p>本期参与：{lottery.takeLottery.partakeCount}</p>
                                                     <p>回报率：<span className="text-orange">{setToFixed(lottery.total /lottery.takeLottery.partakeCount*lottery.price)}</span>倍</p>
                                                </div>
                                           </div>
                                        </div>
                                        : null
                                    }
                            </section>
                            <section className="user-partake">
                                {
                                    lottery.myPartake.length ?
                                        <ToggleShow>
                                            <h3 className="user-partake-tit">您已参与<span className="text-orange"> {lottery.myPartake.length} </span>人次 <i className="icon icon-dorp-btn"></i></h3>

                                            <ul className="user-partake-list">
                                                <li>参与号码</li>
                                                {
                                                    lottery.myPartake.map(function(val, index){
                                                        return <li key={index}>{val}</li>
                                                    })
                                                }
                                            </ul>
                                       </ToggleShow>
                                       :
                                        <p className="user-partake-tit">您还没参与呢，赶快试试吧！万一要中了呢？</p>
                                }
                           </section>
                       </div>
                       <section>
                            <ul className="other-list">
                                <li className="react "><Link className="go-to" to={`lotteryimgshow/${this.props.params.lotteryId}/${this.props.params.issue}`}><i className="icon icon-showimg"></i>图文详情</Link></li>
                                <li className="react"><Link className=" go-to" to={`historylottery/${this.props.params.lotteryId}/${this.props.params.issue}`}><i className="icon icon-history"></i>历史开奖</Link></li>
                                <li className="react"><Link className="go-to" to={`sharelottery/${this.props.params.lotteryId}/${this.props.params.issue}`}><i className="icon icon-share"></i>中奖晒单</Link></li>
                            </ul>
                       </section>
                       <section className="partake-all">
                           <div className="tit-header"><h3>用户参与记录（截止当前）</h3></div>
                           <PartakeList lotteryId={this.props.params.lotteryId} issue={this.props.params.issue} sendNotice={this.state.sendNotice}/>
                       </section>
                   </Dorpdown>
                </div>

            {lottery.lotteryStatus}
                {
                        lottery.lotteryStatus == 0 ?
                            <div className="fixed-bottom"><button onClick={() => this.showBuyLayer()}>立即参与</button></div>
                    : lottery.lotteryStatus == 1 || this.state.userCode !=  lottery.takeLottery.userCode?
                                <div className="fixed-bottom"><div className="pd-2 btn-disabled"><span onClick={() => this.goTo(lottery.nextLotteryIssue)} className="btn go-to" >最新一期火热进行中，快去看看</span></div></div>
                    : lottery.lotteryStatus == 2 ?
                     <Lottery {...this.props} lotteryType={lottery.lotteryType} nextLotteryIssue={lottery.nextLotteryIssue} takeLottery = {lottery.takeLottery}
                     userCode={this.state.userCode} /> : null
                    }

                <Buy subFn={(number) => this.subFn(number)} isShow={this.state.isShow} data={lottery} hideBuyLayer={() => this.hideBuyLayer()}/>
                <Confirm title="余额提醒" message="您的余额不足，请先充值" confirm={this.confirm} btnLeftText="取消" btnRightText="充值" btnRightFN={() => this.exchangeHandle()} />

                <Alert title="恭喜您参与成功" message="请等待系统开奖！" btnText="我知道了" />
            </div>
            )
    }
}



export default connect()(GoldParadiseComodityDetail);
