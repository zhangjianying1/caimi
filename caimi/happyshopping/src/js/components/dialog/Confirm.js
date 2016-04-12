import React from 'react';
import {connect} from 'react-redux';
import {confirm} from '../../actions/action'
require('./confirm.scss');

class Confirm extends React.Component {
    close(){
        const {dispatch} = this.props;
        dispatch(confirm({bBtn: false}))
    }
    cancel(e) {
        if (this.props.btnLeftFN) {
            this.props.btnLeftFN();
        }
        this.close();
        e.preventDefault();
    }
    confirm(e){

        if (this.props.btnRightFN) {
            this.props.btnRightFN();
        }
        this.close();
        e.preventDefault();
    }
    render (){
        const propData = this.props;
        const {dispatch, confirmData} = propData;

        return (

            <div className="view" style={{display: confirmData.bBtn ? 'block' : 'none'}} >
                <div className="mark" onClick={() => this.close()}></div>
                <div className="view-cont view-confirm">
                <div className="view-confirm-header">
                    <h2>{propData.title}</h2>
                </div>
                <div className="view-confirm-body"><p>{this.props.message}</p></div>
                <div className="view-confirm-footer">
                <a onClick={(e) => this.cancel(e)} className="view-confirm-cancel">{propData.btnLeftText}</a><a onClick={(e) => this.confirm(e)} className="view-confirm-appect">{propData.btnRightText}</a></div>
                </div>
            </div>
            )
    }
}
Confirm.propTypes = {

    message: React.PropTypes.string,
    confirm: React.PropTypes.func,
    btnLeftText: React.PropTypes.string,
    btnRightText: React.PropTypes.string
}
let init = (state) => {
    return {
        confirmData: state.confirm
    }
}
export default connect(init)(Confirm);