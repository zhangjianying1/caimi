import React from 'react';
import Dorpdown from '../../components/dorpdown/DorpDown';
import TaskList from '../../components/list/TaskList'

require('./task-record.scss')
class TaskRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskData: []
        }
    }
    getData(label , data , flag ){
        if (!Array.isArray(data)) data = [data];
        // 滚动加载
        if (flag) {
            this.setState({
                taskData: this.state.taskData.concat(data)
            })
        } else {
            this.setState({
                taskData: data
            })
        }

    }
    render(){
        return(
            <div className="taskrecord">
                <Dorpdown title="任务列表" data={this.state.taskData}
                sendData={{r:3}} urls={{scrollLoad: {url: '/' , label: 'taskData'}}}
                initFN={(label , data , flag) => this.getData(label , data , flag)} >
                <section>
                    <dl className="">
                        <dt>
                            <time className="show-time">2016年2月五日</time>
                        </dt>
                        <dd>
                            <TaskList>
                                {
                                    this.state.taskData.map((val , index) => {
                                        return (
                                            <li key={index}>
                                                <div className="list-box">
                                                    <div className="l-b-left">
                                                        <img id="../images/code.jpg" className="img" />
                                                    </div>
                                                    <div className="l-b-right">
                                                        <div className="l-b-des">
                                                            <h2>聚会苏</h2>
                                                        </div>
                                                        <div className="l-b-point">200券点</div>
                                                    </div>
                                                </div>
                                            </li>
                                            )
                                    })

                                }

                            </TaskList>
                        </dd>
                    </dl>
                    <dl className="">
                        <dt>
                            <time className="show-time">2016年2月五日</time>
                        </dt>
                        <dd>
                            <TaskList>
                                {
                                    this.state.taskData.map((val , index) => {
                                    return (
                                        <li key={index}>
                                            <div className="list-box">
                                                <div className="l-b-left">
                                                    <img id="../images/code.jpg" className="img" />
                                                </div>
                                                <div className="l-b-right">
                                                    <div className="l-b-des">
                                                        <h2>聚会苏</h2>
                                                    </div>
                                                    <div className="l-b-point">200券点</div>
                                                </div>
                                            </div>
                                        </li>
                                        )
                                })

                                    }

                            </TaskList>
                        </dd>
                    </dl>
                </section>
                </Dorpdown>
            </div>
            )
    }
}

export default TaskRecord;