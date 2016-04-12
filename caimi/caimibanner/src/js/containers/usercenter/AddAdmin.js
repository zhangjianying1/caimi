import React from 'react';
import {connect} from 'react-redux';
import {confirm} from '../../actions/action';
import Header from '../../components/header/Header';
import Confirm from '../../components/dialog/Confirm';
require('./addadmin.scss');
/**
 * 添加管理员
 */
class AddAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userData: {}
        }
    }
    // 显示提示框
    showConfirm(){
        const {dispatch} = this.props;
        dispatch(confirm({bBtn: true}))
    }
    render(){

        return(

            <div className="invitation-firend">
                <Header title="添加管理员" />
                <header onClick={() => this.showConfirm()}>
                    <img src="../images/logo.png" />
                </header>
                <section className="add-admin">
                    <img className="scan-code" src="../images/code.jpg" />
                    <div className="scan-code">
                        <p className="c-red">扫二维码关注 彩米传媒</p>
                        <p>请使用需要添加为管理员的微信号扫描</p>
                    </div>

                </section>
                <Confirm>
                    <dl className="weixin-user">
                        <dt>
                            <img src="../images/code.jpg" />
                        </dt>
                        <dd className="input-box">确定将 <em className="c-red">13131430669</em> 添加为管理员</dd>

                    </dl>
                </Confirm>
            </div>
            )
    }
}

export default connect()(AddAdmin)