import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading} from '../../actions/action';
import superagent from 'superagent';
import {fullZero, setDate} from '../../core/date';
import ScrollLoad from '../scrollload/ScrollLoad';
import {setToFixed} from '../../core/object';
let bBtn = true;



require('./jackpot.scss');

class Jackpot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            jackpot: [] // 中奖信息
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
                this.state.page = 0;
                this.state.jackpot = [];
            }
            this.state.page ++
            superagent.get(this.props.url).set('Accept', 'application/json').query({page: this.state.page, userCode: this.props.userCode }).then((res) => {
                // 有返回信息
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                            arrayList: [
                                {
                                    lotteryId: '1',
                                    issue: 1,
                                    lotteryName: 'iphone6s 34G',
                                    img: './images/1.png',
                                    countdown: 8000
                                },
                                {
                                    lotteryId: '5',
                                    issue: 5,
                                    lotteryName: 'iphone6s 34G',
                                    img: './images/1.png',
                                    countdown: 5000
                                },
                                {
                                    lotteryId: '2',
                                    issue: 2,
                                    lotteryName: 'iphone6s 34G',
                                    luckyNumber: '10000234',
                                    countdown: 0,
                                    img: './images/2.png',
                                    jackpotUser: '134***449',
                                    partakeCount: '129',
                                    lotteryTime: '2016-02-19 17:01:11',
                                }
                                ,
                                { // 已中奖数据结构
                                    lotteryId: '3',
                                    issue: 3,
                                    lotteryName: '移动50',
                                    luckyNumber: '10000999',
                                    img: './images/2.png',
                                    jackpotUser: '134***449',
                                    partakeCount: '10',
                                    allPartakeCount: '8000',
                                    share: 0,             // 0 => 未晒单 1 =》 已晒单
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
                            this.setState({
                                page: 'not'
                            })
                        } else {
                            if (elem != null) {
                                reset(elem);
                            }
                            setTimeout(()=>{
                                this.setState({
                                    jackpot: this.state.jackpot.concat(body.result.arrayList),
                                    page: this.state.page
                                })
                            this.countDown();

                            }, 1000)


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
    componentWillReceiveProps(nextProps){
       this.componentWillUnmount();
       this.loadFN(nextProps.args.elem, nextProps.args.reset);
    }
    getCountdownJackpot(lotteryId) {
        superagent.get('#/glodController/jackpot').set('Accept', 'application/json').query({lotteryId: lotteryId}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result:{
                        arrayList: [
                            {
                                lotteryId: '1',
                                issue:1,
                                lotteryName: 'iphone6s 64G',
                                img: './images/1.png',
                                jackpotUser: '134***222',
                                luckyNumber: '10000000',
                                partakeCount: '12',
                                lotteryTime: '2016-02-14 12:11:11',
                            }
                        ]
                    },
                    msg: '中奖信息'
                }
            }
            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {

                    let newJackpot = this.state.jackpot;

                    newJackpot.map((val, index) => {
                        if (val.lotteryId == lotteryId) {
                            newJackpot[index] = body.result.arrayList[0];
                        }
                    })
                    this.setState({
                        jackpot: newJackpot
                    })
                }
            }
        })
    }

    countDown(){

        function getCoundDownTime(str){
            let transTime = str,
                seconds = '',
                minutes = '',
                msecs = '';
            // 分钟
            if (transTime / 60000 > 0) {
                minutes = parseInt(transTime / 60000);
                transTime = transTime % 60000;
            }
            // 秒
            if (transTime / 1000 > 0) {
                seconds =  parseInt(transTime / 1000 );
                transTime = transTime % 1000;
            }

            // 百位十位毫秒
            if (transTime / 10 > 0) {
                msecs =  parseInt(transTime / 10 );
            }
            return fullZero(minutes) + ':' + fullZero(seconds) + ':' + fullZero(msecs);
        }

        // 如果是第一页数据才判断是否有临近开奖信息
        this.state.jackpot.map((val) => {

            if (val.countdown > 0) {

            clearInterval(val.timer);
                val.timer = setInterval(() => {
                    val.countdown -= 10;
                    val.showCountdown = getCoundDownTime(val.countdown);

                    if (val.countdown == 0) {
                        clearInterval(val.timer);
                        this.getCountdownJackpot(val.lotteryId);
                   }

                    this.setState({
                        jackpot: this.state.jackpot
                    })
                }, 10)

            }
        })
    }
    componentWillUnmount(){
        // 移除倒计时
        this.state.jackpot.map((val) => {
            if (val.timer) {
                clearInterval(val.timer)
            }
        })
    }
    render(){

        return(

                <div className="jackpot-cont">
                { this.state.jackpot.length > 0 ? <ul className="jackpot-list">
                    {
                        this.state.jackpot.map((val, index) => {
                        return (
                            <li key={index}>
                                <Link to={`commodity/${val.lotteryId}/${val.issue}`}>
                                    <div className="comd-left">
                                        <div className="c-l-img img" id={val.img}>
                                                {
                                                        val.share != undefined ?
                                                    <span className={val.share == 0 ? 'icon icon-share-n' : 'icon icon-share-y'}></span>
                                                    :
                                                    null
                                                    }
                                        </div>
                                    </div>
                                    <div className="comd-right">
                                        <h2>{val.lotteryName}</h2>
                                        <div>
                                            {
                                                val.countdown ?
                                                        val.countdown > 0 ?
                                                    <div className="jackpot-conntdown-body">
                                                        <p>开奖倒计时</p>
                                                        <div className="countdown">
                                                            <i className="icon icon-clock"></i>
                                                            <span className="text-orange">{val.showCountdown ? val.showCountdown : val.countdwon}</span>
                                                        </div>

                                                    </div>
                                                    :
                                                    <div>
                                                        <p>幸运号码：
                                                            <span className="text-orange">{val.luckyNumber}</span>
                                                        </p>
                                                        <p>获得者：
                                                            <span className="text-blue">{val.jackpotUser}</span>
                                                        </p>
                                                        <p>本期参与：
                                                            <span className="text-orange">{val.partakeCount}</span>
                                                        人次</p>

                                                        <p>开奖时间：{ setDate(val.lotteryTime) ? setDate(val.lotteryTime) : val.lotteryTime}</p>
                                                    </div>
                                                    :
                                                    <div>
                                                        <p>本期参与：
                                                            <span className="text-orange">{val.partakeCount}</span>
                                                        人次</p>
                                                        <p>回报率：
                                                            <span className="text-orange">{setToFixed(val.allPartakeCount / val.partakeCount)}</span>
                                                        倍</p>
                                                        <p>幸运号码：
                                                            <span className="text-orange">{val.luckyNumber}</span>
                                                        </p>
                                                        <p>开奖时间：{ setDate(val.lotteryTime) ? setDate(val.lotteryTime) : val.lotteryTime}</p>
                                                    </div>
                                                }
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            )
                    })
                        }
                    <li>
                        <ScrollLoad loadFN={() => this.loadFN()} page={this.state.page} />

                    </li>
                </ul>
                    :
                     bBtn ? <div className="not-data">{this.props.children}</div>: null
                    }
            </div>
            )
    }
}



export default connect()(Jackpot);