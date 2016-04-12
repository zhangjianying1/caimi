import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import {Link} from 'react-router';
import ScrollLoad from '../scrollload/ScrollLoad';
require('./partake.scss');

// 加载用户参与的开关
let bBtn = true;

class PartakeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            partakeList: [],
            page: 0,
        }

    }
    componentDidMount(){
        this.loadFN()
    }
    // 加载用户参列表
    loadFN(){

        if (bBtn) {
            this.state.page ++;
            bBtn = false;


            // 参与用户信息
            superagent.get('#/glodController/partake').set('Accept', 'application/json').query({lotteryId: this.props.lotteryId, issue: this.props.issue, page: this.state.page}).then((res) => {

                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                            arrayList: [
                                {
                                    userCode: '123',
                                    userName: "魅力以前",
                                    ip: '192.189.0.222',
                                    partakeTime: '2016-01-23 12:00:11',
                                    userPhoto: './images/2.png',
                                    partakeCount: "5"
                                },
                                {
                                    userCode: '1234',
                                    userName: "魅力",
                                    ip: '192.189.0.222',
                                    partakeTime: '2016-01-23 12:00:11',
                                    userPhoto: './images/2.png',
                                    partakeCount: "2"
                                }
                            ]
                        },
                        msg: '参与记录'
                    }
                }
                if (res.ok) {
                    let body = res.body;

                    if (body.code === '0000') {

                        // 如果没有返回数据了
                        if (this.state.page == 3) {
                            this.setState({
                                page: 'not'
                            })
                        } else{
                            this.setState({
                                partakeList: this.state.partakeList.concat(body.result.arrayList)
                            })
                        }
                        bBtn = true;

                    }
                }
            })
        }

    }
    componentWillReceiveProps(nextProps) {

        // 刷新浏览器
        if (nextProps.sendNotice) {
            this.state.page = 0;
            this.state.partakeList = [];
            this.loadFN()
        }
    }
    render(){
        return(
            <div className="all-partake-cont">
                <ul className="all-partake-list">
                {this.state.partakeList.map(function(val, index){
                        return (
                            <li className="show-user" key={index}>

                                <div className="user-photo"><img className="img" src="./images/photo.png" id={val.userPhoto} /></div>
                                <div className="user-msg">
                                    <p>
                                        <Link to="" className="text-blue">{val.userName}</Link><strong><span className="text-orange">{val.partakeCount}</span>人次</strong>
                                    </p>
                                    <div className="user-count">{val.partakeTime}</div>
                                </div>
                            </li>
                        )
                    })
                }
                </ul>
                <ScrollLoad loadFN={() => this.loadFN()} page={this.state.page} tipsText="全部加载完毕了" />
            </div>
            )
    }
}

PartakeList.propTypes = {
    lotteryId: React.PropTypes.string.isRequired

}
export default PartakeList;