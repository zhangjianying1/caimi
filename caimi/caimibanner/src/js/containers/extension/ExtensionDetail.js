import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading} from '../../actions/action';
import superagent from 'superagent';
import Header from '../../components/header/Header';

require('./extension-detail.scss');

class Extension extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            extensionDetailData : {}
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
                        title: '理财知识'
                    },
                    msg: '商品'
                }
            }

            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    this.setState({
                        extensionDetailData: body.result
                    })
                    if (elem != null) reset(elem);
                    dispatch(loading(false));
                }
            }
        })

    }

    render(){
        return(
            <div className="finance">
                <Header title={this.state.extensionDetailData.title} />
                <div className="list-box user-msg">
                    <div className="l-b-left">
                        <img src="../images/lottery-logo.png" />
                    </div>
                    <div className="l-b-right">
                        <div className="l-b-des">
                            <h2>理财知识</h2>
                            <p>微信号：xt23d</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <ul className="text-list">
                        <li>
                            <label>活动编号</label>
                            <p>2016020100112</p>
                        </li>
                        <li>
                            <label>活动名称</label>
                            <p>2016020100112</p>
                        </li>
                        <li>
                            <label>活动描述</label>
                            <p>理财大讲堂,每天一堂必修课,祝您创造人生财富</p>
                        </li>
                        <li>
                            <label>活动时间</label>
                            <p>   2015年12月24日 0:00:00
                            至  2016年02月01日 23:59:5</p>
                        </li>
                        <li>
                            <label>推广渠道号</label>
                            <p>2016020100112</p>
                        </li>
                        <li>
                            <Link to="" className="react go-to">
                                <label>查看推广记录</label>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="finance-btn">
                    <Link to="extensiondes" className="btn btn-primary">
                    查看详情
                    </Link>
                </div>
            </div>

            )
    }
}



export default connect()(Extension);
