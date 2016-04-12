import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {confirm} from '../../actions/action';
import Header from '../../components/header/Header';
import Confirm from '../../components/dialog/Confirm';
import {post} from '../../utils/ajax';
require('./usercenter.scss');
require('./edit-admin.scss');
/**
 * 编辑管理员
 */
class EditAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            adminData: [],
            adminMsg: {}
        }
    }
    // 显示提示框
    showLayer(id){
        const {dispatch} = this.props;
        dispatch(confirm({bBtn: true}))
        this.state.adminMsg = {
            id: id,
            name: 'name'
        }
    }
    // 初始化加载
    getInitData(data) {
        this.setState({
            adminData: [1,2]
        })
    }
    btnRightFN(){
        let {dispatch} = this.props;
        post({
            dispatch: dispatch,
            url: '/',
            sendData: this.state.adminMsg,
            callback: () => {
                this.removeAdmin();
            }
        })
    }
    removeAdmin(){
        let temp = this.state.adminData;

        temp.map((val , index) => {
            if (index == this.state.adminMsg.id) {
                temp.splice(index , 1);
            }
        })
        this.setState({
            adminData: temp
        })
    }
    render(){

        return(

            <div className="edit-admin">
                <Header title="编辑管理员" url="/" initFN={(data) => this.getInitData(data)}/>
                <section>
                    <Link to="addadmin" className="bor-btn">
                        <i className="icon icon-addadmin"></i>
                        <span>添加管理员</span>
                    </Link>
                </section>
                <section>
                    <dl className="admin-list">
                        <dt className="column-box">
                            <div>管理员</div>
                            <div>描述</div>
                            <div>操作</div>
                        </dt>
                    {
                        this.state.adminData.map((val , index) => {
                            return(
                                <dd className="column-box" key={index}>
                                    <div className="user-des">
                                        <img src="../images/code.jpg" />
                                        <p>猴赛雷</p>
                                    </div>
                                    <div>主管理员</div>
                                    <div>
                                        <span className="small-bor-btn" onClick={() => this.showLayer(index)}>移除</span>
                                    </div>
                                </dd>
                                )
                        })
                    }

                    </dl>

                </section>
                <Confirm title="管理员解除绑定" btnRightFN={() => this.btnRightFN()}>
                    <dl className="weixin-user">
                        <dt>
                            <img src="../images/code.jpg" />
                        </dt>
                        <dd className="input-box">确定将 <em className="c-red">13131430669</em> 解除绑定？</dd>

                    </dl>
                </Confirm>
            </div>

            )
    }
}

export default connect()(EditAdmin)