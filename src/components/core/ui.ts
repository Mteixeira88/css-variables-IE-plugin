export class UI {

    constructor() {
        // Code goes here
    }

    /**
    * The Window.navigator read-only property returns a reference to the Navigator object,
    * which can be queried for information about the application running the script.
    * @return {string} browser
    */
   public static detectBrowser(): string {
        const agent = navigator.userAgent;
        let browser;
        if (agent.indexOf("Chrome") > -1) {
            browser = "Chrome";
        } else if (agent.indexOf("Safari") > -1) {
            browser = "Safari";
        } else if (agent.indexOf("Opera") > -1) {
            browser = "Opera";
        } else if (agent.indexOf("Firefox") > -1) {
            browser = "Firefox";
        } else if (agent.indexOf("Edge") > -1) {
            browser = "Edge";
        } else if ((navigator.userAgent.indexOf("Trident/7.0") > 0) ||
            (/MSIE 10/i.test(navigator.userAgent)) ||
            (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent))) {
            browser = "IE";
        }
        return browser;
    }

    /**
    * This method swaps the function style.setProperty("--variable", "value") to style.property = "value"
    * if it detects that the user is in Internet Explorer <= 11
    * The prorperty name is always the last word in the variable name "--variable-name-propertyInJavaScript"
    * @param {type}(HTMLElement, any)
    */
    public static changeProperty(element: HTMLElement, properties: any) {
        if (this.detectBrowser() === "IE") {
            Object.keys(properties).forEach((key: any | {}) => {
                const property = key.split("-");
                const propertyName = property[property.length - 1];
                //This enables the use of the transform property in Internet explorer
                if (propertyName.contains('translate') || propertyName.contains('rotate') || propertyName.contains('skew') || propertyName.contains('matrix')|| propertyName.contains('perpective')) {
                    element.style.transform = propertyName(properties[key]);
                    return;
                }
                element.style[propertyName] = properties[key];
              });
        } else {
            Object.keys(properties).forEach((key: any) => {
                element.style.setProperty(key, properties[key]);
              });
        }
    }
}
