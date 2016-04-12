import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading, sharelottery, comment} from '../../actions/action';
import superagent from 'superagent';
import {fullZero, setDate} from '../../core/date';
import Header from '../header/Header';

import Dorpdown from '../../components/dorpdown/Dorpdown';
import Comment from '../../components/comment/Comment';
import Prompt from '../../components/dialog/Prompt';
import SldTemp from './SldTemp';
import {TopSlider , Slider} from '../../components/slider/Slider';
let bBtn = true;


require('./sharelotterydetail.scss');

class ShareLotteryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideData: [],
            sliderStyle: {display: 'none'},
            index: 0,
            shareLotteryDetailList: [], // 中奖信息
            lotteryId: 0,
            placeholder: '说点儿什么吧',
            sendData: {},
            commentData: [],
            sendNotice: false,
            prompt: false,
            bodyStyle: {
                overflowY: 'scroll',
                position: 'absolute',
                bottom: '.45rem'
            },
            fixedbottomStyle: {
                position: 'absolute'
            },
            headerStyle: {
                position: 'absolute'
            }
        }
    }

    componentWillMount(){
        const {dispatch, sharelotteryData} = this.props;

        // 读取 store 的信息
        sharelotteryData && sharelotteryData.map((val) => {
            if (val.shareId == this.props.params.lotteryId) {
                this.setState({
                    shareLotteryDetailList: [val]

                })
            }
        })

        this.loadFN();
    }
    default(e){
        e.preventDefault();
        e.stopPropagation()
    }
    componentDidMount(){
        let body = ReactDOM.findDOMNode(this.refs.body),
            header = ReactDOM.findDOMNode(this.refs.header),
            fixedbottom = ReactDOM.findDOMNode(this.refs.fixedbottom);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    componentWillUnmount(){
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }
    loadFN(elem, reset){

        let {dispatch} = this.props;
        //
        if (bBtn) {
            bBtn = false;
            // 显示加载
            dispatch(loading(true));

            // 下拉刷新
            if (elem != null) {
                // this.state 这种方式可以不触发子组件componentWillReceiveProps方法
                this.state.placeholder =  '说点儿什么吧';
                this.setState({
                    sendNotice : true
                })
            }
            superagent.get('#/glodController/sharelotterydetail').set('Accept', 'application/json').
                query({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, shareId: this.props.params.shareId }).then((res) => {
                // 有返回信息
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                            arrayList: [
                                {
                                    shareId: '1',
                                    lotteryName: 'iphone6s 64G',
                                    userPhoto: './images/2.png',
                                    userName: '134***449',
                                    shareMsg: '中奖真不易，终于中了iphone6s 34G',
                                    shareImg: ['./images/1.png', './images/2.png'],
                                    shareTime: '2016-01-21 11:11:11',
                                    partakeCount: '10',
                                    allPartakeCount: '8000',
                                    luckyNumber: 10000234,
                                    commentCount: 2,
                                    praiseCount: 3
                                }
                            ]
                        },
                        msg: '中奖信息'
                    }
                }

                if (res.ok) {
                    let body = res.body;

                    if (body.code === '0000') {

                        if (elem != null) {
                            reset(elem);
                            body.result.arrayList[0].shareImg.unshift('./images/3.png')

                        }

                        this.setState({
                            shareLotteryDetailList: body.result.arrayList,
                            sendNotice: false
                        })

                        // 打开开关变量
                        bBtn = true;
                        dispatch(loading(false));
                    }
                }
            })
        }
    }
    // 点击图片放大
    clickImg(e, shareId, index) {
        e.preventDefault();
        e.stopPropagation();
        let slideData = [];
        this.state.shareLotteryDetailList.map(function(val){
            // 找到imges

            if (val.shareId == shareId) {
                slideData = val.shareImg;

            }
        })

        // 延迟一下显示图片
        setTimeout(function(){
            this.setState({
                slideData: slideData,
                sliderStyle: {
                    display: 'block',
                },
                index: index
            })
        }.bind(this), 100)
    }

    hideSlider(){
        this.setState({
            sliderStyle: {
                display: 'none'
            }
        })
    }
    //点赞
    clickPraise(e, shareId){
        e.preventDefault();
        e.stopPropagation();
        let data = this.state.shareLotteryDetailList;

        superagent.get('#/glodController/praise').set('Accept', 'application/json').
            query({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, shareId: shareId}).then((res) => {
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
                        shareLotteryDetailList: data,
                        sendNotice: false, // 阻止子组件的更新
                    })
                }
            }
        })


    }
    replyHandle(comment){
        this.setState({
            placeholder: '回复' +　comment.userName,
            sendData: {
                replyUser: comment.userCode,        // 要回复人的uerCode
                commentMsg: comment.commentMsg,     // 要回复人发表的内容
            },
            commentData: [], // 清空上一次评论
            sendNotice: false, // 阻止子组件的更新

        })
        let textarea = ReactDOM.findDOMNode(this.refs.textarea);
        textarea.focus();


    }
    clickComment(e, shareId){

        this.setState({
            placeholder: '说点儿什么吧',
            sendNotice: false, // 阻止子组件的更新
            sendData: {}

        })
        let textarea = ReactDOM.findDOMNode(this.refs.textarea);
        textarea.focus();

    }
    releaseHandle(e){
        e.stopPropagation();
        e.preventDefault();
        let textarea = ReactDOM.findDOMNode(this.refs.textarea),
            sendValue = textarea.value;
        /**
         * 回复和评论一个接口，（回复只带有要回复人的id和回复人的发表内容）
         * @type {{ok: boolean, body: {code: string, result: {praise: string}, msg: string}}}
         */


        if (sendValue) {

            superagent.get('#/glodController/releasecomment').set('Accept', 'application/json').
                query({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, shareId: this.props.params.shareId, msg: textarea.value}).
                query(this.state.sendData).then((res) => {
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result: {
                            arrayList:[
                                {
                                    commentId: '3',
                                    userCode: '123456',
                                    userPhoto: './images/2.png',
                                    userName: '134***449',
                                    replyUser: '134***449',
                                    replyMsg: '中奖了吗？',
                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
                                    commentTime: '2016-01-21 11:11:11',
                                }]
                        },
                        msg: 'ok'
                    }
                }

                if (res.ok) {
                    let body = res.body;

                    if (body.code === '0000') {
                        this.setState({
                            placeholder: '说的儿什么吧',
                            prompt: true,
                            sendData: {},
                            commentData: body.result.arrayList
                        })
                        textarea.value = '';

                    }
                }
            })
        }

    }
    hide(){
        this.setState({
            prompt: false,
            commentData: []
        })
    }
    render(){
        let {shareLotteryDetailList} = this.state;

        return(
            <div className="share-lottery-detail-cont">
                <Header title="中奖晒单" style={this.state.headerStyle}/>
                <div className="body" style={this.state.bodyStyle}>
                    <Dorpdown callback={(elem, reset) => this.loadFN(elem, reset)}>
                       <SldTemp
                       clickComment={(e, shareId) => this.clickComment(e, shareId)}
                       clickPraise={(e, shareId) => this.clickPraise(e, shareId)}
                       clickImg={(e, shareId, index) => this.clickImg(e, shareId, index)}
                       shareLotteryDetailList={this.state.shareLotteryDetailList}
                       />
                       <Comment
                       lotteryId={this.props.params.lotteryId}
                       issue={this.props.params.issue}
                       shareId={this.props.params.shareId}
                       replyHandle={(comment) => this.replyHandle(comment)}
                       userName={shareLotteryDetailList[0] && shareLotteryDetailList[0].userName}
                       sendNotice={this.state.sendNotice} commentData={this.state.commentData}
                       />
                    </Dorpdown>
                </div>
                <form onSubmit={(e) => this.releaseHandle(e)}>
                    <div className="fixed-bottom" style={this.state.fixedbottomStyle}>
                        <div className="relsease-box">
                            <textarea ref="textarea" placeholder={this.state.placeholder} name="send-text"></textarea>
                            <button type="submit">发送</button>
                        </div>
                    </div>
                </form>
                <TopSlider style={this.state.sliderStyle} onClick={() => this.hideSlider()}>
                    <Slider data={this.state.slideData} index={this.state.index} />
                </TopSlider>
                <Prompt msg="表发成功" prompt={this.state.prompt} hide={(arg) => this.hide(arg)}/>
            </div>
            )
    }
}
let init = (store) => {
    return {
        sharelotteryData: store.sharelottery
    }
}
export default connect(init)(ShareLotteryList);