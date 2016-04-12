import React from 'react';

import Dorpdown from '../../components/dorpdown/Dorpdown';
import ActivityList from '../../components/list/ActivityList';
require('./extension-query.scss');
/**
 * 推广查询
 */
class ExtensionQuery extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activityData: [],
            activityDetail: {}
        }
    }
    //加载
    getData(label , data , flag) {
        let temp = this.state;

        //
        if (flag == undefined) {
            temp[label] = [data];
        } else {
            temp[label] = temp[label].concat([data]);
        }
        this.setState(temp)

    }
    render(){

        return(
            <div className="extension-query">

                <Dorpdown title="活动记录" data={this.state.activityData} sendData={{r:3}} urls={{scrollLoad: {url: '/', label: 'activityData'}, otherLoad: {url: '/#' , label: 'activityDetail'}}} initFN={(label , data , flag) => this.getData(label , data , flag)} >
                    <div className="extension-query-ban">
                        <img src="../images/extension-bg.png" />
                    </div>
                    <div className="extension-query-count">
                        <h3>累计关注（人）</h3>
                        <em className="c-red">1000</em>
                    </div>
                    <div className="column-two extension-query-detail">
                        <div>
                            <span className="coupon-number">600人</span>
                            <p>昨日新增</p>
                        </div>
                        <div>
                            <span className="coupon-number">500元</span>
                            <p>累计费用</p>
                        </div>
                        <div>
                            <span className="coupon-number">500人</span>
                            <p>今日新增</p>
                        </div>
                    </div>
                    <div>
                        <ActivityList data={this.state.activityData} to="activity" />
                    </div>
                </Dorpdown>
            </div>

            )
    }
}

export default ExtensionQuery;