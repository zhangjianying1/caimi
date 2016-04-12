import React from 'react';
require('./exchange.scss');

class ExchangeSuccess extends React.Component{
    render(){
        return(
            <div className="exchange-success">
                <div className="e-s-des">
                    <div>
                        <img src="./images/icon-success.png" />
                    </div>
                    <div className="">
                        <em className="e-s-coupon">卡劵 {this.props.params.couponcode}</em>
                        <p>成功兑换，兑换金额</p>
                        <em className="e-s-price">2.00 <i className="e-s-price-word">元</i></em>
                    </div>
                </div>

                <div className="fixed-btns">
                    <a href="" className="btn btn-primary">我知道了</a>
                </div>

            </div>
            )
    }
}

export default ExchangeSuccess;