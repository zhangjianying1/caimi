import React from 'react';
import superagent from 'superagent';
import {findDOMNode} from 'react-dom';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Header from '../src/js/containers/header/Header';
import HlTemp from '../src/js/containers/historylottery/HlTemp';
import ScrollLoad from '../src/js/components/scrollload/ScrollLoad';
import CmTemp from '../src/js/components/comment/CmTemp';
import SldTemp from '../src/js/containers/sharelottery/SldTemp';
function shallowRender(Component, props) {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Component {...props}/>);
    return renderer.getRenderOutput();
}
//describe('sync', function(){
//    it('测试应该5000毫秒后结束', function(done) {
//        var x = true;
//        superagent.get('baidu.com').query({b:1}).then(function(result){
//            x = false;
//            expect(x).to.be.not.ok;
//            done();
//        })
//    });
//})
describe("Header 测试", function(){

    it('Header props', function () {

        const todoItem = shallowRender(Header, {title: 'test', style: "style", children: "<div>child</div>"});

        expect(todoItem.props.children[1].props.children).to.equal("test");
        expect(todoItem.props.style).to.equal("style");
        expect(todoItem.props.children[2]).to.be.equal('<div>child</div>')

    });

})



describe("HistoryLottery测试", function(){
    it("historylottery", function(){
        const todoItem = shallowRender(HlTemp, {historyLotteryList: [{
            lotteryId: '2',
            issue: '201',
            lotteryName: 'iphone6s 34G',
            luckyNumber: '10000234',
            img: './images/1.png',
            jackpotUser: '134***449',
            addres: '山东 德州',
            partakeCount: '129',
            lotteryTime: '2016-01-21 11:11:11',
        }]});

        expect(todoItem.props.children.length).to.be.equal(1)
        const header = TestUtils.renderIntoDocument(todoItem);

        expect(header.querySelector('h2').tagName).to.be.equal('H2')

    })
})

describe("ScrollLoad 测试", function(){
    it ("scroll", function(){

        let page = 'not';
        let tipsText = "加载完毕";
        const scrollload = shallowRender(ScrollLoad, {page: page, tipsText: tipsText});

        expect(scrollload.props.children).to.be.equal(tipsText)

    })
})

describe('Comment 测试', function(){
    let context;
    it ('comment', function(){
        let data = [
            {
                commentId: '3',
                userCode: '123456',
                userPhoto: './images/2.png',
                userName: '134***432',
                commentMsg: '中奖真不易，终于中了iphone6s 34G',
                commentTime: '2016-01-25 14:25:11',
                replyList: [
                    {
                        replyUser: '小王',
                        replyMsg: '中奖了吗？',
                    }
                ]
            }
        ];
        let cmtemp = shallowRender(CmTemp, {commentList: data, userName: '134***432'});
        expect(cmtemp.props.children[0].props.children[1].props.children).to.be.equal(1)
        context = TestUtils.renderIntoDocument(cmtemp);
        let li = context.querySelector('li');
        expect(li).to.be.ok
    })
    it('是楼主', function(){
        let h3 = context.querySelector('li h3');
        expect(h3.innerHTML).to.match(/楼主/)
    })
    it('有回复评论', function(){
        let toUser = context.querySelector('li .to-user');
        expect(toUser.innerHTML).to.match(/小王/);
        let msg = context.querySelector('li p');
        expect(msg.innerHTML).to.match(/中奖了吗？/);
    })
})

describe('ShareLotteryDetail SldTemp 测试', function(){
    let context;
    it ('SldTemp', function(){
        let data = [
            {
                shareId: '1',
                lotteryName: 'iphone6s 64G',
                userPhoto: './images/2.png',
                userName: '校长',
                shareMsg: '中奖真不易，终于中了iphone6s 34G',
                shareImg: ['./images/1.png', './images/2.png'],
                shareTime: '2016-01-21 11:11:11',
                partakeCount: '10',
                allPartakeCount: '8000',
                luckyNumber: 10000234,
                commentCount: 2,
                praiseCount: 3
            }
        ];
        let sldTemp = shallowRender(SldTemp, {shareLotteryDetailList: data});

        context = TestUtils.renderIntoDocument(sldTemp);
        let shareName = context.querySelector('.share-username h3');
        expect(shareName.innerHTML).to.match(/校长/);

        let shareDes = context.querySelectorAll('.share-des p');

        expect(shareDes[0].innerHTML).to.match(/iphone6s\s64G/);


    })
//    it ('点赞', function(){
//        let strong = context.querySelectorAll('.share-hot-show strong');
//        TestUtils.Simulate.click(strong[0]);
//        expect(strong[0].innerHTML).to.match(/\4/)
//    })

})