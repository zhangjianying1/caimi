import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import Header from '../header/Header';
import Auth from '../../core/Auth'
import Dorpdown from '../../components/dorpdown/Dorpdown';
import Jackpot from '../../components/jackpot/Jackpot';
import ShareLotteryList from '../../components/sharelotterylist/ShareLotteryList';
import {TopSlider , Slider} from '../../components/slider/Slider';
import Tab from '../../components/tab/Tab';
import Pane from '../../components/tab/Pane';
require('./showlottery.scss');


class ShowLottery extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            slideData: [],
            sliderStyle: {display: 'none'},
            index: 0,
            defaultActiveKey: parseInt(this.props.params.index),
            args: {}
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
            args : {
                elem: elem,
                reset: reset
            }
        })
    }
    componentWillMount(){
        Auth.setUserCode();
    }

    tabClickHandle(i){
        this.state.defaultActiveKey = i;
    }


    render(){
        return(
            <div className="usercenter-lottery">
                <Header title="我的一元夺宝" />
                <div className="body">
                    <Dorpdown callback={(elem, reset) => this.loadFN(elem, reset)}>
                        <Tab defaultActiveKey={this.state.defaultActiveKey} tabClickHandle={(i) => this.tabClickHandle(i)}>
                            <Pane title="已参与">
                               <Jackpot url="#/userController/partake" userCode={Auth.getUserCode()} args={this.state.args} >
                                    <span className="icon icon-no-partake"></span>
                                    <p className="not-data-dis">

                                    您没有参与记录，心动不如行动，等你来哦
                                    </p>
                                    <Link to="/" className="btn-concise btn-small-primary">立即参与</Link>
                               </Jackpot>
                            </Pane>
                            <Pane title="已中奖">
                                <Jackpot url="#/userController/jackpot" userCode={Auth.getUserCode()} args={this.state.args} >
                                    <span className="icon icon-no-jackpot"></span>
                                    <p className="not-data-dis">
                                    您还没有中奖过，羡慕别人不如自己动手~
                                    </p>

                                    <Link to="/" className="btn-concise btn-small-primary">立即参与</Link>
                                </Jackpot>
                            </Pane>
                            <Pane title="已晒单">
                                <ShareLotteryList {...this.props} userCode={Auth.getUserCode()} args={this.state.args} showSlider={(i, data) => this.showSlider(i, data)}>
                                    <span className="icon icon-no-share"></span>
                                    <p className="not-data-dis">
                                    您还没有晒单记录，据说晒单下次会中更多呢
                                    </p>

                                </ShareLotteryList>
                            </Pane>
                        </Tab>
                    </Dorpdown>
                </div>
                <TopSlider style={this.state.sliderStyle} onClick={() => this.hideSlider()}>
                    <Slider data={this.state.slideData} index={this.state.index} />
                </TopSlider>
            </div>
            )
    }
}

export default ShowLottery;