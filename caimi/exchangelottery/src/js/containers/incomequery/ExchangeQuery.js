import React from 'react'
import ReactDOM from 'react-dom';
import {post} from '../../utils/ajax';
import Calender from '../../components/calender/Calender';
import Dorpdown from '../../components/dorpdown/DorpDown';
require('../usercenter/usercenter.scss');
require('./exchange-query.scss');
class ExchangeQuery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            incomeData: [],
            startDate: [2015,2,3],
            endDate: [2015,2,4],
            time: '',
            calenderBtn: false,
            directcommand: false
        }
    }
    toggleCalender(){
        this.setState({
            calenderBtn: !this.state.calenderBtn
        })
    }

    calenderHandler(time){
        let temp = this.state;
        temp[time.label] = time.date;
        this.setState(temp);
    }

    showCalender(flag){
        this.state.time = {
            label: flag,
            date: this.state[flag]
        }
        this.toggleCalender();
    }
    /**
     * 获取数据
     * @params label {String}
     * @params data {Array}
     * @params flag {Boolean}
     * @param callback {Function}
     */
    getData(label , data , flag){
        data = Array.isArray(data) ? data : [data];

        if (flag) {
            this.setState({
                incomeData: this.state.incomeData.concat(data)
            })
        } else {
            this.setState({
                incomeData: data
            })
        }
        this.setState({
            directcommand: false
        })

    }
    queryHandler(){
        this.setState({
            directcommand: true
        })
    }
    render(){

        return(
            <div>
                <Dorpdown title="兑换收入查询" data={this.state.incomeData} directcommand={this.state.directcommand}
                sendData={{startTime: this.state.startDate.join('-'), endTime: this.state.endDate.join('-')}}
                urls={{scrollLoad: {url: '/', label: 'incomeData'}}} initFN={(label , data , flag) => this.getData(label , data , flag)} isDorp={false} >
                <section className="query-cont">
                    <div className="form-row">
                        <div className="select-date"><div className="select" onClick={() => this.showCalender('startDate')}>{this.state.startDate.join('/')}</div></div>
                        <div className="icon-and">至</div>
                        <div className="select-date"><div className="select"  onClick={() => this.showCalender('endDate')}>{this.state.endDate.join('/')}</div></div>
                        <div className="query-btn">
                            <a href="javascript:;" onClick={() => this.queryHandler()} className="small-bor-btn small-bor-btn-large">查询</a>
                        </div>
                    </div>
                    <div className="query-total">
                        <p>共计20张券，兑换金额<em className="c-red">40.00</em>元</p>
                    </div>
                </section>
                <section>
                    <dl className="exchange-list">
                        <dt className="column-box">
                            <div>兑换码</div>
                            <div>管理员</div>
                            <div>兑换金额</div>
                        </dt>
                        {
                        this.state.incomeData.map((val , index) => {
                            return(
                                <dd className="column-box" key={index}>
                                    <div>
                                    1234-4567-6789
                                    </div>
                                    <div>猴赛雷</div>
                                    <div className="operation">
                                        <em className="c-red">40.00</em>
                                    </div>
                                </dd>
                                )
                        })
                        }
                    </dl>

                </section>
                </Dorpdown>
                {this.state.calenderBtn ? <Calender callback={(time) => this.calenderHandler(time)} closeHandler={() => this.toggleCalender()} time={this.state.time} /> : null}
            </div>

            )
    }
}
export default ExchangeQuery;