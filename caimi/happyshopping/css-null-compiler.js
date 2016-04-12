function noop() {
    return null;
}


// you can add whatever you wanna handle
require.extensions['.scss'] = noop;
require.extensions['.png'] = noop;