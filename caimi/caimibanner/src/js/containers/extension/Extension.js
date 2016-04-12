import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading} from '../../actions/action';
import superagent from 'superagent';
import Header from '../../components/header/Header';
import Dorpdown from '../../components/dorpdown/Dorpdown';

require('./extension.scss');

class Extension extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            extensionData: []
        }
    }
    componentWillMount(elem, reset){
        let {dispatch} = this.props;

        // 下拉刷新 (通知partakelist 更新数据)
        if (elem != null) {
            this.state.sendNotice = true;
        }
        // 显示加载loading
        dispatch(loading(true));
        // 商品信息
        superagent.get('#/glodController/lotterydetail').set('Accept', 'application/json').query({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',

                    result:{

                    },
                    msg: '商品'
                }
            }

            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    this.setState({
                        extensionData: [1,2]
                    })
                    if (elem != null) reset(elem);
                    dispatch(loading(false));
                }
            }
        })

    }

    render(){
        return(
            <div className="extension">
                <Header title="我的推广" />
                <Dorpdown callback={(elem , reset) => this.componentWillMount(elem , reset)}>
                    <section>
                        <img src="./images/task-ban.png" />
                    </section>
                    <section>
                        <ul className="extension-list">
                        {
                            this.state.extensionData.map((val , index) => {
                                return (
                                    <li key={index}>
                                        <Link to="extensiondetail" className="react">
                                            <div className="list-box go-to">
                                                <div className="l-b-left">
                                                    <img src="./images/task-ban.png" />
                                                </div>
                                                <div className="l-b-right">
                                                    <div className="l-b-des">
                                                        <h2 className="extension-status"><strong>聚会苏</strong><i className="activity-status during">进行中</i></h2>
                                                        <p>好吃，好玩好看，真的值得推荐</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    )
                            })
                        }
                        </ul>
                    </section>
                </Dorpdown>
            </div>

            )
    }
}



export default connect()(Extension);
