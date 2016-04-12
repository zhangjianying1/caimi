import React from 'react';

import {connect} from 'react-redux';
import {loading, comment} from '../../actions/action';
import superagent from 'superagent';

import CmTemp from './CmTemp';
let bBtn = true;


require('./comment.scss');


class Commont extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            commentList: [],
            page: 0,
        }
    }

//    shouldComponentUpdate(nextProps, nextState) {
//
//        if (nextProps.lotteryId) {
//            return true;
//        } else {
//            return false;
//
//        }
//    }

    componentWillReceiveProps(nextProps) {
console.log(nextProps)
        if (nextProps.sendNotice) {
            this.state.page = 0;
            this.loadFN();
        }
        console.log(nextProps.commentData.length)
        if (nextProps.commentData.length) {
            this.setState({
                commentList : this.state.commentList.concat(nextProps.commentData)
            })
        }
    }

    componentWillMount(){
        this.loadFN();
    }

    loadFN(arg){
        let {dispatch, commentData} = this.props;
        //
        if (bBtn) {
            bBtn = false;
            // 显示加载
            dispatch(loading(true));
            this.state.page ++;

            superagent.get('#/glodController/sharelotterycommont').set('Accept', 'application/json').
                query({lotteryId: this.props.lotteryId, issue: this.props.issue, shareId: this.props.shareId, page: this.state.page}).then((res) => {

                // 有返回信息
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                            arrayList: [

                                {
                                    commentId: '3',
                                    userCode: '123456',
                                    userPhoto: './images/2.png',
                                    userName: '134***432',
                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
                                    commentTime: '2016-01-25 14:25:11',
                                    replyList: ''
                                },
                                {
                                    commentId: '3',
                                    userCode: '123456',
                                    userPhoto: './images/2.png',
                                    userName: '134***456',
                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
                                    commentTime: '2016-01-21 11:11:11',
                                },
                                {
                                    commentId: '3',
                                    userCode: '123456',
                                    userPhoto: './images/2.png',
                                    userName: '134***449',

                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
                                    commentTime: '2016-01-21 11:11:11',
                                    replyList: [
                                        {
                                            replyUser: '134***449',
                                            replyMsg: '中奖了吗？',
                                        }

                                    ]
                                }

                            ]
                        },

                        msg: '评论信息'
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

                             this.setState({
                                 commentList : this.state.commentList.concat(body.result.arrayList)
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

    render(){
        return( <CmTemp {...this.props} commentList= {this.state.commentList} loadFN={() => this.loadFN()} page={this.state.page}/>)
    }
}


export default connect()(Commont);
