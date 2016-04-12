import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading} from '../../actions/action'
import superagent from 'superagent';
import ConfirmAddress from '../../components/dialog/ConfirmAddress';
import Share from '../../components/share/Share';
import Prompt from '../../components/dialog/Prompt';
require('./lottery.scss');
//
class Lottery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            takeAddress: {},
            isShow: false,
            prompt: false,
            share: false
        }
    }

    hide(key){
        this.setState({
            [key]: false
        })
    }
    show(key){

        this.setState({
            [key]: true
        })
    }
    setConfirmAddress(boolean){
        this.setState(
            {isShow:boolean}
        )
    }

    getAddress(userCode){
        let {dispatch} = this.props;

        // 显示加载loading
        dispatch(loading(true));

        this.setConfirmAddress(true);

        // 获取默认地址
        superagent.get('#/userController/takeaddress').set('Accept', 'application/json').query({userCode: userCode}).then((res) => {
            // 有返回信息
            res = {
            ok: true,
            body: {
                code: '0000',
                result: {
                    arrayList:[

                        {
                            addresId: 1,
                            default: 1,
                            province: '山东省',
                            city: '青岛市',
                            area: '李沧区',
                            addressDetail: '南街一号8号908室',
                            takeName: '张三',
                            mobile: '1359857473'
                        }
                    ]
                },
                msg: '收获地址'
            }
        }
        if (res.ok) {
            let body = res.body;
            if (body.code === '0000') {
                this.setState({
                    takeAddress: body.result.arrayList[0]
                })
                dispatch(loading(false));


            }
        }
    })
    }
    // 领取奖品
    confirmTake(userCode){
        let {dispatch, takeLottery} = this.props;


        // 显示加载loading
        dispatch(loading(true));

        superagent.get('#/userController/takelottery').set('Accept', 'application/json').query({userCode: userCode}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result: {

                    },
                    msg: '成功领取'
                }
            }
            if (res.ok) {
                let body = res.body;
                if (body.code === '0000') {

                    dispatch(loading(false));
                    this.show('prompt');
                    // 直接更新父组件的属性（领取完成）
                    takeLottery.takeLotteryStatus = 1;
                }
            }
        })
    }
    modityAddress(){
        let {history} = this.props;

        history.pushState(null, '/addaddress/' + this.state.takeAddress.addresId)
    }
    partakeNews(){
        let {params, history, nextLotteryIssue} = this.props;
        history.pushState(null , '/commodity/' + params.lotteryId + '/' + nextLotteryIssue);
        location.reload();
    }
    render(){
        let {userCode, takeLottery, params} = this.props,
            takeAddress = this.state.takeAddress;
        return (

            <div>
                <div className="fixed-bottom">
                    <div className="take-lottery-status">
                 {

                     // 0 =》 未领奖， 1 =》未配送， 2 =》配送中, 3 =>签收异常 ， 4 =》签收, 5 => 已领取
                         userCode ==  takeLottery.userCode ? this.props.lotteryType == 0 ?
                         takeLottery.takeLotteryStatus == 0 ?
                     <div className="text-btn-box"><p>恭喜您中奖，请尽快确认领奖</p> <span className="btn-small btn-small-primary" onClick={() => this.getAddress(takeLottery.userCode)}>确认领奖</span></div>:
                         takeLottery.takeLotteryStatus == 1 ?
                     <p className="text-center">奖品安排配送中，将尽快发货</p> :
                         takeLottery.takeLotteryStatus == 2 ?
                     <div className="express-msg text-center"><p> 奖品已配送，请等待收货</p>
                         <span className="text-orange">{takeLottery.expressName}：{takeLottery.expressNumber}</span></div> :
                         takeLottery.takeLotteryStatus == 3 ?
                     <div className="text-btn-box"><p>奖品收货异常已被退回，请联系客服</p><a  className="btn-small btn-small-primary" href="tel:400-99-00">联系客服</a></div> :
                         takeLottery.takeLotteryStatus == 4 && takeLottery.share == 0 ?
                     <div className="text-btn-box"><p>奖品已确认收货，快晒单分享一下吧</p><span className="btn-small btn-small-primary"
                     onClick={(share) => this.show('share')}>晒单分享</span></div>:
                     <div className="text-btn-box">
                         <Link className="btn-small btn-small-primary" to={`sharelotterydetail/${params.lotteryId}/${params.issue}/${takeLottery.shareId}`}>查看晒单</Link>
                         <a onClick={() => this.partakeNews()} className="btn-small btn-small-primary" >继续参与</a>
                     </div>

                     :
                     <div className="text-btn-box">

                         <Link className="btn-small btn-small-primary" to="">已领详情</Link>
                         <span className="btn-small btn-small-primary" onClick={() => this.shareLottery()}>分享晒单</span>
                     </div>
                     : null
                     }
                    </div>
                </div>
                <ConfirmAddress isShow={this.state.isShow} setConfirmAddress={(arg) => this.setConfirmAddress(arg)} title="请确以下信息是否准确"
                btnLeftFN={() => this.modityAddress()} btnLeftText="修改" btnRightText="确认" btnRightFN={() => this.confirmTake(takeLottery.userCode)}>
                    <div>
                        <p>收货地址：{takeAddress.province}{takeAddress.city}{takeAddress.area}{takeAddress.addressDetail}</p>
                        <p>收货人姓名：{takeAddress.takeName}</p>
                        <p>收货人手机：{takeAddress.mobile}</p>
                    </div>
                </ConfirmAddress>
                <Prompt msg="成功领取奖品" prompt={this.state.prompt} hide={(arg) => this.hide(arg)}/>
                <Share {...this.props}  share={this.state.share} hide={(arg) => this.hide(arg)} />
            </div>
            )
    }

}

export default connect()(Lottery)