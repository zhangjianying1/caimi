import React from 'react';

class ToggleHeader extends React.Components{

    render(){
        return(
            <div>{this.props.children}</div>
            )
    }
}
export default ToggleHeader;