import React from 'react';

require('./task-list.scss');
/**
 * 活动列表
 */
class TaskList extends React.Component{

    render(){

        return(
            <ul className="task-list">
            {this.props.children}
            </ul>
        )
    }
}

export default TaskList;