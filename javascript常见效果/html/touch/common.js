﻿function _pages() {
    var _dw = document.documentElement.clientWidth,
    _sc = _dw / 640;
    document.body.style.zoom = _sc;
}
window.onresize = function () {
    _pages();
}
window.onload = function () {
    _pages();
}
    
