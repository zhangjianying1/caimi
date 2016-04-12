import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Auth from '../../core/Auth';
import superagent from 'superagent';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import ScrollLoad from '../../components/scrollload/Scrollload';
import {loading, address, confirm} from '../../actions/action';
import Confirm from '../../components/dialog/Confirm';

require('./address.scss');

class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: {}
        }
    }
    componentWillMount(){
        let {dispatch, addressData} = this.props;

        if (addressData) {
            addressData.map((val) => {
                if (val.addressId == this.props.params.addressId) {
                    this.setState({
                        address: val
                    })
                }
            })
        } else {
            dispatch(loading(true))
            superagent.get('#/glodController/address').set('Accept', 'application/json').query({userCode: Auth.getUserCode()}).then((res) => {
                // 有返回信息
                res = {
                    ok: true,
                    body: {
                        code: '0000',
                        result: {
                            arrayList: [
                                {

                                    addressId: 2,
                                    default: 0,            // 0 => 默认地址   1 => 非默认地址
                                    name: 'iphone6s 64G',
                                    province: '山东省',
                                    city: '济南',
                                    area: '高新区',
                                    postCode: '022345',
                                    addressDetail: '颖秀路8445号 讯蓝科技有限公司',
                                    mobile: '1348728494',

                                }
                            ]
                        },
                        msg: '中奖信息'
                    }
                }
                if (res.ok) {
                    let body = res.body;


                    if (body.code === '0000') {
                        this.setState({
                            address: body.result.arrayList[0]
                        })
                    }

                    dispatch(loading(false));
                }
            })
        }
    }
    setDefault(){
        let {dispatch} = this.props;

        dispatch(loading(true))
        superagent.get('#/userController/setdefaultaddress').set('Accept', 'application/json').query({userCode: Auth.getUserCode(), addresId: this.props.params.addressId}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result: { },
                    msg: '中奖信息'
                }
            }
            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    history.back();
                }

                dispatch(loading(false));
            }
        })
    }
    // 删除
    showConfirm(){
        let {dispatch} = this.props;
        dispatch(confirm({bBtn: true}))
    }
    delHandle(){
        superagent.get('#/userController/deladdress').set('Accept', 'application/json').query({addressId: this.props.params.addressId}).then((res) => {

            res = {
                ok: true,
                body: {
                    code: '0000',
                    result:{},
                    msg: 'ok'
                }
            }

            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    history.back();
                }
            }
        })
    }

    render(){
        let address = this.state.address;

        return(

            <div className="usercenter-address">
                <Header title="收货地址详情" />
                <div className="body">
                    <div className="add-address">
                        <div className="a-basic">
                            <div className="input-box"><label>收货人姓名：</label><span className="">{address.name}</span></div>
                            <div className="input-box"><label>手机号码：</label><span className="">{address.mobile}</span></div>
                        </div>
                        <div className="a-basic">
                            <div className="input-box"><label>邮政编码：</label><span className="">{address.postCode}</span></div>
                            <div className="input-box"><label>省、市、区：</label><span className="">{address.province + ' ' + address.city + ' ' + address.area}</span></div>
                        </div>
                        <div className="a-basic">
                            <div className="input-box"><label>详细地址：</label><span className="a-detail">{address.addressDetail}</span></div>
                        </div>
                    </div>


                    <div className="address-control">
                        <span className="btn-small btn-small-primary" onClick={() => this.showConfirm()}>删除</span>
                        <Link to={`addaddress/${this.props.params.addressId}`} className="btn-small btn-small-primary">修改</Link>
                    </div>
                </div>
                {address.default == 1 ?<div className="fixed-bottom"><span onClick={() => {this.setDefault()}} className="btn btn-small-primary">设为默认地址</span></div> : null}
                <Confirm title="删除提示" message="确认要删除此收货地吗？" btnLeftText="取消" btnRightText="确定" btnRightFN={() => this.delHandle()} />
            </div>
            )
    }
}


let init = (store) => {
    return {
        addressData: store.address
    }
}
export default connect(init)(AddAddress);