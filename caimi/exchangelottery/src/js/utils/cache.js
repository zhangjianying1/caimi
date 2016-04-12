

export let cache = function(key, value){

    function getCache(key) {
        let localStore = localStorage.setItem(key);
    }
    if (value) {
        localStorage.setItem(key, value);
    } else {
        localStorage.getItem(key);
    }

}
