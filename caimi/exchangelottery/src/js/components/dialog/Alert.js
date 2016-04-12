import React from 'react';
import {connect} from 'react-redux';
import {alert} from '../../actions/action'
require('./alert.scss');

class Confirm extends React.Component {

    close(){
        const {dispatch} = this.props;
        if (this.props.func) {
            this.props.func();
        }
        dispatch(alert(false))
    }

    render (){
        const propData = this.props;
        const {alertData} = propData;

        return (
            <div className="dialog"  style={{display: alertData ? 'block' : 'none'}} onClick={() => this.close()}>
                <div className="dialog-alert">
                    <header>{propData.title}</header>
                    <section>
                    {this.props.children}
                    </section>
                    <footer>
                        <a href="javascript:;" className="react" onClick={() => this.close()}>我知道了</a>
                    </footer>
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