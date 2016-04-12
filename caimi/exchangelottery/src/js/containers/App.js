import React from 'react';
import Loading from '../components/loading/Loading';
class App extends React.Component{

    render(){
        return(
            <div className="main">
            {this.props.children}
            <Loading />
            </div>
            )
    }
}

export default App;