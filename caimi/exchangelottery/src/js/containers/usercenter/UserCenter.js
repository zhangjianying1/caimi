    import React from 'react';
import {Link} from 'react-router';
import SwitchBtn from '../../components/btns/SwitchBtn';
import Header from '../../components/header/Header';
require('./usercenter.scss')
class UserCenter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userData: {

            }
        }
    }
    getData(data){
            data = {
                mobile: '13131430669'
            }
        this.setState({
            userData: data
        })
    }
    render(){
        return(
            <div className="usercenter">
                <Header title="个人中心" initFN={(data) => this.getData(data)} url="/"/>
                <section className="user-msg">
                    <div className="user-photo">
                        <img src="../images/user-msg.png" />
                    </div>
                    <div className="user-name">
                        <h2>xin</h2>
                        <p>ID：12345</p>
                    </div>
                </section>
                <section>
                    <Link to="addadmin" className="bor-btn">
                        <i className="icon icon-addadmin"></i>
                        <span>添加管理员</span>
                    </Link>
                </section>
                <section>
                    <ul className="nav-list">
                        <li>
                            <div className="nav-box">
                                <div className="nav-icon">
                                    <i className="icon icon-taskremind"></i>
                                </div>
                                <div className="nav-tit">
                                邀请提醒
                                </div>
                            </div>
                            <SwitchBtn url="/" sendData={{openId: 333}} status={true}/>
                        </li>
                        <li>
                            <Link to="prefectcash" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-prefect"></i>
                                    </div>
                                    <div className="nav-tit">
                                    完善提现信息
                                    </div>
                                    <div className="nav-tips">
                                    新本良
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={`verificationphone/${this.state.userData.mobile}`} className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-addmobile"></i>
                                    </div>
                                    <div className="nav-tit">
                                    添加手机号码
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="editadmin" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-editadmin"></i>
                                    </div>
                                    <div className="nav-tit">
                                    编辑管理员
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav-list">
                        <li>
                            <Link to="taskrecord" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-taskrecord"></i>
                                    </div>
                                    <div className="nav-tit">
                                    任务记录
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="invitationrecord" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-remindrecord"></i>
                                    </div>
                                    <div className="nav-tit">
                                    邀请记录
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="exchangerecord" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-exchange"></i>
                                    </div>
                                    <div className="nav-tit">
                                    兑换记录
                                    </div>
                                    <div className="nav-tips">
                                    10:00元
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>

            </div>

            )
    }
}

export default UserCenter;