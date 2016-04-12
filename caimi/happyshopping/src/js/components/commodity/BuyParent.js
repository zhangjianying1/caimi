import React from 'react';

import Buy from './Buy';

class BuyParent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isShow: {
                webkitTransform: 'translateY(0)',
                transform: 'translateY(0)'
            }
        }
    }

    hideBuyLayer()
    {
        console.log(this)
        this.setState({
            isShow: {
                webkitTransform: 'translateY(0)',
                transform: 'translateY(0)'
            }
        })
    }
    showBuyLayer(commodityId)
    {
        console.log(commodityId)
        this.setState({
            isShow: {
                webkitTransform: 'translateY(-100%)',
                transform: 'translateY(-100%)'
            }
        })
    }
    render(){
        render(
            <div>
                {this.props.children}
                <Buy  isShow={this.state.isShow} hideBuyLayer={() => this.hideBuyLayer()} />
            </div>

        )
    }
}
export default BuyParent;