import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';
import {confirm , loading} from '../../actions/action';
import Header from '../../components/header/Header';
import Confirm from '../../components/dialog/Confirm';
import {post} from '../../utils/ajax';
require('./public-number-manage.scss');
let bBtn = true;
/**
 * 添加管理员
 */
class PublicNumberManage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            publicData: [],
            publicMsg: {}
        }
    }
    getInitData(data){
        this.setState({
            publicData: [1 , 2]
        })
    }
    // 显示提示框
    showConfirm(id){
        const {dispatch} = this.props;
        dispatch(confirm({bBtn: true}))
        this.setState({
            publicMsg: {
                id: id,
                name: '彩米科技'
            }
        })
    }
    btnRightFN(){
        let {dispatch} = this.props;
        post({
            dispatch: dispatch,
            url: '/',
            sendData: this.state.adminMsg,
            callback: () => {
                this.removePublic();
            }
        })

    }
    removePublic(){
        let temp = this.state.publicData;

        temp.map((val , index) => {
            if (index == this.state.publicMsg.id) {
                temp.splice(index , 1);
            }
        })
        this.setState({
            publicData: temp
        })
    }
    render(){

        return(
            <div className="public-number">
                <Header title="公众号管理" url="/" sendData={{b:2}} initFN={(data) => this.getInitData(data)} />
                <section>
                    <ul className="public-number-list">
                    {
                        this.state.publicData.map((val , index) => {
                            return (
                                <li key={index}>
                                    <div className="list-box">
                                        <div className="l-b-left">
                                            <img src="../images/code.jpg" />
                                        </div>
                                        <div className="l-b-right">
                                            <div className="l-b-des">
                                                <h2>彩米科技</h2>
                                            </div>
                                            <span className="icon icon-remove" onClick={() => this.showConfirm(index)}>删除</span>
                                        </div>
                                    </div>
                                </li>
                                )
                        })
                    }

                    </ul>
                </section>
                <Confirm title="公众号解除绑定" btnRightFN={() => this.btnRightFN()}>
                    <dl className="weixin-user">
                        <dt>
                            <img src="../images/code.jpg" />
                        </dt>
                        <dd className="input-box">您确认将公众号<em className="c-red">{this.state.publicMsg.name}</em>解除绑定？</dd>
                    </dl>
                </Confirm>
            </div>
            )
    }
}

export default connect()(PublicNumberManage)