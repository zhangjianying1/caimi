import React from 'react';


import superagent from 'superagent';

import Header from '../../containers/header/Header';

class GoldParadiseComodityShowImg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            html: ''
        }

    }
    componentWillMount(){
        let lotteryId = this.props.params.lotteryId,
            issue = this.props.params.issue;

        // 商品信息
        superagent.get('#/glodController/commodityshowimg').set('Accept', 'application/json').query({lotteryId: lotteryId, issue: issue}).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result: '<div><img src="./images/1.jpg" />iphone6 32G</div>',
                    msg: '图文详情'
                }
            }
            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {

                    this.setState({
                        html: body.result
                    })
                }
            }
        })

    }
    render(){

        let showImg = () => {
            return this.state.html
        }
        return(
            <div className="gold-index">
                <Header title="图文详情" />
                <div className="body" dangerouslySetInnerHTML={{__html: this.state.html}} >

                </div>
               
            </div>
            )
    }
}

export default GoldParadiseComodityShowImg;