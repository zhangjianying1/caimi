import React from 'react';
import ExtensionList from '../../components/list/ExtensionList';

/**
 * 活动列表
 */
class Activity extends React.Component{

    render(){

        return(
            <ExtensionList title="活动名称" sendData={{r:3}}  urls={{scrollLoad: {url: '/', label: 'data'}}} />

            )
    }
}

export default Activity;