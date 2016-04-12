import React from 'react';
import Loading from '../components/loading/Loading';

let App  = React.createClass({
    render(){
    return (

        <div className="main">
            {this.props.children}
            <Loading />
        </div>
        )

}
});

export default App