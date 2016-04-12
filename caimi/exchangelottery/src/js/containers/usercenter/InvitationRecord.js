import React from 'react';
import Tab from '../../components/tab/Tab';
import Pane from '../../components/tab/Pane';
import TaskList from '../../components/list/TaskList'
import Dorpdown from '../../components/dorpdown/DorpDown';

class InvitationRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initData: [],
            urls: {scrollLoad: {url: '/' , label: 'invitingData'}},
            directcommand: false
        }
    }
    getData(label , data , flag){

        if (!Array.isArray(data)) {
            data = [data]
        }
        if (flag) {
            this.setState({
                initData: this.state.initData.concat([data]),
                directcommand: false
            })
        } else {
            this.setState({
                initData: data,
                directcommand: false
            })
        }
    }
    tabClickHandle(index){
        if (index == 0) {
            this.setState({
                urls: {
                    scrollLoad: {
                        url: '/#inviting',
                        label: 'initData'
                    }
                },
                directcommand: true
            })
        } else {
            this.setState({
                urls: {
                    scrollLoad: {
                        url: '/#/invited',
                        label: 'initData'
                    }
                },
                directcommand: true
            })
        }

    }
    render(){
        console.log(this.state.initData)
        return(
            <div className="remind">
                <Dorpdown title="任务列表" data={this.state.initData} sendData={{r:3}} urls={this.state.urls}
                initFN={(label , data , flag) => this.getData(label , data , flag)} directcommand={this.state.directcommand}>
                    <Tab defaultActiveKey="0" tabClickHandle={(index) => this.tabClickHandle(index)}>
                    <Pane title="正在邀请">
                        <dl className="">
                            <dt className="show-time">
                                <em className="fr">2人</em><time>2016年2月五日</time>
                            </dt>
                            <dd>
                                <TaskList>
                                {this.state.initData.map((val , index) => {
                                    return(
                                        <li key={index}>
                                            <div className="list-box radius-half">
                                                <div className="l-b-left">
                                                    <img src="./images/task-ban.png" />
                                                </div>
                                                <div className="l-b-right">
                                                    <div className="l-b-des">
                                                        <h2>聚会苏</h2>
                                                    </div>
                                                    <div className="l-b-point c-red">+200券点</div>
                                                </div>
                                            </div>
                                        </li>
                                        )
                                })}

                                </TaskList>
                            </dd>
                        </dl>
                        <dl className="">
                            <dt className="show-time">
                                <em className="fr">2人</em><time>2016年2月五日</time>
                            </dt>
                            <dd>
                                <TaskList>
                                    <li>
                                        <div className="list-box radius-half">
                                            <div className="l-b-left">
                                                <img src="./images/task-ban.png" />
                                            </div>
                                            <div className="l-b-right">
                                                <div className="l-b-des">
                                                    <h2>聚会苏</h2>
                                                </div>
                                                <div className="l-b-point c-red">+200券点</div>
                                            </div>
                                        </div>
                                    </li>
                                </TaskList>
                            </dd>
                        </dl>

                    </Pane>
                    <Pane title="邀请成功">
                        <dl className="">
                            <dt className="show-time">
                                <em className="fr">2人</em><time>2016年2月五日</time>
                            </dt>
                            <dd>
                                <TaskList>
                                {this.state.initData.map((val , index) => {
                                    return(
                                        <li key={index}>
                                            <div className="list-box radius-half">
                                                <div className="l-b-left">
                                                    <img src="./images/task-ban.png" />
                                                </div>
                                                <div className="l-b-right">
                                                    <div className="l-b-des">
                                                        <h2>聚会苏</h2>
                                                    </div>
                                                    <div className="l-b-point c-red">+200券点</div>
                                                </div>
                                            </div>
                                        </li>
                                        )
                                })}

                                </TaskList>
                            </dd>
                        </dl>
                        <dl className="">
                            <dt className="show-time">
                                <em className="fr">2人</em><time>2016年2月五日</time>
                            </dt>
                            <dd>
                                <TaskList>
                                {this.state.initData.map((val , index) => {
                                    return(
                                        <li key={index}>
                                            <div className="list-box radius-half">
                                                <div className="l-b-left">
                                                    <img src="./images/task-ban.png" />
                                                </div>
                                                <div className="l-b-right">
                                                    <div className="l-b-des">
                                                        <h2>聚会苏</h2>
                                                    </div>
                                                    <div className="l-b-point c-red">+200券点</div>
                                                </div>
                                            </div>
                                        </li>
                                        )
                                })}

                                </TaskList>
                            </dd>
                        </dl>
                    </Pane>
                </Tab>
                </Dorpdown>
            </div>
            )
    }
}

export default InvitationRecord;