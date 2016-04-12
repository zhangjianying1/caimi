import superagent from 'superagent';
import {loading} from '../actions/action';
import {extend} from '../utils/extend';
let bBtn = true;
/**
 * post
 * @param param {Object}
 */
export function post(param){
    let obj = {
        dispatch: function(){},
        url: '/',
        header: '',
        sendData: {},
        callback: function(){}

    }
    if (bBtn) {
        bBtn = false;
        extend(true, obj, param);
        // 显示加载loading
        obj.dispatch(loading(true));

        // 发送信息
        superagent.get(obj.url).query(obj.sendData).then((res) => {
            // 有返回信息
            res = {
                ok: true,
                body: {
                    code: '0000',
                    result:{
                        title: '理财知识'
                    },
                    msg: ''
                }
            }

            if (res.ok) {
                let body = res.body;

                if (body.code === '0000') {

                    // 触发回调传递返回参数
                    if (obj.callback) {
                        setTimeout( () => {
                            obj.callback(body.result);
                        //加载完
                        obj.dispatch(loading(false));
                        // 打开
                        bBtn = true;
                    } , 1000)
                }

            }


        }
    })
    }

}