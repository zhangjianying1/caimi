import React from 'react';

class Prompt extends React.Component{

    componentWillReceiveProps(nextProps){

        if (nextProps.prompt == true) {
            setTimeout(() => {
                if (this.props.hide) {
                    this.props.hide('prompt');
                }
            }, 500)
        }
    }
    render(){

        return (
            <div style={{display: this.props.prompt ? 'block' : 'none'}}>
                <div className="view-error" style={{
                    padding: '.1rem',
                    position: 'fixed', 'zIndex': 99,
                    background: '#d8d8d8', 'fontSize': '.14rem',
                    'lineHeight': '.3rem',
                    left: '50%',
                    top: '50%',
                    borderRadius: '.01rem',
                    color: '#fff',
                    'WebkitTransform': 'translate(-50%, -50%)',
                    transform: 'translate(-50%, -50%)',
                    'whiteSpace': 'nowrap'
                }}>{this.props.msg}</div>

            </div>
            )
    }
}

export default Prompt