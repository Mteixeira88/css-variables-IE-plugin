"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = require("../core/ui");
var App = (function () {
    function App() {
        var _this = this;
        this.cssVariables = {
            BACKGROUND_COLOR: '--app-backgroundColor',
            BALL_ANIMATION_LEFT: '--app-translateX',
            DISPLAY: '--app-button-display',
            WIDTH: '--app-size-width',
            HEIGHT: '--app-size-height'
        };
        this.onClick = function (ev) {
            var propStyle = {};
            switch (ev.target) {
                case _this.triggerColor:
                    propStyle[_this.cssVariables.BACKGROUND_COLOR] = 'green';
                    _this.verifyReset();
                    break;
                case _this.triggerLeft:
                    propStyle[_this.cssVariables.BALL_ANIMATION_LEFT] = '300px';
                    _this.verifyReset();
                    break;
                case _this.triggerDoubleSize:
                    var radius = parseInt(window.getComputedStyle(_this.ball).width);
                    propStyle[_this.cssVariables.WIDTH] = 2 * radius + 'px';
                    propStyle[_this.cssVariables.HEIGHT] = 2 * radius + 'px';
                    _this.verifyReset();
                    break;
                case _this.triggerResetSize:
                    var propStyleReset = {};
                    _this.triggerResetSize.classList.remove('app-is-visible');
                    propStyleReset[_this.cssVariables.DISPLAY] = 'none';
                    ui_1.UI.changeProperty(_this.triggerResetSize, propStyleReset);
                    propStyle[_this.cssVariables.BALL_ANIMATION_LEFT] = '0';
                    propStyle[_this.cssVariables.BACKGROUND_COLOR] = 'red';
                    propStyle[_this.cssVariables.WIDTH] = '50px';
                    propStyle[_this.cssVariables.HEIGHT] = '50px';
                    break;
            }
            ui_1.UI.changeProperty(_this.ball, propStyle);
        };
        this.verifyReset = function () {
            var propStyle = {};
            if (!_this.triggerResetSize.classList.contains('app-is-visible')) {
                _this.triggerResetSize.classList.add('app-is-visible');
                propStyle[_this.cssVariables.DISPLAY] = 'block';
                ui_1.UI.changeProperty(_this.triggerResetSize, propStyle);
            }
        };
        this.init();
        this.onClick = this.onClick.bind(this);
    }
    App.prototype.init = function () {
        this.ball = document.querySelector('.' + App.CSS_CLASSES.BALL);
        this.triggerColor = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_COLOR);
        this.triggerLeft = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_LEFT);
        this.triggerDoubleSize = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_DOUBLE_SIZE);
        this.triggerResetSize = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_RESET_SIZE);
        this.addEventListeners();
    };
    App.prototype.handlers = function () {
        return {
            click: {
                event: 'click',
                callback: this.onClick
            }
        };
    };
    App.prototype.addEventListeners = function () {
        document.body.addEventListener(this.handlers().click.event, this.handlers().click.callback);
    };
    App.prototype.removeEventListeners = function () {
        document.body.removeEventListener(this.handlers().click.event, this.handlers().click.callback);
    };
    App.CSS_CLASSES = {
        BALL: 'app__ball',
        TRIGGER_COLOR: 'app__button--change-color',
        TRIGGER_LEFT: 'animation-left',
        TRIGGER_TOP: 'animation-top',
        TRIGGER_DOUBLE_SIZE: 'app__button--size',
        TRIGGER_RESET_SIZE: 'app__button--reset'
    };
    return App;
}());
exports.App = App;
