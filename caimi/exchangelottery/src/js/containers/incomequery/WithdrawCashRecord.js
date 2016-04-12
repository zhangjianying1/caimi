import React from 'react';
import Dorpdown from '../../components/dorpdown/DorpDown';
require('./withdrawcashrecord.scss');
class WithdrawCashRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    getData(label , data , flag) {
        data = Array.isArray(data) ? data : [data];
        if (flag) {
            this.setState({
                data: this.state.data.concat(data)
            })
        } else {
            this.setState({
                data: data
            })
        }
    }
    render(){
        return(
            <div className="withdrawcashrecord">
                <Dorpdown title="提现记录" urls={{scrollLoad: {url: '/' , label: 'data'}}} initFN={(label , data , flag) => this.getData(label , data , flag) } >
                <dl className="w-c-record-list">
                    <dt>
                        <time className="show-time">2016年3月7日</time>
                    </dt>
                    {this.state.data.map((val , index) => {
                        return(
                            <dd key={index}>
                                <div className="column-justify">
                                    <div className="w-c-name">支付宝</div>
                                    <div className="w-c-status"><em className="c-red">10.00元</em><span className="status">提现中</span></div>
                                </div>
                            </dd>
                            )
                    })}

               </dl>
               </Dorpdown>
            </div>
            )
    }
}

export default WithdrawCashRecord;