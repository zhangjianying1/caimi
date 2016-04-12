import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
import {connect} from 'react-redux';
import Input from '../../components/input/Input';
import Header from '../../containers/header/Header';
import {error, userCenter} from '../../actions/action';
import hideNumber from '../../core/hideNumber';
require('../../../css/setrealname.css')
class SetRealName extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            realName: '',
            realCode: '',
            bindText: '确认绑定'
        }
    }
    subForm(e){
        e.preventDefault();
        let state = this.state;
        let {dispatch, userCenterData} = this.props;

        if (!state.realName.value ) {
            dispatch(error('真实姓名不能为空'));
        } else if (state.realName.msg){
            dispatch(error(state.realName.msg));
        } else if (!state.realCode.value) {
            dispatch(error('身份证号不能为空'));
        } else if (state.realCode.msg) {
            dispatch(error(state.realCode.msg));
        } else if (state.bindText !== '确认绑定') {
            dispatch(error('发送中请稍后'));
        } else {
            this.setState({
                bindText: '绑定中...'
            })
            superagent.post('/userController/realEdit').set('Content-Type', 'application/x-www-form-urlencoded').send({realName: state.realName.value, cardCode: state.realCode.value}).then((data) => {

                if (data.ok) {
                    let body = data.body;
                    this.setState({
                        bindText: '确认绑定'
                    })
                    if (body.code === '0000') {

                        // 更新 userCenterData
                        userCenterData.realName = state.realName.value;
                        userCenterData.cardCode = state.realCode.value;
                        dispatch(userCenter(userCenterData));
                        history.back();
                    } else {
                        dispatch(error(body.msg));
                    }
                }

            })
        }
    }
    inputHandle(name, val, msg){
        let options = {};
        options[name] = {
            value: val,
            msg: msg
        };
        this.setState(options)
    }
    render(){
        let status = this.props.location.query && this.props.location.query.status;
        let {userCenterData} = this.props;
        return (
            <div>
                <Header title="实名信息" />
                <div className="body">
                    <section className="pd2-conet forget-psd">
                    {
                        status ?
                        <div className="real-name">
                            <p><span>真实姓名：</span><span>{userCenterData.realName}</span></p>
                            <p><span>身份证号：</span><span>{hideNumber(userCenterData.cardCode, -4)}</span></p>
                        </div>
                        :
                        <form onSubmit={(e) => this.subForm(e)} noValidate>
                            <div className="g-input">
                                <label className="label">真实姓名：</label>
                                <Input inputHandle={(name, val, msg) => this.inputHandle(name, val, msg)} minlength="2" msg="真实姓名" type="text" pattern="^[\u4e00-\u9fa5\.]{2,7}$" name="realName" required placeholder="绑定后不能修改"  />
                            </div>
                            <div className="g-input">
                                <label className="label">身份证号：</label>
                                <Input inputHandle={(name, val, msg) => this.inputHandle(name, val, msg)} type="text"
                                name="realCode" required placeholder="中奖提款的唯一凭证" msg="身份证" pattern="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" />
                            </div>
                            <div className="sub-btns">
                                <button type="submit" className="button btn-primary">{this.state.bindText}</button>
                            </div>
                        </form>
                    }

                        <div className="prompt">
                            <dl>
                                <dt>注意事项</dt>
                                <dd>
                                    <p>1.真实姓名与银行卡开户名必须一致，绑定后不可修改。</p>
                                </dd>
                                <dd>
                                    <p>2.身份证号是中奖提款的唯一凭证，提交后不可修改，请填写真实信息。</p>
                                </dd>
                                <dd>客服电话：<a href="tel:400-6666-780">400-6666-780</a></dd>
                            </dl>
                        </div>
                    </section>
                </div>
            </div>
            )
    }
}
let init = (state) => {
    return {
        userCenterData: state.userCenter
    }
}
export default connect(init)(SetRealName);