import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading, sharelottery, confirm} from '../../actions/action';
import superagent from 'superagent';
import {fullZero, setDate, getArrDate} from '../../core/date';
import Confirm from '../dialog/Confirm';

import ScrollLoad from '../scrollload/ScrollLoad';
let bBtn = true;

require('./sharelotterylist.scss');

class ShareLotteryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            delShareId: '',
            page: 0,
            shareLotteryList: [], // 中奖信息
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
                this.state.shareLotteryList = [];
            }
            this.state.page ++;
            let lotteryId = this.props.params.lotteryId || '';
            let issue = this.props.params.issue || '';

            // userCode 如果有就是用户自己的晒单，没有就是全部晒单
            superagent.get('#/glodController/share').set('Accept', 'application/json').query({page: this.state.page, lotteryId: lotteryId, issue: issue, userCode: this.props.userCode}).then((res) => {
                // 有返回信息
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                            arrayList: [
                                {
                                    lotteryId: 1,
                                    issue: 1,
                                    shareId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    userPhoto: './images/2.png',
                                    userName: '134***449',
                                    shareMsg: '中奖真不易，终于中了iphone6s 34G',
                                    shareImg: ['./images/1.png', './images/2.png'],
                                    shareTime: '2016-02-19 17:11:11',

                                    partakeCount: '10',
                                    allPartakeCount: '8000',
                                    luckyNumber: '100000222',
                                    commentCount: 2,
                                    praiseCount: 3

                                },
                                {
                                    lotteryId: 1,
                                    issue: 1,
                                    shareId: '2',
                                    lotteryName: 'iphone6s 64G',
                                    userPhoto: './images/2.png',
                                    userName: '134***449',
                                    shareMsg: '中奖真不易，终于中了iphone6s 34G',
                                    shareImg: ['./images/1.png', './images/2.png'],
                                    shareTime: '2016-01-22 11:11:11',
                                    partakeCount: '10',
                                    allPartakeCount: '8000',
                                    luckyNumber: '100000222',
                                    commentCount: 2,
                                    praiseCount: 3

                                },
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
                                page : 'not'
                            })
                        } else {
                            if (elem != null) {
                                reset(elem);

                                body.result.arrayList.unshift({
                                    lotteryId: 4,
                                    issue: 4,
                                    shareId: '5',
                                    lotteryName: 'iphone6s 64G',
                                    userPhoto: './images/1.png',
                                    userName: '134***449',
                                    shareMsg: '中奖真不易，终于中了iphone6s 34G',
                                    shareImg: ['./images/2.png', './images/2.png'],
                                    shareTime: '2016-01-22 11:11:11',
                                    partakeCount: '10',
                                    allPartakeCount: '8000',
                                    luckyNumber: '100000222',
                                    commentCount: 2,
                                    praiseCount: 3

                                })
                            }
                            setTimeout(() => {
                                this.setState({
                                    shareLotteryList: this.state.shareLotteryList.concat(body.result.arrayList),
//                                    page: this.state.page
                                })

                            }, 1000)

                            // 存晒单数据
                            dispatch(sharelottery(this.state.shareLotteryList));
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
        if (nextProps.args.elem) this.loadFN(nextProps.args.elem, nextProps.args.reset);
    }
    // 点击图片放大
    clickImg(e, shareId, index) {
        e.preventDefault();
        e.stopPropagation();
        let slideData = [];

        this.state.shareLotteryList.map(function(val){
            // 找到imges
            if (val.shareId == shareId) {
                slideData = val.shareImg;
            }
        })
        this.props.showSlider && this.props.showSlider(index, slideData);
    }
    //点赞
    clickPraise(e, lotteryId, issue, shareId){

        e.preventDefault();
        e.stopPropagation();
        let data = this.state.shareLotteryList;

        superagent.get('#/glodController/praise').set('Accept', 'application/json').query({lotteryId: lotteryId, issue: issue, shareId: shareId}).then((res) => {
            // praise 0 => 取消赞 1 =》点击成功
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result:{
                        praise: '1'
                    },
                    msg: 'ok'
                }
            }

            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {

                    data.map((val) => {
                        if (val.shareId == shareId) {

                            if (body.result.praise == 0) {
                                val.praiseCount--;
                                val.style ={
                                    WebkitTransform: 'scale(1)',
                                    transform: 'scale(1)'
                                };
                            } else {
                                val.praiseCount++
                                val.style = {
                                    WebkitTransform: 'scale(1.2)',
                                    transform: 'scale(1.2)'
                                };


                            }
                        }
                    })

                    this.setState({
                        shareLotteryList: data
                    })
                }
            }
        })
    }
    // 评论
    clickComment(e, lotteryId, issue, shareId){
        e.preventDefault();
        e.stopPropagation();

        const {dispatch, history} = this.props;
        // lotteryId 彩种的id  shareId 彩种下每次分享的id
        history.pushState(null, '/sharelotterydetail/' + lotteryId + '/' + issue + '/' + shareId);
    }
    // 删除晒单
    showConfirm(e, shareId){
        e.preventDefault();
        e.stopPropagation();
        let {dispatch} = this.props;
        this.state.delShareId = shareId;
        dispatch(confirm({bBtn: true}))
    }
    delHandle(){
        superagent.get('#/userController/delshare').set('Accept', 'application/json').query({shareId: this.state.delShareId}).then((res) => {

            res = {
                ok: true,
                body: {
                    code: '0000',
                    result:{},
                    msg: 'ok'
                }
            }

            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    let temp = this.state.shareLotteryList;

                    temp.forEach((val, index) => {
                        if (val.shareId == this.state.delShareId) {
                            temp.splice(index, 1);
                        }
                    })
                    this.setState({
                        shareLotteryList: temp
                    })
                }
            }
        })
    }
    render(){
        return(
            <div className={this.props.userCode ? 'date-list': null}>
                {this.state.shareLotteryList.length > 0 ?
                <ul className="share-lottery-list">
                    {
                        this.state.shareLotteryList.map((val, index) => {
                        return (
                            <li key={index}>
                                <Link to={`sharelotterydetail/${this.props.params.lotteryId}/${this.props.params.issue}/${val.shareId}`}>
                                    <div className="comd-cont share-lottery-comd">
                                        <div className="comd-left">

                                            <div className="c-l-img" style={!this.props.userCode ? {backgroundImage: `url(${val.userPhoto})`} : null}>

                                                {
                                                    this.props.userCode ? <span className="data-list-tag icon-date">
                                                        {getArrDate(val.shareTime)[1]}日

                                                        <i className="data-list-month">{getArrDate(val.shareTime)[0]}月</i>
                                                    </span>
                                                    :
                                                     null
                                                 }
                                            </div>
                                        </div>
                                        <div className="comd-right">

                                            <div className="share-cont">
                                                <h3 className="text-blue">{this.props.userCode ? val.lotteryName : val.userName}</h3>
                                                {val.lotteryName && !this.props.userCode ? <div className="get-lottery-name">活动商品：{val.lotteryName}</div> : null}
                                                <p className="share-message">{val.shareMsg}</p>
                                                <ul className="share-img-list">
                                                    {
                                                        val.shareImg.map((imgs, i) => {
                                                        return (<li onClick={(e) => {this.clickImg(e, val.shareId, i)}} key={i}
                                                        style={{backgroundImage: 'url(./images/pic.png)'}} className="load-img" ><img className="img" id={imgs} /></li>)
                                                    })
                                                        }
                                                </ul>
                                                <div className="share-hot">
                                                    <p className="share-hot-show">
                                                        <strong onClick={(e) => this.clickPraise(e, val.lotteryId, val.issue, val.shareId)}><i className="icon icon-praise" style={val.style}></i><span ref="praisecount">{val.praiseCount}</span></strong>
                                                        <strong onClick={(e) => this.clickComment(e, val.lotteryId, val.issue, val.shareId)}><i className="icon icon-comment"></i>{val.commentCount}</strong>
                                                    </p>
                                                    {
                                                        this.props.userCode ?
                                                            <div className="share-del"><span className="icon icon-del" onClick={(e) => this.showConfirm(e, val.shareId)}></span></div>
                                                        :
                                                            <time>{setDate(val.shareTime)}</time>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            )
                    })
                }
                <li>
                    <ScrollLoad loadFN={() => this.loadFN()} page={this.state.page} tipsText="数据全部加载完"/>
                </li>
                </ul>
                :
                    bBtn ? <div className="not-data">{this.props.children}</div> : null
                }
                <Confirm title="删除后别人就看不到您的晒单了" message="确认要删除吗？"  btnLeftText="取消" btnRightText="确定" btnRightFN={() => this.delHandle()} />
            </div>
            )
    }
}

ShareLotteryList.propTypes = {
    showSlider: React.PropTypes.func
}


export default connect()(ShareLotteryList);
