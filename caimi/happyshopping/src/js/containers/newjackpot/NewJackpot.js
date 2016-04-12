import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading} from '../../actions/action';
import superagent from 'superagent';
import Header from '../header/Header';
import {fullZero, setDate} from '../../core/date';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import Jackpot from '../../components/jackpot/Jackpot';


class NewJackpot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            args: {
                elem: '',
                reset: ''
            }
        }
    }
    loadFN(elem, reset){
        this.setState({
            args: {
                elem: elem,
                reset: reset
            }
        })
    }


    render(){
        return(
            <div className="new-jackpot">

                <Header title="最新中奖" />
                <div className="body">
                    <Dorpdown callback={(elem, reset) => this.loadFN(elem, reset)}>
                        <Jackpot url="#/gladController/newjackpot" args={this.state.args}/>
                    </Dorpdown>
                </div>

            </div>
            )
    }
}


export default connect()(NewJackpot);