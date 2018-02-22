import {UI} from '../core/ui';

export class App {
    private ball: HTMLElement;   // trigger for the color button element
    private triggerColor: HTMLElement;   // trigger for the color button element
    private triggerLeft: HTMLElement;   // trigger for the left animation button element
    private triggerTop: HTMLElement;   // trigger for the top animation button element
    private triggerDoubleSize: HTMLElement;   // trigger for the double size button element
    private triggerResetSize: HTMLElement;   // trigger for the reset size button element


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
        DISPLAY: '--app-button-display'
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
        this.registerEventHandler();
    }

    public destroy(): void {
        this.deRegisterEventHandler();
    }

    public handlers() {
        return {
            click: {
                event: 'click',
                callback: this.onClick
            }
        };
        // init method
    }

    public registerEventHandler(): void {
       document.body.addEventListener(this.handlers().click.event, this.handlers().click.callback);
    }

    public deRegisterEventHandler(): void {
       document.body.removeEventListener(this.handlers().click.event, this.handlers().click.callback);
    }

    /**
    * onClick method
    *
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
            case this.triggerResetSize:
            console.log(this.triggerResetSize);
                    const propStyleReset: any = {};
                    this.triggerResetSize.classList.remove('ncpp-is-visible');
                    propStyleReset[this.cssVariables.DISPLAY] = 'none';
                    UI.changeProperty(this.triggerResetSize, propStyleReset);
                    propStyle[this.cssVariables.BALL_ANIMATION_LEFT] = '0';
                    propStyle[this.cssVariables.BACKGROUND_COLOR] = 'red';
                break;
            default:
                // code...
                break;
        }
        UI.changeProperty(this.ball, propStyle);
    }

    private verifyReset = () => {
        const propStyle: any = {};
        if (!this.triggerResetSize.classList.contains('ncpp-is-visible')) {
                this.triggerResetSize.classList.add('ncpp-is-visible');
                propStyle[this.cssVariables.DISPLAY] = 'block';
                UI.changeProperty(this.triggerResetSize, propStyle);
        }
    }
}
