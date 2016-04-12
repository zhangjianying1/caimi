export let user = function (val){
    return {type: 'USER', val};
}
export let loading = function (val){
    return {type: 'LOADING', val};
}
export let alert = function (val){
    return {type: 'ALERT', val};
}
export let confirm = function (val){
    return {type: 'CONFIRM', val};
}
export let error = function (val){
    return {type: 'ERROR', val};
}
export let commodity = function(type, val) {
    return {type: type, val};
}
/*
*  用户收货地址
*/
export let address = function (val){
    return {type: 'ADDRESS', val};
}


/*
* 分享晒单
*/
export let sharelottery = function (val){
    return {type: 'SHARE', val};
}

/*
 * 晒单评论
 */
export let comment = function (val){
    return {type: 'COMMENT', val};
}
