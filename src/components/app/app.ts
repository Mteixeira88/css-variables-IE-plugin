import {UI} from '../core/ui';

export class App {
    private ball: HTMLElement;              // trigger for the color button element
    private triggerColor: HTMLElement;      // trigger for the color button element
    private triggerLeft: HTMLElement;       // trigger for the left animation button element
    private triggerTop: HTMLElement;        // trigger for the top animation button element
    private triggerDoubleSize: HTMLElement; // trigger for the double size button element
    private triggerResetSize: HTMLElement;  // trigger for the reset size button element


    public static readonly CSS_CLASSES: any = {
        BALL: 'app__ball',
        TRIGGER_COLOR: 'app__button--change-color',
        TRIGGER_LEFT: 'animation-left',
        TRIGGER_TOP: 'animation-top',
        TRIGGER_DOUBLE_SIZE: 'app__button--size',
        TRIGGER_RESET_SIZE: 'app__button--reset'
    };

    private cssVariables: any = {
        BACKGROUND_COLOR: '--app-backgroundColor',
        BALL_ANIMATION_LEFT: '--app-translateX',
        DISPLAY: '--app-button-display',
        WIDTH: '--app-size-width',
        HEIGHT: '--app-size-height'
    };

    constructor() {
        this.init();
        this.onClick = this.onClick.bind(this);
    }

    public init(): void {
        this.ball = document.querySelector('.' + App.CSS_CLASSES.BALL);
        this.triggerColor = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_COLOR);
        this.triggerLeft = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_LEFT);
        this.triggerDoubleSize = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_DOUBLE_SIZE);
        this.triggerResetSize = document.querySelector('.' + App.CSS_CLASSES.TRIGGER_RESET_SIZE);
        this.addEventListeners();
    }

    public handlers() {
        return {
            click: {
                event: 'click',
                callback: this.onClick
            }
        };
    }

    public addEventListeners(): void {
       document.body.addEventListener(this.handlers().click.event, this.handlers().click.callback);
    }

    public removeEventListeners(): void {
       document.body.removeEventListener(this.handlers().click.event, this.handlers().click.callback);
    }

    /**
     * On dispatch event click
     * @type {[type]}
     */
    private onClick = (ev: Event) => {
        const propStyle: any = {};
        switch (ev.target) {
            case this.triggerColor:
                propStyle[this.cssVariables.BACKGROUND_COLOR] = 'green';
                this.verifyReset();
                break;
            case this.triggerLeft:
                propStyle[this.cssVariables.BALL_ANIMATION_LEFT] = '300px';
                this.verifyReset();
                break;
            case this.triggerDoubleSize:
                const radius = parseInt(window.getComputedStyle(this.ball).width);
                propStyle[this.cssVariables.WIDTH] = 2 * radius + 'px';
                propStyle[this.cssVariables.HEIGHT] = 2 * radius + 'px';
                this.verifyReset();
                break;
            case this.triggerResetSize:
                const propStyleReset: any = {};
                this.triggerResetSize.classList.remove('app-is-visible');
                propStyleReset[this.cssVariables.DISPLAY] = 'none';
                UI.changeProperty(this.triggerResetSize, propStyleReset);
                propStyle[this.cssVariables.BALL_ANIMATION_LEFT] = '0';
                propStyle[this.cssVariables.BACKGROUND_COLOR] = 'red';
                propStyle[this.cssVariables.WIDTH] = '50px';
                propStyle[this.cssVariables.HEIGHT] = '50px';
                break;
        }
        UI.changeProperty(this.ball, propStyle);
    }

    /**
     * Check if the 'RESET BUTTON' is visible
     * @type {[type]}
     */
    private verifyReset = () => {
        const propStyle: any = {};
        if (!this.triggerResetSize.classList.contains('app-is-visible')) {
                this.triggerResetSize.classList.add('app-is-visible');
                propStyle[this.cssVariables.DISPLAY] = 'block';
                UI.changeProperty(this.triggerResetSize, propStyle);
        }
    }
}
