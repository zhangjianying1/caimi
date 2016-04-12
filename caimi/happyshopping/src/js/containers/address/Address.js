import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Auth from '../../core/Auth';
import superagent from 'superagent';
import Dorpdown from '../../components/dorpdown/Dorpdown';
import ScrollLoad from '../../components/scrollload/Scrollload';
import {loading, address} from '../../actions/action';


require('./address.scss');
let bBtn = true;

class Address extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            address: []
        }
    }

    loadFN(elem, reset){
        let {dispatch} = this.props;
        //
        if (bBtn) {
            bBtn = false;
            // 显示加载
            dispatch(loading(true));

            if (elem != null) {
                this.state.page = 0;
                this.state.address = [];
            }
            this.state.page++;

            // userCode 如果有就是用户自己的晒单，没有就是全部晒单
            superagent.get('#/userController/address').set('Accept', 'application/json').query({page: this.state.page, userCode: Auth.getUserCode()}).then((res) => {
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

                                },
                                {
                                    addressId: 1,
                                    default: 0,            // 0 => 默认地址   1 => 非默认地址
                                    name: 'iphone6s 64G',
                                    province: '山东省',
                                    city: '济南',
                                    area: '高新区',
                                    postCode: '022345',
                                    addressDetail: '颖秀路8445号 讯蓝科技有限公司',
                                    mobile: '1343456449',


                                },
                            ]
                        },
                        msg: '中奖信息'
                    }
                }
                if (res.ok) {
                    let body = res.body;

                    if (body.code === '0000') {

                        if (this.state.page == 3) {
                            this.setState({
                                page: 'not'
                            })
                        } else {
                            if (elem != null) {
                                reset(elem);
                            }
                            let temp = this.state.address.concat(body.result.arrayList),
                                defaultAddress;

                            temp.forEach((val, index) => {
                                if (val.default == 0) {
                                    defaultAddress = temp.splice(index, 1)
                                }
                            })
                            temp.unshift(defaultAddress[0]);
                            this.setState({
                                address: temp
                            })
                            // 存晒单数据
                            dispatch(address(this.state.address));
                        }
                        // 打开开关变量
                        bBtn = true;
                        dispatch(loading(false));
                    }
                }
            })
        }

    }
    componentWillMount(){
        Auth.setUserCode();
        this.loadFN();
    }
    render(){
        return(
            <div className="usercenter-address">
                <Header title="我的收货地址" />
                <div className="body">
                    {this.state.address.length > 0 ? <ul className="address-list">
                        {

                            this.state.address.map((val, index) => {
                            return (<li key={index} className={val.default == 0 ? 'active' : null}>
                                <Link to={`addressdetail/${val.addressId}`}>
                                        {val.default == 0 ? <p className="address-default">默认地址：
                                            <span className="icon icon-defalt-address"></span>
                                        </p> : null }
                                    <div className="a-cont">
                                        <div className="a-header">
                                            <strong>{val.name}</strong>
                                            <i>{val.mobile}</i>
                                        </div>
                                        <p>
                                                {val.province + val.city + val.area + val.addressDetail}
                                        </p>
                                    </div>
                                </Link>
                            </li>)
                        })
                            }

                    </ul>
                        :
                        <div className="not-data">您还没收货地址</div>
                        }
                </div>

                <div className="fixed-bottom"><Link to="addaddress/0" className="btn btn-small-primary">添加新地址</Link></div>
            </div>
            )
    }
}

export default connect()(Address);