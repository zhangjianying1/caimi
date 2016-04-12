import React from 'react';
import Header from '../header/Header';
import ShareLotteryList from '../../components/sharelotterylist/ShareLotteryList';

class ShareLottery extends React.Component{


    render(){
        return(
            <div className="share-lottery">
                <Header title="晒单墙" />
                <div className="body">

                    <ShareLotteryList {...this.props} />
                </div>
            </div>
            )
    }
}


export default ShareLottery;