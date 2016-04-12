import {isObject, isEmptyObject} from './object';


export function extend(flag, obj1, obj2){

    // 如果只有一个参数并且这个参数是对象
    if (arguments.length == 1 && isObject(flag) ) return flag;

    if (flag !== true) {
        obj2 = obj1;
        obj1 = flag;
        flag = false;
    }


    for (let i in obj2) {

        // 深拷贝
        if (flag === true && !isEmptyObject(obj2[i])) {
            extend(true, obj1[i], obj2[i]);
        } else {
            obj1[i] = obj2[i];
        }
    }
}