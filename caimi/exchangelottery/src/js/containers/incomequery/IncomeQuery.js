import React from 'react';
import {Link} from 'react-router';
require('./income-query.scss');
class IncomeQuery extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="income-query">
                <div className="income-query-ban">
                    <img src="../images/income-query-bg.jpg" />
                </div>
                <div className="coupon-count">
                    <h3>所有收入（元）</h3>
                    <em className="c-red">1000</em>
                </div>
                <div className="column-two coupon-detail">
                    <div>
                        <span className="coupon-number">600（元）</span>
                        <p>可提收入</p>
                    </div>
                    <div>
                        <span className="coupon-number">500（元）</span>
                        <p>已提收入</p>
                    </div>
                </div>
                <div className="income-nav">
                    <ul className="nav-list">
                        <li>
                            <Link to="exchangequery" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-price"></i>
                                    </div>
                                    <div className="nav-tit">
                                    兑换收入
                                    </div>
                                    <div className="nav-tips">
                                    10:00元
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href="" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-invitationincome"></i>
                                    </div>
                                    <div className="nav-tit">
                                    邀请收入
                                    </div>
                                    <div className="nav-tips">
                                    10:00元
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="exchange-btns">
                    <Link to="withdrawcash" className="btn btn-primary">申请提现</Link>
                </div>
            </div>

            )
    }
}

export default IncomeQuery;