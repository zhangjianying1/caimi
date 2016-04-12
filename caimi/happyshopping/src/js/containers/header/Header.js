import React from 'react';

class Header extends React.Component{
    render(){
        return (
            <header id="header" style={this.props.style}>
                <a href="javascript: history.back()" className="go-back"></a>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </header>
            )
    }
}
Header.propType = {
    title: React.PropTypes.string
}
export default Header;