import React from 'react';
import ReactDOM from 'react-dom';
import {getParentScroll} from '../../core/dom';

class ScrollLoad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadText: '',
            bBtn: true
        }

    }
    loadImg(){
        let imgs = document.querySelectorAll('.img'),
            winH = document.documentElement.clientHeight;

        for (var i = 0; i < imgs.length; i ++){
            let img = imgs[i];

            if (img.getBoundingClientRect().top < winH) {
                let imgUrl = img.getAttribute('id');

                if (imgUrl) {
                    let oImg = new Image();
                    oImg.onload = function(){
                        if (img.tagName.toLowerCase() == 'img')
                            img.src = imgUrl;
                        else
                        img.style.backgroundImage = 'url(' + imgUrl + ')';
                        oImg = null;
                    }
                    oImg.src = imgUrl;
                    img.setAttribute('id', '');
                }
            }
        }
    }

    componentDidMount(){

        let oLoad = ReactDOM.findDOMNode(this.refs.load),
            This = this,
            winH = document.documentElement.clientHeight,
            body = getParentScroll(oLoad);

        body.onscroll = window.onscroll = null;
        body.onscroll = window.onscroll = function(){

            setTimeout(function(){
                This.loadImg();
                if (This.props.page != 'not') {
                    let oLoadOffsetTop =  oLoad.getBoundingClientRect().top;

                    if (oLoadOffsetTop < winH) {
                        This.state.loadText = '正在加载中...'
                        This.props.loadFN();
                    }
                }
            }, 10)

        }

        setTimeout(function(){
            This.loadImg();
        }, 0);

    }
    componentWillUnmount(){

        let oLoad = ReactDOM.findDOMNode(this.refs.load),
            body = getParentScroll(oLoad);

        body.onscroll = window.onscroll = null;
    }
    render(){
        return(
            <div ref="load" className="scroll-loading">
                { this.props.page != "not" ? this.state.loadText: this.props.tipsText}
            </div>

            )
        }
}


ScrollLoad.propTypes = {
    loadFN: React.PropTypes.func,
    tipsText: React.PropTypes.string
}
export default ScrollLoad;