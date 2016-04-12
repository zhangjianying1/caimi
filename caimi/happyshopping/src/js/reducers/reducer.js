import {combineReducers} from 'redux';

let user = (state='', action) => {
    switch(action.type) {
        case 'User':
            return action.val
            break;
        default:
            return state;
    }
};
//加载状态
let loading = (state='', action) => {
    switch(action.type) {
        case 'LOADING':
            return action.val
            break;
        default:
            return state;
    }
};
//确定提示框
let confirm = (state={}, action) => {
    switch(action.type) {
        case 'CONFIRM':
            return action.val
            break;
        default:
            return state;
    }
};
//alert提示
let alert = (state='', action) => {
    switch(action.type) {
        case 'ALERT':
            return action.val
            break;
        default:
            return state;
    }
};
//error
let error = (state='', action) => {
    switch(action.type) {
        case 'ERROR':
            return action.val
            break;
        default:
            return state;
    }
};
//分享
let sharelottery = (state='', action) => {
    switch(action.type) {
        case 'SHARE':
            return action.val
            break;
        default:
            return state;
    }
};

//地址
let address = (state='', action) => {
    switch(action.type) {
        case 'ADDRESS':
            return action.val
            break;
        default:
            return state;
    }
};

//全部商品
let allCommodity = (state='', action) => {
    switch(action.type) {
        case 'ALL':
            return action.val
            break;
        default:
            return state;
    }
};
//最热商品
let hotCommodity = (state='', action) => {
    switch(action.type) {
        case 'HOT':
            return action.val
            break;
        default:
            return state;
    }
};

//评论
let comment = (state='', action) => {
    switch(action.type) {
        case 'COMMENT':
            return action.val
            break;
        default:
            return state;
    }
};
let combineReducer = combineReducers({
    loading,
    confirm,
    alert,
    error,
    sharelottery,
    address,
    allCommodity,
    hotCommodity,
    comment
})

export default combineReducer;