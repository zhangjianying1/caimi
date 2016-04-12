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


let combineReducer = combineReducers({
    loading,
    confirm,
    alert
})

export default combineReducer;