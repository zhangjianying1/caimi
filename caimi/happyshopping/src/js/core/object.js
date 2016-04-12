export let isEmptyObject = function(obj) {
    for (var i in obj) {
        return false;
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