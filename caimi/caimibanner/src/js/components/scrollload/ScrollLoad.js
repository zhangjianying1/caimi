import React from 'react';
import ReactDOM from 'react-dom';
import {post} from '../../utils/ajax'
import {getParentScroll} from '../../utils/dom';
import {extend} from '../../utils/extend';
let bBtn = true;
class ScrollLoad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadText: '',
            page: 1
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
    loadFN(flag){
        let {urls , sendData, initFN , reset} = this.props;

        extend(sendData , {page: 1});

        for (let url in urls) {
            post({
                url: urls[url].url,
                sendData: sendData,
                callback: (data) => {
                    initFN(urls[url].label , data);

                    // 下拉刷新
                    if (flag) {
                        reset();
                    }
                }
            })
        }
    }

    scrollLoad(){

        if (bBtn) {
            bBtn = false;
            let {urls , sendData, initFN , reset} = this.props;
            this.state.page ++;
            extend(sendData , {page: this.state.page})
            post({
                url: urls.scrollLoad.url,
                sendData: sendData,
                callback: (data) => {

                    // 没有数据
                    if (this.state.page == 3){
                        this.setState({
                            page: 'not'
                        })
                    } else {
                        initFN(urls.scrollLoad.label , data , true);
                    }
                    bBtn = true;
                }

            })
        }
    }
    componentWillMount(){
        this.loadFN();
    }
    componentWillReceiveProps(nextProps){

        let This = this;
        if (nextProps.data.length > 0 ) {
            setTimeout(function(){
                This.loadImg();
            }, 0);
        }

        // 下拉刷新
        if (nextProps.dorpdown) {
            nextProps.changeBtn();
            this.state.page = 1;
            this.loadFN(true);
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
                if (This.state.page != 'not') {
                    let oLoadOffsetTop =  oLoad.getBoundingClientRect().top;

                    if (oLoadOffsetTop < winH) {
                        This.setState({
                            loadText : '正在加载中...'
                        })
                        This.scrollLoad();
                    }
                }
            }, 10)

        }
    }
    componentWillUnmount(){

        let oLoad = ReactDOM.findDOMNode(this.refs.load),
            body = getParentScroll(oLoad);

        body.onscroll = window.onscroll = null;
    }

    render(){
        return(
            <div ref="load" className="scroll-loading" style={{lineHeight: '.25rem' , minHeight: ".01rem"  , textAlign: 'center'}}>
                { this.state.page != "not" ? this.state.loadText : '已全部加载完'}
            </div>

        )
    }
}


export default ScrollLoad;