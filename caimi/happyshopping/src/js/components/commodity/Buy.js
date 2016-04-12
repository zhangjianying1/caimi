import React from 'react';
import ReactDOM from 'react-dom'
import superagent from 'superagent';
import {search} from '../../core/location';
require('./buy.scss')
/**
 * 购买商品弹出层
 */
class Buy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            number: 10,
            balance: 0,
            isMark: false
        }
    }
    componentWillMount(){

        // 获取用户信息
        superagent.get('#/userController/user').
            query({userCode: search().userCode}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result: {
                        userCode: 12,
                        userName: 'xx',
                        balance: 12.2
                    }
                }
            }
            if (res.ok) {
                let body = res.body;
                if (body.code === '0000') {

                    this.setState({
                        balance: body.result.balance
                    })
                }
            }
        })
    }
    hideBuyLayer(){
        if (this.props.hideBuyLayer) {
            this.props.hideBuyLayer();
        }
    }
    subFn(){
        let number = this.state.number;
        // 父组件的subFn
        if (this.props.subFn) {

            if (this.state.balance < this.state.number * parseInt(this.props.data.price)){
                number = 0;
                this.hideBuyLayer()
            }

            this.props.subFn(number);
        }
    }
    chooseNumber(number){
        // 如果是字符串
        let sum = this.state.number,
            stepNumber = parseInt(this.props.data.price);

        if (typeof number == 'string') {
            if (number == 'plus')
                sum += stepNumber;
            else
                sum -= stepNumber;

            if (sum < stepNumber) {
                sum = stepNumber
            }
        } else {
            sum = number;
        }
        this.setState({
            number: sum
        })
    }
    default(e){
    e.stopPropagation();
    e.preventDefault();
    }
    componentWillReceiveProps(nextProps){
        let oLayer = ReactDOM.findDOMNode(this);
        this.setState({
            isMark: false
        })
        oLayer.addEventListener('webkitTransitionEnd', () => {

            let bBtn = false;
            // 显示层
            if (nextProps.isShow)
                bBtn = true;

            this.setState({
                isMark: bBtn
            })
        }, false);

        if (nextProps.isShow) {
            document.body.addEventListener('touchmove', this.default, false);
        } else {
            document.body.removeEventListener('touchmove', this.default, false);
        }

    }
    chnageHandle(e){
        let oInput = e.target,
            value = oInput.value,
            numberRE = /^[1-9][0-9]*$/;

        if (numberRE.test(value)) {
            this.setState({
                number: value
            })
        }


    }
    render(){
        let animation = () => {
            if (this.props.isShow) {
                return {

                        WebkitTransform: 'translateY(-100%)',
                        transform: 'translateY(-100%)'

                }
            } else {
                return {

                        WebkitTransform: 'translateY(0)',
                        transform: 'translateY(0)'

                }
            }
        }
        return (
            <div className="buy-layer" style={animation()}>
                <div className="mark" style={{display: this.state.isMark ? 'block' : 'none'}} onClick={() => this.hideBuyLayer()}></div>
                <div className="buy-cont">

                    <a className="close" href="javascript:;" onClick={ () => this.hideBuyLayer()}></a>
                    <p className="choose-tit">请选择参与人数</p>
                    <div className="buy-number">
                        <div className="buy-choose">
                            <span className="icon-reduce" onClick={this.chooseNumber.bind(this, 'reduce')}></span>
                            <input type="tel" value={this.state.number} onChange={(e) => this.chnageHandle(e)}/>
                            <span className="icon-plus" onClick={this.chooseNumber.bind(this, 'plus')}></span>
                        </div>
                        <div className="buy-quickly">
                            <span onClick={this.chooseNumber.bind(this, 5)}>5</span>
                            <span onClick={this.chooseNumber.bind(this, 10)}>10</span>
                            <span onClick={this.chooseNumber.bind(this, 50)}>50</span>
                            <span onClick={this.chooseNumber.bind(this, 100)}>100</span>
                        </div>
                        <div className="gold-msg">
                            <p className="total-gold">共计：<span className="text-orange">{this.state.number}</span> 金币</p>
                            <p className="balance">（余额：{this.state.balance}金币）</p>
                        </div>
                        <div className="buy-confirm">
                            <button onClick={() => this.subFn()}>确定</button>
                        </div>
                    </div>
               </div>
            </div>
            )
    }
}
export default Buy;