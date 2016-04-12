import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Auth from '../../core/Auth';
import superagent from 'superagent';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import ScrollLoad from '../../components/scrollload/Scrollload';
import {loading, address, error} from '../../actions/action';
import Area from '../../components/area/Area';
import Input from '../../components/input/Input';
import Error from '../../components/error/Error';




require('./address.scss');
let bBtn = true;

class AddAddress extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            mobile: '',
            postCode: '',
            area: '',
            addressDetail: '',
        }
    }

    componentWillMount(){
        let {dispatch, params, addressData} = this.props;


        // 是修改
        if (params.addressId != 0) {

            if (addressData) {
                let address = ''
                addressData.map((val) => {
                    if (val.addressId == this.props.params.addressId)  address = val;
                })
                this.setState({
                    name: address.name,
                    mobile: address.mobile,
                    postCode: address.postCode,
                    area: address.province + ' ' + address.city + ' ' + address.area,
                    addressDetail: address.addressDetail
                })
            } else {

                dispatch(loading(true))
                superagent.get('#/glodController/address').set('Accept', 'application/json').query({addressId: params.addressId}).then((res) => {
                    // 有返回信息
                    res = {
                        ok: true,
                        body: {
                            code: '0000',
                            result: {
                                arrayList: [
                                    {
                                        addressId: 2,
                                        default: 1,            // 0 => 默认地址   1 => 非默认地址
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
                            let address = body.result.arrayList[0];

                            this.setState({
                                name: address.name,
                                mobile: address.mobile,
                                postCode: address.postCode,
                                area: address.province + ' ' + address.city + ' ' + address.area,
                                addressDetail: address.addressDetail
                            })
                        }

                        dispatch(loading(false));
                    }
                })
            }
        }
    }
    inputHandle(name, val) {
        this.state[name] = val;

    }
    subFN(){

        let {dispatch} = this.props,
            name = this.state.name,
            mobile = this.state.mobile,
            postCode = this.state.postCode,
            area = this.state.area,
            addressDetail = this.state.addressDetail;

        if (!name) {
            dispatch(error('收货人姓名不能为空'));
        } else if (!mobile){
            dispatch(error( '收货人手机号码不能为空'))
        } else if (!area || !addressDetail){
            dispatch(error('收货人地址不能为空'))

        } else if (bBtn) {
            bBtn = false;
            dispatch(loading(true))
            superagent.get('#/userController/putaddress').set('Accept', 'application/json').
                query({name: name, mobile: mobile, postCode: postCode, area: area, addressDetail: addressDetail}).then((res) => {
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
                        this.props.history.pushState(null, '/address');
                    }
                    bBtn = true;
                    dispatch(loading(false));
                }
            })
        }
    }
    render(){


        let {name, mobile, postCode, area, addressDetail} = this.state;
        return(

            <div className="usercenter-address">
                <Header title="添加收货地址" ><span className="header-control" onClick={() => this.subFN() }>保存</span></Header>
                <div className="body">
                    <div className="a-basic">
                        <div className="input-box"><label>收货人姓名：</label>
                            <Input name="name" val={name} placeholder="请输入姓名" inputHandle={(name, val) => this.inputHandle(name, val)} />
                        </div>
                        <div className="input-box"><label>手机号码：</label>
                            <Input name="mobile" placeholder="请输入手机号码" val={mobile} inputHandle={(name, val) => this.inputHandle(name, val)}/>
                        </div>
                    </div>
                    <div className="a-basic">
                        <div className="input-box"><label>邮政编码：</label>

                            <Input type="tel" name="postCode" placeholder="请输入邮编" val={postCode} inputHandle={(name, val) => this.inputHandle(name, val)}/>
                        </div>
                        <div className="input-box go-to"><label>省、市、区：</label>
                            <Area name="area" placeholder="请选择" val={area} inputHandle={(name, val) => this.inputHandle(name, val)}/>
                        </div>
                    </div>

                    <div className="a-basic">
                        <div className="input-box"><label>详细地址：</label>
                            <Input tagName="textarea" name="addressDetail" placeholder="请输入详细地址（社区、街道、门牌号）" val={addressDetail} inputHandle={(name, val) => this.inputHandle(name, val)}/>
                        </div>
                    </div>
                </div>
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