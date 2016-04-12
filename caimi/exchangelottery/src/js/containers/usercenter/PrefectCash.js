import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {alert , confirm} from '../../actions/action';
import {post} from '../../utils/ajax';
import Header from '../../components/header/Header';
import Confirm from '../../components/dialog/Confirm';
import Alert from '../../components/dialog/Alert';
require('./prefectcash.scss');
class PrefectCash extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cashData: {},
            confirmData: {
                title: '',
                html: function(){},
                func: function(){}
            },
            alertData: {
                html: function(){}
            },
            errorT: '',
            btnRightT: '确定'
        }
    }
    showLayer(type , flag , param){

        let This = this , confirmData = {
            setCash: {
                title: '提现密码',
                html: () => {
                    return (
                        <dl className="modify-user"><dt><h3>此密码仅作为提现使用</h3></dt>
                        <dd className="input-box"><input ref="oldpsd" className="small-input" type="text" placeholder="请输入原始密码"/></dd>
                        <dd className="input-box"><input ref="psd" className="small-input" type="text" placeholder="请输入六位数字"/></dd>
                        <dd className="input-box"> <input ref="repeatpsd" className="small-input" type="text" placeholder="再次输入六位数字"/>
                            <em className="c-red error">{this.state.errorT}</em></dd></dl>
                    )},
                func: (fn) => {
                    let oldPsdVal = ReactDOM.findDOMNode(this.refs.oldpsd).value,
                        newPsdVal = ReactDOM.findDOMNode(this.refs.psd).value,
                        repeatPsdVal = ReactDOM.findDOMNode(this.refs.repeatpsd).value,
                        sixNumberRE = /^[\d]{6}$/i;

                    // 原密码
                    if (!sixNumberRE.test(oldPsdVal)) {
                        this.setState({
                            errorT: '原密码输入不正确'
                        })
                    } else if (!sixNumberRE.test(newPsdVal)) {
                        this.setState({
                            errorT: '新密码格式不正确'
                        })
                    } else if (!sixNumberRE.test(repeatPsdVal) || newPsdVal !== repeatPsdVal) {
                        this.setState({
                            errorT: '重复密码输入不正确'
                        })
                    } else {
                        //修改提现密码
                        this.setState({
                            btnRightT: '提交中...'
                        })
                        post({
                            url: '/',
                            sendData: {
                                oldpassword: oldPsdVal,
                                newPassword: newPsdVal,
                                repeatPassword: repeatPsdVal
                            },
                            callback: (data) => {

                                fn();
                                // 修改成功提示
                                this.showLayer('alert' , 'payPsd' , newPsdVal);
                                this.setState({
                                    btnRightT: '确定'
                                })
                            }
                        })
                    }
                }
            },
            modifyCash: {
                title: '提现密码',
                    html: () => {
                    return (
                        <dl className="modify-user"><dt><h3>此密码仅作为提现使用</h3></dt>
                        <dd className="input-box"><input ref="psd" className="small-input" type="text" placeholder="请输入六位数字"/></dd>
                        <dd className="input-box"><input ref="repeatpsd" className="small-input" type="text" placeholder="再次输入六位数字"/><em className="c-red error">
                        {this.state.errorT}</em></dd></dl>
                    )},
                    func: (fn) => {
                    let psdVal = ReactDOM.findDOMNode(this.refs.psd).value,
                        repeatPsdVal = ReactDOM.findDOMNode(this.refs.repeatpsd).value,
                        sixNumberRE = /^[\d]{6}$/i;

                    if (!sixNumberRE.test(psdVal)) {
                        this.setState({
                            errorT: '密码格式不正确'
                        })
                    } else if (!sixNumberRE.test(repeatPsdVal) || psdVal != repeatPsdVal) {
                        console.log('repeat')
                        this.setState({
                            errorT: '重复密码输入不正确'
                        })
                    } else {
                        //修改提现密码
                        this.setState({
                            btnRightT: '提交中...'
                        })
                        post({
                            url: '/',
                            sendData: {
                                passwrod: psdVal,
                                repeatPassword: repeatPsdVal
                            },
                            callback: (data) => {
                                fn();
                                // 修改成功提示
                                this.showLayer('alert' , 'payPsd' , psdVal);
                                this.setState({
                                    btnRightT: '确定'
                                })
                            }
                        })
                    }
                }
            },
            zhifubao: {
                title: '支付宝',
                html: () => { return (<dl className="modify-user">
                    <dt><h3>绑定<span className="c-red">实名认证</span>过的支付宝账号</h3></dt>
                    <dd className="input-box"><input ref="name" className="small-input" type="text" placeholder="支付宝收款人姓名"/></dd>
                    <dd className="input-box"><input ref="account" className="small-input" type="text" placeholder="支付宝收款人账号"/><em className="c-red error">{this.state.errorT}</em></dd></dl>)},
                func: (fn) => {
                    let nameVal = ReactDOM.findDOMNode(this.refs.name).value,
                        accountVal = ReactDOM.findDOMNode(this.refs.account).value,
                        notEmptyRE = /\S/i;

                    if (!notEmptyRE.test(nameVal)) {
                        this.setState({
                            errorT: '姓名不能为空'
                        })
                    } else if (!notEmptyRE.test(accountVal)) {

                        this.setState({
                            errorT: '收款人账号不能为空'
                        })
                    } else {
                        //修改提现密码
                        this.setState({
                            btnRightT: '提交中...'
                        })
                        post({
                            url: '/',
                            sendData: {
                                name: nameVal,
                                account: accountVal
                            },
                            callback: (data) => {
                                    fn();
                                // 修改成功提示
                                this.showLayer('alert' , 'cashType');
                                this.setState({
                                    btnRightT: '确定'
                                })
                            }
                        })
                    }
                }
            },
            weixin: {
                title: '微信钱包',
                    html: () => {return (<dl className="modify-user">
                    <dt><h3>请填写<span className="c-red">绑定微信钱包</span>的银行卡姓名</h3></dt>
                    <dd className="input-box"><input ref="name" className="small-input " type="text" placeholder="微信收款人姓名"/> </dd></dl>)},
                    func: (fn) => {
                        let nameVal = ReactDOM.findDOMNode(this.refs.name).value,
                            notEmptyRE = /\S/i;

                        if (!notEmptyRE.test(nameVal)) {
                            this.setState({
                                errorT: '姓名不能为空'
                            })
                        } else {
                            //修改提现密码
                            this.setState({
                                btnRightT: '提交中...'
                            })
                            post({
                                url: '/',
                                sendData: {
                                    name: nameVal
                                },
                                callback: (data) => {
                                    fn();
                                    // 修改成功提示
                                    this.showLayer('alert' , 'cashType');
                                    this.setState({
                                        btnRightT: '确定'
                                    })
                            }
                        })
                    }
                }
            }
        },
        alertData = {
            // 提现方式
            cashType: {
                title: '添加成功',
                html: () => {return( <p className="msg">您可以到<span className="c-red">收入查询</span>申请提现</p>)},
                func: () => {}
            },
            // 支付密码
            payPsd: {
                title: '添加成功',
                html: () => {return(<p className="msg">您牢记，您的密码：<span className="c-red">{param}</span></p>)},
                func: () => {}
            }
        },
        {dispatch} = this.props;

        if (type == 'alert') {
            this.setState({alertData : alertData[flag]});
            dispatch(alert(true));
        } else {
            this.setState({confirmData : confirmData[flag]});
            dispatch(confirm({bBtn: true}));
        }

    }
    getData(data){
        data = {
            isPassword: true
        }
        this.setState({
            cashData: data
        })
    }
    render(){
    console.log(this.state.btnRightT)
        return(
            <div className="withdrawcash">
                <Header disatch={this.props.dispatch} initFN={() => this.getData()} title="提现信息" url="/" sendData={{}}/>
                <section className="platform">
                    <div className="">
                        <img src="../images/logo_zhifubao_03.png" />
                        <em>支付宝账号</em>
                        <div className="add-btns">
                            <a href="javascript:;" className="btn-border" onClick={() => this.showLayer('confirm' , 'zhifubao')}>添加</a>
                        </div>
                    </div>
                    <div className="">
                        <img src="../images/logo_weixin_05.png" />
                        <em>微信钱包</em>
                        <div className="add-btns">
                            <a href="javascript:;" className="btn-border" onClick={() => this.showLayer('confirm' , 'weixin')}>添加</a>
                        </div>
                    </div>
                </section>
                <section className="apply-exchange-nav">
                    <ul className="nav-list">
                        <li>
                            <div className="nav-box react go-to" onClick={() => this.showLayer('confirm' , this.state.cashData.isPassword ? 'setCash' : 'modifyCash')}>
                                <div className="nav-icon">
                                    <i className="icon icon-password"></i>
                                </div>
                                <div className="nav-tit">
                                {this.state.cashData.isPassword ? '修改提现密码' : '添加提现密码'}
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>

                <Confirm title={this.state.confirmData.title} btnRightT={this.state.btnRightT} btnRightFN={(fn) => this.state.confirmData.func(fn)}>
                {this.state.confirmData.html()}
                </Confirm>
                <Alert title={this.state.alertData.title} >{this.state.alertData.html()}</Alert>

            </div>

            )
    }
}
export default connect()(PrefectCash);