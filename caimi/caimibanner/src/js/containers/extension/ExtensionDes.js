import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loading} from '../../actions/action';
import superagent from 'superagent';
import Header from '../../components/header/Header';

require('./extension-des.scss');
/**
 * 推广的文章
 */
class Extension extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            extensionDesData : {}
        }
    }
    componentWillMount(elem, reset){
        let {dispatch} = this.props;

        // 下拉刷新 (通知partakelist 更新数据)
        if (elem != null) {
            this.state.sendNotice = true;
        }
        // 显示加载loading
        dispatch(loading(true));
        // 商品信息
        superagent.get('#/glodController/lotterydetail').set('Accept', 'application/json').query({lotteryId: this.props.params.lotteryId, issue: this.props.params.issue}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result:{
                        title: '理财知识'
                    },
                    msg: '商品'
                }
            }

            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {
                    this.setState({
                        extensionDesData: body.result
                    })
                    if (elem != null) reset(elem);
                    dispatch(loading(false));
                }
            }
        })

    }

    render(){

        return(
            <div className="extension-user-article">
                <Header title={this.state.extensionDesData.title} />
                <h1>理财知识</h1>
                <div className="publish-time"><time>2016-02-02</time><em>彩米科技</em></div>
                <article>
                为什么工资涨不过房价？为什么娶个老婆要50万？如何实现工资5000元，
                年收入却可达10万以上？理财知识，为你解密。央视财经评论员亲自定期在该平台发布最新理财知识，除却股票、黄金、基金以外，是否有更多的理财渠道适合？关注理财知识，让你成为朋友眼中的理财达人
                </article>
                <div className="extension-user-code">
                    <img src="../images/code.jpg" />
                    <p className="c-red">长按二维码,自动识别,添加关注</p>
                </div>
            </div>
            )
    }
}



export default connect()(Extension);
