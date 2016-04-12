import React from 'react';
import Dorpdown from '../../components/dorpdown/DorpDown';
require('./exchange-record.scss');
class ExchangeRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            exchangeData: []
        }
    }
    getData(label , data , flag) {
        if (!Array.isArray(data)) data = [data];
        if (flag) {
            this.setState({
                exchangeData: this.state.exchangeData.concat(data)
            })
        } else {
            this.setState({
                exchangeData: data
            })
        }
    }
    render(){
        return(
            <div className="exchange-record">
                <Dorpdown title="兑换记录"  sendData={{r:3}} urls={{scrollLoad: {url: '/' , label: 'exchangeData'}}}
                initFN={(label , data , flag) => this.getData(label , data , flag)} >
                <dl className="exchange-list">
                    <dt className="shadow">
                        <time className="show-time">2016年2月4日</time>
                    </dt>
                    {this.state.exchangeData.map((val , index) => {
                        return(
                            <dd key={index}>
                                <div className="coupon-msg">
                                    <h3>后三类</h3>
                                    <em>1234-1234-4322-1223</em>
                                </div>
                                <div className="coupon-price"><em className="c-red">40.00元</em></div>
                            </dd>
                            )
                    })}
                </dl>
                </Dorpdown>
            </div>
            )
    }
}

export default ExchangeRecord;