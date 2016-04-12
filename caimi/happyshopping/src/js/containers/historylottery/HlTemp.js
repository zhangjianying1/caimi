import React from 'react';
import {Link} from 'react-router';
var HlTemp = function(props){
    return (
        <ul className="history-lottery-list">
            {
                props.historyLotteryList.map((val, index) => {
                return (
                    <li key={index}>
                        <Link to={`commodity/${val.lotteryId}/${val.issue}`}>

                            <div className="history-lottery-issue">
                                <span className="history-lottery-time">{val.lotteryTime}</span><h2>第{val.issue}期</h2>
                            </div>
                            <div className="history-lottery-msg">
                                <div className="comd-left">
                                    <div className="c-l-img img" id={val.img} style={{backgroundImage: "./images/photo.png"}}>
                                    </div>
                                </div>
                                <div className="comd-right">

                                    <div>
                                        <p>中奖者：<span className="text-blue">{val.jackpotUser}</span> ({val.addres})</p>
                                        <p>本期参与：<span className="text-orange">{val.partakeCount}</span> 人次</p>
                                        <p>幸运号码：<span className="text-orange">{val.luckyNumber}</span></p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                    )
            })
          }

        </ul>
        )
}

export default HlTemp

