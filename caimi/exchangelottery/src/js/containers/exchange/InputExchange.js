import React from 'react';
import {connect} from 'react-redux';
import {post} from '../../utils/ajax';
require('./exchange.scss')
//输入卡券兑换
class InputExchange extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            couponCode: '',
            errorT: ''
        }
    }
    changeHandler(e){
        let value = e.target.value;
        if (e.which !== 8) {
            var re = /(\d{4})(\d{1})$/g;
            if (re.test(value)) {
                value = value.replace(re, '$1-$2');
            }
        }
        this.setState({
            couponCode: value,
            errorT: ''
        })
    }
    subFN(){
        let {dispatch , history} = this.props;
        console.log(this.props)
        post({
            dispatch: dispatch,
            url: '/',
            sendData: {
                couponCode: this.state.couponCode.split('-').join('')
            },
            callback: (data) => {
                data = {
                    status: 0
                }
                if (data.status == 0) {
                    this.setState({
                        errorT: '兑换码无效'
                    })
                    history.pushState(null, 'exchange/' + this.state.couponCode)
                }
            }
        })
    }
    render(){
        return(
            <div className="exchange">
                <div className="coupon-des">
                    <div className="coupon">
                        <div className="c-header">
                        请输入卡券编号
                        </div>
                        <div className="c-number-input input-box">
                            <input type="tel" value={this.state.couponCode} className="mid-input" onChange={(e) => this.changeHandler(e)}/>
                        </div>
                        <div className="c-status c-red">
                        {this.state.errorT}
                        </div>
                    </div>
                </div>
                <div className="coupon-sub">
                    <span onClick={() => this.subFN()} className="btn btn-primary">提交</span>
                </div>
            </div>

            )
    }
}

export default connect()(InputExchange);