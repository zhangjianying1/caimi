import React from 'react';
import ReactDOM from 'react-dom'
import {getParentScroll} from '../../utils/dom';
import Header from '../../components/header/Header';
import ScrollLoad from '../../components/scrollload/ScrollLoad';


require('./dorpdown.scss');
let moveH = 0;

class DorpDown extends React.Component {
    constructor(porps){
        super(porps);
        this.state = {
            loading: '',
            elemStyle: {},
            loadStyle: {},
            test: '',
            bBtn: false
        };
    }
    changeBtn(){
        this.setState({
            bBtn: false
        })
    }
    reset(){
        let elem = ReactDOM.findDOMNode(this);

        setTimeout(function(){
            elem.style.WebkitTransitionDuration = '300ms';
            elem.style.transitionDuration = '300ms';
            elem.style.WebkitTransform = 'translate3d(0, 0px, 0)';
            elem.style.transform = 'translate3d(0, 0px, 0)';
            moveH = 0;
            elem.removeEventListener('touchmove', this.defaults, false);


        }.bind(this), 300)
    }
    defaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    componentDidMount(){
        let elem = ReactDOM.findDOMNode(this),
            upStatus = ReactDOM.findDOMNode(this.refs.upStatus),
            options = {
                scrollY:0,
                scrollX:0,
                loadH: 68,
                isScrollingUp: false,
                isScrollingDown: false
            },
            // 旋转箭头图标（可以松手加载）
            transShow = (moveH) =>{

                // 大于加载移动的数值
                if (Math.abs(moveH) > 68) {
                    upStatus.style.WebkitTransform = 'rotate(0deg)';
                    upStatus.style.transform = 'rotate(0deg)';

                } else {
                    upStatus.style.WebkitTransform = 'rotate(180deg)';
                    upStatus.style.transform = 'rotate(180deg)';
                }
            },
            release = (elem) => {
                elem.style.WebkitTransitionDuration = '300ms';
                elem.style.transitionDuration = '300ms';

                if (Math.abs(moveH) > 68) {

                    elem.style.WebkitTransform = 'translate3d(0, 68px, 0)';
                    elem.style.transform = 'translate3d(0, 68px, 0)';
                    elem.addEventListener('touchmove', this.defaults, false);

                    // 刷新
                    this.setState({
                        loading: 'loading',
                        bBtn: true
                    })

                } else {
                    // 恢复
                    this.reset(elem);
                }
            };



            //　如果下拉刷新有父元素是带滚动条的以父元素为滚动基准
            let body = getParentScroll(elem);
            elem.style.minHeight = (document.documentElement.clientHeight - 50) + 'px';

            elem.addEventListener('touchstart', (e) => {

                // 如果body  scrollTop 大于 0 就不执行下拉加载

                if (document.body.scrollTop <= 1 && body.scrollTop<= 1) {
                options.isScrollingDown = true;
                options.scrollY = e.targetTouches[0].pageY;
                options.scrollX = e.targetTouches[0].pageX;
            }
            return true;
        }, false);

        elem.addEventListener('touchmove', (e) => {


            if (e.targetTouches.length > 0 && options.isScrollingDown) {
                elem.style.WebkitTransitionDuration = '0ms';
                let touch = e.targetTouches[0];
                moveH = touch.pageY - options.scrollY;

                // 左右滑动距离大于上下滑动距离
                if (Math.abs(touch.pageX - options.scrollX) > moveH) {
                    options.isScrollingDown = false;
                    return;
                }

                if (moveH > 0) {

                    moveH = moveH > 80 ? moveH / (1 + moveH / (document.documentElement.clientHeight /.8) ) : moveH;
                    moveTo(e);
                }
            }
            function moveTo(e){
                transShow(moveH)
                elem.style.WebkitTransform = 'translate3d(0,' + moveH +'px, 0)';
                elem.style.transform = 'translate3d(0,' + moveH +'px, 0)';
                e.preventDefault();
            }

        }, false)

        elem.addEventListener('touchend', function(){


            if (Math.abs(moveH) > 0 &&  options.isScrollingDown) {
                release(this)
            }
            options.isScrollingDown = false;
            return true;
        })

        /*
         * 解决fixed在transform定位的问题
         */
        function transitionEnd(){
            if (moveH == 0) {
                elem.style.WebkitTransform = null;
                elem.style.transform = null;
            }

        }
        elem.addEventListener('webkitTransitionEnd', transitionEnd, false);

    }

    render(){

        return (
            <div className="dorp-down">

                <div className="up-load"><span ref="upStatus" className={this.state.loading} ></span></div>

                <div className="" ref="main">{this.props.children}</div>
                <ScrollLoad  {...this.props}  dorpdown={this.state.bBtn} changeBtn={() => {this.changeBtn()}} reset={() => this.reset()} />
            </div>
            )
    }
}
DorpDown.propTypes = {
    title: React.PropTypes.string,  //当前网页的title
    data: React.PropTypes.array.isRequired,    //判断是不是显示滚动刷新
    initFN: React.PropTypes.func.isRequired,   // 更新父组件的state
    sendData: React.PropTypes.object,           //ajax参数
    url: React.PropTypes.object           //ajax路径
}
/**
 * <Dorpdown title="活动记录" data={this.state.activityData} sendData={{r:3}} url={{activityData: '/', activityDetail: '/#f'}} initFN={(label , data , flag) => this.getData(label , data , flag)} >
 *     data
 *     只有滚动加载才用到
 *     initFN
 *     @params label {String} 更新父组件相应的state
 *     @params data {Object}  更新的对象
 *     @params flag {Boolean} 是否追加
 */
export default DorpDown;