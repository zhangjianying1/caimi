import React from 'react';
import {setToFixed} from '../../core/object';

let SldTemp = function(props){
    return (
        <div>
        {
            props.shareLotteryDetailList.map((val, index) => {
                return (

                    <div className="share-lottery-detail" key={index}>

                        <div className="comd-cont share-lottery-comd share-detail-user">
                            <div className="comd-left">
                                <div className="c-l-img img" style={{backgroundImage: `url(${val.userPhoto})`}}></div>
                            </div>
                            <div className="comd-right">
                                <div className="share-username">
                                    <h3 className="text-blue">{val.userName}</h3>
                                    <time>{val.shareTime}</time>
                                </div>
                            </div>
                        </div>
                        <div className="share-detial-cont">
                            <div className="share-des">
                                <p>获得奖品：{val.lotteryName}</p>
                                <p>参与人次：{val.partakeCount}</p>
                                <p>回报率：{setToFixed(val.allPartakeCount / val.partakeCount)}倍</p>
                                <p>幸运号码：{val.luckyNumber}</p>
                            </div>
                            <div className="share-msg">
                                {

                                    val.shareImg.map((image, index) => {
                                    return (<img key={index} id={image} onClick={(e) => props.clickImg(e, val.shareId, index)} className="img"/>)
                                })
                                    }
                            </div>
                        </div>
                        <div className="share-hot">
                            <p className="share-hot-show">
                                <strong onClick={(e) => props.clickPraise(e, val.shareId)}><i className="icon icon-praise" style={val.style}></i><span >{val.praiseCount}</span></strong>
                                <strong onClick={(e) => props.clickComment(e, val.shareId)}><i className="icon icon-comment"></i>{val.commentCount}</strong>
                            </p>
                        </div>

                    </div>
                    )
            })
        }
        </div>
        )
}
export default SldTemp;