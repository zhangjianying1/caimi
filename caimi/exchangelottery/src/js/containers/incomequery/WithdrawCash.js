import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {alert} from '../../actions/action';
import Alert from '../../components/dialog/Alert';
import {post} from '../../utils/ajax';
require('./withdrawcash.scss');

class WithdrawCash extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            alertData: {
                html: function(){}
            },
            defaultVal: 10,
            defaultAccount: '支付宝'
        }
    }
    showLayer(label){
        let alertData = {
            applyError: {
                title: '温馨提示',
                html: () => {
                    return( <p className="msg">
                    提现金额不能小于10元
                    </p>)
                }
            },
             applySuccess: {
                 title: '温馨提示',
                 html: () => {
                    return( <p className="msg">
                    您的提现申请已成功提交
                    </p>)
                }
            },
            selectAccount: {
                title: '选择提现账号',
                    html: () => {
                    return (   <ul className="select-list">
                        <li className="go-to" onClick={() => this.selectHandler('支付宝')}>
                        支付宝w@126.com
                        </li>
                        <li className="go-to" onClick={() => this.selectHandler('微信钱包')}>
                        微信钱包
                        </li>
                    </ul>)
                }
            }
        },
        {dispatch} = this.props;

        this.setState({
            alertData: alertData[label]
        })
        dispatch(alert(true))

    }
    selectHandler(label){
        this.setState({
            defaultAccount: label
        })
        let {dispatch} = this.props;
        dispatch(alert(false))
    }
    changeHandler(e){
        let val = e.target.value.replace(/$0|[^\d]/g , '');
        this.setState({
            defaultVal: val
        })
    }
    // 申请提现
    applyWithdraw(){

        if (this.state.defaultVal < 10) {
            this.showLayer('applyError');
            return;
        }

        post({
            dispatch: this.props.dispatch,
            url: '',
            sendData: {
                price: this.state.defaultVal,
                account: this.state.defaultAccount
            },
            callback: (data) => {

            }
        })
    }
    render(){
        return(
            <div className="apply-cash">

                <section className="apply-input">
                    <div>
                        <input type="tel" value={this.state.defaultVal} onChange={(e) => this.changeHandler(e)} className="bor-none"/>元
                    </div>
                    <div className="go-to" onClick={() => this.showLayer('selectAccount')}>
                    {this.state.defaultAccount}
                    </div>
                </section>
                <div className="column-two apply-des">
                    <div>
                        <span className="column-strong"><em className="c-red">600.00</em> 元</span>
                        <p>可提现金额</p>
                    </div>
                    <div>
                        <span className="column-strong">24小时之内</span>
                        <p>预计到账时间</p>
                    </div>
                </div>
                <div className="warm-tips">
                双休日及节假日不处理提现业务
                </div>
                <div className="fixed-btns">
                    <a href="javascript:;" onClick={() => this.applyWithdraw() } className="btn btn-primary">申请提现</a>
                    <Link to="withdrawcashrecord" className="btn btn-bor">查看提现记录</Link>
                </div>
                <Alert title="温馨提示">
                {this.state.alertData.html()}
                </Alert>
            </div>


            )
    }
}

export default connect()(WithdrawCash);