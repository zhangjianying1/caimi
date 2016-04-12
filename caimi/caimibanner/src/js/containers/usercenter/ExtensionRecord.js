import React from 'react';

import ExtensionList from '../../components/list/ExtensionList';

/**
 * 编辑管理员
 */
class ExtensionRecord extends React.Component{


    render(){

        return(
            <ExtensionList title="推广记录" sendData={{r:3}} urls={{scrollLoad: {url: '/', label: 'data'}}} />
            )
    }
}

export default ExtensionRecord