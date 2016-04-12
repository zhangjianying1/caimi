import React from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router';

let flag = false;
let timer = null;
class ScrollTransverse extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            jackpot: [],
            ulStyle: {},
            liStyle: {}
        }
        this.scrollL = 0;
        this.width = 0;
        this.parentW = 0;
        this.oUl = null;
    }

    componentWillReceiveProps(nextProps){
        let propData = nextProps.data;
        this.state.jackpot && this.state.jackpot.length && propData.map((val,index) => {

            if (val.lotteryId != this.state.jackpot[index].lotteryId) {
                flag = false;
                this.componentWillUnmount();
            }
        })


        if (flag) return;
        flag = true;

        this.oUl = ReactDOM.findDOMNode(this);
        this.width = document.documentElement.clientWidth,

        propData.push(propData[0])
        this.parentW = this.width * propData.length;
        this.setState({
            ulStyle: {
                width: this.parentW + 'px'
            },
            liStyle:{
                width: this.width + 'px'
            },
            jackpot: propData

        })
        this.touchE();
        this.oUl.addEventListener('touchstart', this.touchS, false)
        this.oUl.addEventListener('touchstend', this.touchE, false)
    }
    move(){
        if (this.scrollL <=  -(this.parentW - this.width)) {
            this.scrollL = 0;
        }
        this.scrollL -= 1;

        this.setState({
            ulStyle:{
                width: this.parentW + 'px',
                WebkitTransform: 'translateX(' + this.scrollL + 'px)',
                transform: 'translateX(' + this.scrollL + 'px)',
            }
        })
    }

    touchS(){
        clearInterval(timer);
    }
    touchE(){
        timer = setInterval(() => {
            this.move();
        }, 30);
    }
    componentWillUnmount(){
        // 移除组件时要把事件或者全局的变量进行更改或销毁
        clearInterval(timer);
        flag = false;
        this.oUl.removeEventListener('touchstart', this.touchS, false)
        this.oUl.removeEventListener('touchstend', this.touchE, false)
    }

    render(){
        return(
            <ul className="scroll-jackpot-list" style={this.state.ulStyle}>
                {
                    this.state.jackpot.length ? this.state.jackpot.map((val,index) => {
                        return(
                            <li key={index} style={this.state.liStyle}>
                            恭喜<Link to={`commodity/${val.lotteryId}/${val.issue}`}>{val.jackpotUser}</Link>
                            获得<strong>{val.lotteryId}</strong>
                            </li>
                        )
                    })
                    : <li><span className="small-loading"></span></li>


                }
            </ul>
            )
    }
}

export default ScrollTransverse;
