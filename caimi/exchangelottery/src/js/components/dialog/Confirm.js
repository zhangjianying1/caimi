import React from 'react';
import {connect} from 'react-redux';
import {confirm} from '../../actions/action'
require('./dialog.scss');

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
            this.props.btnRightFN( () => this.close());
        } else {
            this.close();
        }
       // this.close();
        e.preventDefault();
    }
    stopPropagation(e){
        e.stopPropagation();
    }
    render (){
        const propData = this.props;
        const {dispatch, confirmData} = propData;

        return (


            <div className="dialog" style={{display: confirmData.bBtn ? 'block' : 'none'}} onClick={() => this.close()}>
            <div className="dialog-confirm" onClick={(e) => this.stopPropagation(e)}>
                <header>{propData.title}</header>

                <section >
                {this.props.children}
                </section>

                <footer>
                    <a href="javascript:;" className="react" onClick={(e) => this.cancel(e)}>取消</a>
                    <a href="javascript:;" className="react" onClick={(e) => this.confirm(e)} >{propData.btnRightT || '确定'}</a>
                </footer>
            </div>
            </div>
            )
    }
}
Confirm.propTypes = {

    title: React.PropTypes.string,
    confirm: React.PropTypes.func,
    btnLeftT: React.PropTypes.string,
    btnRightT: React.PropTypes.string
}
let init = (state) => {
    return {
        confirmData: state.confirm
    }
}
export default connect(init)(Confirm);