export let isEmptyObject = function(obj) {
    if (isObject(obj)) {
        for (var i in obj) {
            return false;
        }
    }

    return true;
}
export let setToFixed = function(number){

    if (number == undefined) return;

    let result = '' + number,
        re = /(^[0-9]*$|^[0-9]*\.[0-9]{1,2})/;


    result = re.exec(result);
    return result && result[0];
}
export function isArray(array){
    return Object.prototype.toString.call(array) == '[object Array]';
}
export function isObject(obj){
    return Object.prototype.toString.call(obj) == '[object Object]'
}