import React from 'react';
import {connect} from 'react-redux';
import {alert} from '../../actions/action'
require('./alert.scss');

class Confirm extends React.Component {

    close(){
        const {dispatch} = this.props;
        dispatch(alert(false))
    }

    render (){
        const propData = this.props;
        const {alertData} = propData;

        return (

            <div className="view" style={{display: alertData ? 'block' : 'none'}} >
                <div className="mark" onClick={() => this.close()}></div>
                <div className="view-cont view-alert">
                    <div className="alert-title"><p>{propData.title}</p></div>
                    <div className="alert-body"><p>{propData.message}</p></div>
                    <div className="alert-footer">
                        <a onClick={() => this.close()} className="view-confirm-cancel">{propData.btnText}</a>



                    </div>
                    <div className="alert-tips">参与记录可在”我的“中查询</div>
                </div>
            </div>
            )
    }
}
Confirm.propTypes = {
    title: React.PropTypes.string,
    message: React.PropTypes.string
}
let init = (state) => {
    return {
        alertData: state.alert
    }
}
export default connect(init)(Confirm);