import React from 'react';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import ActivityList from '../../components/list/ActivityList';
require('./activity-record.scss');
/**
 * 编辑管理员
 */
class ActivityRecord extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activityData: []
        }
    }

    //加载
    getData(label , data , flag) {

        //
        if (flag == undefined) {
            this.setState({
                activityData: [1,2]
            })
        } else {
            this.setState({
                activityData: this.state.activityData.concat(data)
            })
        }

    }

    render(){
console.log(this.state.activityData)
        return(

            <div className="activity-record">

                <Dorpdown title="活动记录" data={this.state.activityData} sendData={{r:3}} urls={{scrollLoad: {url: '/' , label: 'activityData'}}} initFN={(label , data , flag) => this.getData(label , data , flag)} >
                    <section>
                        <ActivityList data={this.state.activityData}  />
                    </section>
                </Dorpdown>
            </div>

            )
    }
}

export default ActivityRecord