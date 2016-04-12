import React from 'react';
import ScrollLoad from '../scrollload/ScrollLoad';
import {setDate} from '../../core/date'
const CmTemp = function(props){
    return (
        <div className="share-lottery-comment">
            <h3 className="comment-header text-orange">共<span>{props.commentList.length}</span>条评论</h3>

            <ul>
                {
                    props.commentList.map((val, index) => {
                    return (<li key={index} onClick={() => props.replyHandle(val)}>
                        <div className="comd-cont share-lottery-comd share-detail-user">
                            <div className="comd-left">
                                <div className="c-l-img img" id={val.userPhoto}style={{backgroundImage: "./images/photo.png"}}></div>
                            </div>
                            <div className="comd-right">
                                <div className="share-username">
                                    <h3 className="text-blue"><span className="comment-floor">{index + 1}楼</span>{val.userName}
                                    {
                                            val.userName == props.userName ? <span className="floor-master">楼主</span> : null
                                        }
                                    </h3>
                                    <time>{setDate(val.commentTime, true)}</time>
                                    {
                                        val.replyList ?
                                            val.replyList.map(function(val, index){
                                                return (
                                                    <div className="comment-reply" key={index}>
                                                        <h4 className="to-user">{val.replyUser}:</h4>
                                                        <p>{val.replyMsg}</p>
                                                    </div>
                                                    )
                                            })

                                            : null
                                        }
                                    <div className="comment-msg">{val.commentMsg}</div>
                                </div>
                            </div>
                        </div>
                    </li>)
                })
                    }

            </ul>
            <ScrollLoad loadFN={() => props.loadFN()} page={props.page} />
        </div>
        )
}
export default CmTemp;