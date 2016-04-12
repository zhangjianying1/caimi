import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import superagent from 'superagent';
import {alert , loading} from '../../actions/action';
import Header from '../../components/header/Header';
import Alert from '../../components/dialog/Alert';
import SendCode from '../../components/sendcode/SendCode'
import {post} from '../../utils/ajax';
require('./verification-phone.scss');
let bBtn = true;
/**
 * 添加管理员
 */
class VerificationPhone extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sendData: {},
            errorT: ''
        }
    }

    // 显示提示框
    showLayer(){
        const {dispatch} = this.props;
        dispatch(alert(true))

    }
    /**
     * 验证表单
     */
    verificationSub(){
        let mobileVal , codeVal;


        // 验证码不正确
        codeVal = this.verificationCode();
        // 手机号码不正确
        mobileVal = this.verificationPhone();

        this.state.sendData = {
            mobile: mobileVal,
            code: codeVal
        }

        if (!mobileVal || !codeVal) return false;
        return true;

    }
    verificationPhone(){
        let mobileVal = ReactDOM.findDOMNode(this.refs.mobile).value,
            mobileRE = /^1[23456789]\d{9}$/;

        // 手机号码不正确
        if (!mobileRE.test(mobileVal)) {
            this.setState({
                errorT: '手机号码不正确'
            })
            return false;
        }
        return mobileVal;
    }
    verificationCode(){
        let  codeVal = ReactDOM.findDOMNode(this.refs.code).value,
            codeRE = /^\d{6}$/;

        if (!codeRE.test(codeVal)) {
            this.setState({
                errorT: '验证码不正确'
            })
            return false;
        }
        return codeVal;
    }

    subFN(){


        // 验证表单
        let verificationBtn = this.verificationSub();

        // 限制开关
        if (verificationBtn) {
            // 提交隐藏错误信息
            this.setState({
                errorT: ''
            })
            let {dispatch} = this.props;
            post({
                dispatch: dispatch,
                url: '/',
                sendData: this.state.sendData,
                callback: (data) => {
                    this.showLayer();
                }
            })

        }
    }
    render(){
    console.log(this.state.errorT)
        return(
            <div className="verification-phone">
                <Header title="验证手机" />
                <dl>
                    <dt>
                        <img src="../images/verification-bg.png" />
                    </dt>
                    <dd>
                        <div className="input-box">
                            <label className="icon icon-phone"></label>
                            <input ref="mobile" className="big-input" type="tel" placeholder="请输入手机号"/>
                        </div>
                    </dd>
                    <dd>
                        <div className="input-box">
                            <label className="icon icon-verificationcode"></label>
                            <input ref="code" className="big-input" type="tel" placeholder="请输入验证码"/>
                            <SendCode verificationPhone={() => this.verificationPhone()}/>
                            <em className="error c-red">{this.state.errorT}</em>
                        </div>
                    </dd>
                    <dd>
                        <div className="v-p-btn">
                            <span onClick={() => this.subFN()} className="btn btn-primary">提交</span>
                        </div>
                    </dd>
                </dl>
                <Alert title={this.props.params.mobile != '0' ? '修改成功' : '添加成功'} >
                    <p className="msg">
                    {this.props.params.mobile != '0' ? '修改手机成功' : '添加手机成功'}
                    </p>
                </Alert>
            </div>
            )
    }
}

export default connect()(VerificationPhone)