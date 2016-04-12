import React from 'react';
import {Link} from 'react-router';
import {loading} from '../../actions/action';
import Header from '../../components/header/Header';
require('./usercenter.scss');
/**
 * 个人中心
 */
class Usercenter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userData: {}
        }
    }
    getInitData(data){
        this.setState({
            userData: {
                mobile: ''
            }
        })
    }
    render(){
        console.log(this.state.userData)
        return(
            <div className="usercenter">
                <Header title="个人中心" url="/" sendData={{b:2}} initFN={(data) => this.getInitData(data)} />
                <section className="user-msg">
                    <div className="user-photo">
                        <img src="../images/task-ban.png" />
                    </div>
                    <div className="user-name">
                        <h2><i className="icon icon-user-emial"></i>xin@126.com</h2>
                        <p><i className="icon icon-user-phone"></i>1521985858</p>
                    </div>
                </section>
                <section>
                    <Link to="addadmin" className="bor-btn">
                        <i className="icon icon-code"></i>
                        <span>添加管理员二维码</span>
                    </Link>
                </section>
                <section>
                    <ul className="nav-list">
                        <li>
                            <Link to="publicnumbermanage" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-public-manage"></i>
                                    </div>
                                    <div className="nav-tit">
                                    公众号管理
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={`verificationphone/${this.state.userData.mobile ? this.state.userData.mobile : 0}`} className="react go-to">
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
                            <Link to="activityrecord" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-activity"></i>
                                    </div>
                                    <div className="nav-tit">
                                    活动记录
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="extensionrecord" className="react go-to">
                                <div className="nav-box">
                                    <div className="nav-icon">
                                        <i className="icon icon-extension"></i>
                                    </div>
                                    <div className="nav-tit">
                                    推广记录
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

export default Usercenter;