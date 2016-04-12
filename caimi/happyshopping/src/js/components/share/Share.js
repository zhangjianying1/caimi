import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {loading} from '../../actions/action';
import superagent from 'superagent';
import {system} from '../../core/system';

let bBtn = true;

require('./share.scss');

class Share extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sendPic: []
        }
    }

    //发表
    sendShare(){

        let data = this.state.shareLotteryList,
            textareaVal = ReactDOM.findDOMNode(this.refs.textarea).value,
            sendPic = this.state.sendPic,
            {userCode , params , dispatch} = this.props;

        if ((textareaVal || sendPic.length != 0) && bBtn) {

            dispatch(loading(true))

            bBtn = false;
            superagent.get('#/glodController/releaseshare').set('Content-Type', 'application/x-www-form-urlencoded').
                send({userCode: userCode , lotteryId: params.lotteryId, issue: params.issue, pic: sendPic, message: textareaVal}).then((res) => {
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result:{
                        },
                        msg: 'ok'
                    }
                }

                if (res.ok) {
                    let body = res.body;
                    if (body.code === '0000') {
                        bBtn = true;
//                        发表成功跳转到用户中心晒单页
                        this.props.history.pushState(null, '/showlottery/2');
                        dispatch(loading(false))
                    }
                }
            })
        }

    }
    // 上传图片
    updateImg(e){
        let fileList = e.target.files,
            result = [],
            count = 0,
            This = this;

        if (this.state.sendPic.length > 6) {
            return;
        }

        if (fileList.length) {
            for (let i = 0, f; f = fileList[i]; i++) {
                let re = /(gif|png|jpg|jpeg)$/
                let s = ''

                // 是图片
                if (re.test(f.type || f.fileName)) {
                    count ++;
                    let fr = new FileReader()
                    fr.onload = (e) => {

                        if (this.state.sendPic.length + result.length < 6) {
                            result.push(e.target.result);
                        }

                        // 图片都加载完成
                        count --;
                        if (count == 0) {
                            this.setState({
                                sendPic: this.state.sendPic.concat(result)
                            })
                        }
                    }
                    fr.readAsDataURL(f);
                }
            }
        }
    }
    default(e){
        e.stopPropagation();
        e.preventDefault();
    }
    componentDidMount(){
        let file = ReactDOM.findDOMNode(this.refs.file);

        file.addEventListener('change', this.updateImg.bind(this), false);



//        textarea.onfocus = function(e){
//            if (system() !== 'ANDROID' ) {
//                context.style.position = 'absolute';
//                context.style.top = document.body.scrollTop + document.documentElement.clientHeight + 'px';
//            }
//        }
    }
    componentWillReceiveProps(nextProps){

        if (nextProps.share) {
            document.body.addEventListener('touchmove', this.default, false);
        } else {
            document.body.removeEventListener('touchmove', this.default, false);
        }
    }
    componentWillUnmount(){
//        let file = ReactDOM.findDOMNode(this.refs.file);
//        file.get(this).addEventListener('change', this.updateImg, false)
    }
    cancel(){
        if (this.props.hide) {
            this.props.hide('share');
        }

    }
    render(){

        let style = () => {
            return {
                WebkitTransform: 'translate3d(0, '+ (this.props.share ? -100 : 0) + '%, 0)',
                transform: 'translate3d(0, ' + (this.props.share ? -100 : 0) + '%, 0)',
            }
        }

        return(
                <div className="share-layer" style={{display: this.props.share ? 'block' : 'none', top: document.body.scrollTop + 'px'}}>
                    <header className="header">
                        <a onClick={() => this.cancel()}href="javascript:;" className="header-control">取消</a>
                        <h1>晒单分享</h1>
                        <a onClick={() => this.sendShare()} href="javascript:;" className="header-control">发表</a>

                    </header>
                    <div className="share-body">
                        <div className="share-msg">

                            <textarea placeholder="中奖了，说点什么吧" ref="textarea"></textarea>
                        </div>
                        <div className="share-pic">
                            <ul className="share-pic-list">


                                <li>
                                    <div className="pic-box"><input ref="file" type="file" accept="image/*" multiple /><img src="./images/icon-file.png" /></div>
                                </li>
                            {
                                this.state.sendPic.map(function(val, index){
                                    return (<li key={index}><div className="pic-box"><img src={val} /></div></li>)
                                })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )
    }
}

export default connect()(Share);