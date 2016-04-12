/**
 * 找到带有滚动条的父元素
 * @param obj {Object} 当前元素
 * @returns {Object} 返回的父元素没有的话就返回当前元素
 */
export let getParentScroll = function getParentScroll(obj) {

    while (obj = obj.parentNode) {

        if (obj.className == 'body') {
            return obj;
        }
    }
    obj = {
        scrollTop: 0
    }
    return obj;
}