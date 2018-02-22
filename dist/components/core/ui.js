"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UI = (function () {
    function UI() {
    }
    UI.detectBrowser = function () {
        var agent = navigator.userAgent;
        var browser;
        if (localStorage.getItem('browser')) {
            return localStorage.getItem('browser');
        }
        if (agent.indexOf('Chrome') > -1) {
            browser = 'Chrome';
        }
        else if (agent.indexOf('Safari') > -1) {
            browser = 'Safari';
        }
        else if (agent.indexOf('Opera') > -1) {
            browser = 'Opera';
        }
        else if (agent.indexOf('Firefox') > -1) {
            browser = 'Firefox';
        }
        else if (agent.indexOf('Edge') > -1) {
            browser = 'Edge';
        }
        else if ((navigator.userAgent.indexOf('Trident/7.0') > 0) ||
            (/MSIE 10/i.test(navigator.userAgent)) ||
            (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent))) {
            browser = 'IE';
        }
        localStorage.setItem('browser', browser);
        return browser;
    };
    UI.changeProperty = function (element, properties) {
        if (this.detectBrowser() === 'IE') {
            Object.keys(properties).forEach(function (key) {
                var property = key.split('-');
                var propertyName = property[property.length - 1];
                if (propertyName.match(/^translate|rotate|skew|matrix|perpective$/)) {
                    element.style.transform = propertyName + '(' + properties[key] + ')';
                    return;
                }
                element.style[propertyName] = properties[key];
            });
        }
        else {
            Object.keys(properties).forEach(function (key) {
                element.style.setProperty(key, properties[key]);
            });
        }
    };
    return UI;
}());
exports.UI = UI;
