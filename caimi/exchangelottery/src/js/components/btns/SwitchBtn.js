import React from 'react';
import {post} from '../../utils/ajax';
require('./btns.scss');
class SwitchBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bBtn: this.props.status
        }
    }
    trans(){
        this.setState({
            bBtn:!this.state.bBtn
        })
        post({
            url: this.props.url,
            sendData: this.props.sendData,
            callback: (data) => {

            }
        })
    }
    render(){
        return(
            <span className={this.state.bBtn ? 'icon-switch trans-open' : 'icon-switch'} onClick={() => this.trans()}></span>
            )
    }
}
export default SwitchBtn;