import React from 'react';

class ToggleShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: false
        }
    }
    clickHandle(){
        this.setState({
            display: !this.state.display
        })
    }
    render(){
        return(
            <div className="animation-toggle">
                <div onClick={() => this.clickHandle()} className={this.state.display ? 'active' : ''}>{this.props.children[0]}</div>
                <div style={{display: this.state.display ? 'block' : 'none'}}>{this.props.children[1]}</div>
            </div>
            )
    }
}
export default ToggleShow;