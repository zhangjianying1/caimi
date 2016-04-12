import React from 'react';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import {TopSlider , Slider} from '../../components/slider/Slider';
import Header from '../header/Header';

import ShareLotteryList from '../../components/sharelotterylist/ShareLotteryList';

class ShareLottery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            args: {},
            slideData: [],
            sliderStyle: {display: 'none'},
            index: 0,
        }
    }

    hideSlider(){
        this.setState({
            sliderStyle: {
                display: 'none'
            },
            args: ''
        })
    }
    showSlider(index, slideData){
        this.setState({
            sliderStyle: {
                display: 'block'
            },
            index: index,
            slideData: slideData,
            args: ''
        })
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
            <div className="share-lottery">
                <Header title="中奖晒单" />
                <div className="body">
                    <Dorpdown callback={(elem, reset) => this.loadFN(elem, reset)}>
                        <ShareLotteryList {...this.props} args={this.state.args} showSlider={(i, data) => this.showSlider(i, data)}/>
                    </Dorpdown>
                </div>
                <TopSlider style={this.state.sliderStyle} onClick={() => this.hideSlider()}>
                    <Slider data={this.state.slideData} index={this.state.index} />
                </TopSlider>
            </div>
            )
    }
}


export default ShareLottery;
