import {UI} from '../core/ui';
export class App {
    private triggerColor: HTMLElement;   // trigger for the color button element
    private triggerLeft: HTMLElement;   // trigger for the left animation button element
    private triggerTop: HTMLElement;   // trigger for the top animation button element
    private triggerDoubleSize: HTMLElement;   // trigger for the double size button element
    private triggerResetSize: HTMLElement;   // trigger for the reset size button element

    public static readonly CSS_CLASSES: any = {
        ROOT: 'app__body',
        BALL: 'app__ball',
        TRIGGER_COLOR: 'app__button app__button--change-color',
        TRIGGER_LEFT: 'animation-left',
        TRIGGER_TOP: 'animation-top',
        TRIGGER_DOUBLE_SIZE: 'app__button app__button--size',
        TRIGGER_RESET_SIZE: 'app__button app__button--size-reset'
    };

    private cssVariables: any = {
        BACKGROUND_COLOR: '--app-backgroundColor',
        BALL_POSITION_TOP: '--app-position-top',
        BALL_POSITION_LEFT: '--app-translateX',
        BALL_ANIMATION_TOP: '--app-translateY',
    };

    constructor() {
        this.init();
    }

    public init(): void {
        // init method
    }

}
