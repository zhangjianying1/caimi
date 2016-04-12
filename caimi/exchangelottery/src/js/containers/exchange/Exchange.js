import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';
import Confirm from '../../components/dialog/Confirm';
import Alert from '../../components/dialog/Alert';
import {loading , confirm , alert} from '../../actions/action';
import {post} from '../../utils/ajax';
require('./exchange.scss');
class Exchange extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            exchangeCode: props.params.code,
            exchangeMsg: '',
            errorT: ''
        }



    }
    componentWillMount(){
        post({
            url: '/',
            sendData: {
                code: this.state.exchangeCode
            },
            callback: (data) => {
                console.log(data)
                this.setState({
                    exchangeMsg: data
                })
            }
        })
    }
    showConfirm(){
        let {dispatch} = this.props;
        dispatch(confirm({bBtn: true}));
    }
    showAlert(){
        let {dispatch} = this.props;
        dispatch(alert(true));
    }
    btnRightFN(){

        post({
            url: '/',
            sendData: {code: this.props.params.code.split('-').join('')},
            callback: (data) => {
data = {status:0}
                if (data.status == 0)
                    this.showAlert();
                else
                    this.setState({
                        errorT: '兑换失败'
                    })
            }
        })
    }

    successFN(){
        let {history , params} = this.props;
        history.push('exchangesuccess/' + params.code);
    }
    render(){

        return(
            <div className="exchange">
                <div className="coupon-des">
                    <div className="coupon">
                        <div className="c-header">
                        兑换码
                        </div>
                        <div className="c-number">
                        {this.state.exchangeCode}
                        </div>
                        <div className="c-status c-red">
                        {this.state.errorT}
                        </div>
                    </div>
                </div>

                <div className="fixed-btns">
                    <a href="javascript:;" className="btn btn-primary btn-primary-disabled" onClick={() => this.showConfirm()}>兑换</a>
                    <a href="" className="btn btn-bor">取消</a>
                </div>
                <Confirm title="确认兑换" message="您确定要使用该卡券吗？" btnRightFN={() => this.btnRightFN()}>  <p className="msg">
                你确定要使用该卡券吗？
                </p>
                </Confirm>
                <Alert title="兑换成功" func={() => this.successFN()} >

                    <p className="msg">
                    卡券{this.state.exchangeCode}
                    <br/>
                    已成功兑换，兑换金额 <em className="c-red">2.00</em>元。
                    </p>
                </Alert>
                </div>

            )
    }
}

export default connect()(Exchange);