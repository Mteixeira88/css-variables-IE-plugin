# CSS variables for Internet Explorer <= 11

[![Waffle.io](https://img.shields.io/waffle/label/evancohen/smart-mirror/in%20progress.svg)]()

This project enables the use of css variables on Internet Explorer <= 11.

**Note:** This project is still in progress, but you can see the code/example bellow in the [Usage](#usage) section.

## Motivation

When programming, the most frustrating part is when we test our website in Internet Explorer and we want to implement the last breakthrough
web enhancements like [css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables). The creation of this repository
is to enable all programmers to stop thinking on this particular problem and start using as they want `css variables` withou even have to
worry about if it works in IE<=11.

## Test Prerequisites

### [Node.js](https://nodejs.org/en/download/)

#### Node installation

Please, read the [Node.js official installation guide](https://github.com/nodejs/node/wiki/Installation).

### [Gulp](https://gulpjs.com/)

Gulp uses Node for core processing, npm to manage project dependencies, and gulp.js to run tasks and interface with the core library. Node version 8 or higher suffices. You can follow the directions for installing Node on the Node website if you haven't done so already. Installation of Node will include npm. In order to run this project gulp tasks it is highly recommended that you install gulp globally.

#### Gulp installation

From the command line (Windows, Mac or Linux), please execute the following command:

```sh
npm install --global gulp-cli
```


## Installation

Clone or download this project. From the project directory run the command `npm install`.


## Local Development

To run the project in development mode, from the project directory run the command `npm run dev`. Your default
browser should open a window with the project running from [http://localhost:3000/](http://localhost:3000/).

<a id="usage"></a>
## Usage
Below it's possible to see the rules used for the algorithym to work.
##### Note
This project is ready to test (in progress), if you want to use in your own project withou clone the project, all you need is to copy the code in
the section `use the code`.

### Nomenculature
When writing the css variable name, be aware that the prorperty name when writing the style inline in Internet Explorer is always the last
word in the variable name like '--variable-name-with-what-i-like-`propertyInJavaScript`'.
The `propertyInJavaScript` must be written following the rules of the `HTML DOM style Property`.
Check here all the [possibities](https://www.w3schools.com/jsref/dom_obj_style.asp).

### CSS
All `css variables` must be inside the root element, this gulp task only allows root element variables.
Task will be updated to work with all kind of files
```sh
:root {
  --variable: value;
}
element {
  color: var(--variable);
}
```

## Use the Code
### Typescript Class
```sh
export class Utilities {
    private element: HTMLElement;

    constructor(element: any) {
        this.element = element;
    }

    /**
    * The Window.navigator read-only property returns a reference to the Navigator object,
    * which can be queried for information about the application running the script.
    * @return {string} browser
    */
   public static detectBrowser(): string {
        const agent = navigator.userAgent;
        let browser;
        if (agent.indexOf('Chrome') > -1) {
            browser = 'Chrome';
        } else if (agent.indexOf('Safari') > -1) {
            browser = 'Safari';
        } else if (agent.indexOf('Opera') > -1) {
            browser = 'Opera';
        } else if (agent.indexOf('Firefox') > -1) {
            browser = 'Firefox';
        } else if (agent.indexOf('Edge') > -1) {
            browser = 'Edge';
        } else if ((navigator.userAgent.indexOf('Trident/7.0') > 0) ||
            (/MSIE 10/i.test(navigator.userAgent)) ||
            (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent))) {
            browser = 'IE';
        }
        return browser;
    }

    /**
    * This method swaps the function style.setProperty('--variable', 'value') to style.property = 'value'
    * if it detects that the user is in Internet Explorer <= 11
    * The prorperty name is always the last word in the variable name '--variable-name-propertyInJavaScript'
    * @param {HTMLElement, any}
    */
    public static changeProperty(element: HTMLElement, properties: any) {
        if (this.detectBrowser() === 'IE') {
            Object.keys(properties).forEach((key: any | {}) => {
                const property = key.split('-');
                const propertyName = property[property.length - 1];
                element.style[propertyName] = properties[key];
              });
        } else {
            Object.keys(properties).forEach((key: any) => {
                element.style.setProperty(key, properties[key]);
              });
        }
    }
}
```

### Typescript usage

```sh
import {Utilities} from '../utilities';
const propStyle: any = {};
myHtmlElement = document.querySelector('.myHtmlElement');
propStyle['--my-varibale-left'] = '14px';
Utilities.changeProperty(myHtmlElement, propStyle);
```

### Gulp
#### Installation

This gulp is from [Evgeny Petukov](https://github.com/evgeny-petukhov/gulp-vars) project.

```sh
npm install gulp-vars --save-dev
```

```sh
gulp.task('pl-assets', gulp.series(
    'pl-copy:css'
));

gulp.task('pl-copy:css', gulp.series(
  'pl-compile-ie:css'
));

gulp.task('pl-compile-ie:css', function(){
  return gulp.src([
      normalizePath(paths().public.css + '/**/*.css')
    ])
    .pipe(vars())
    .pipe(gulp_rename(function (path) {
      path.basename += "-ie";
    }))
    .pipe(gulp.dest(normalizePath(paths().public.css)))
    .pipe(browserSync.stream());
});
```

## Contributing

1. Fork this project: [https://github.com/Mteixeira88/css-variables-IE-script](https://github.com/Mteixeira88/css-variables-IE-script)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## Author
**Miguel Teixeira**
* <https://github.com/Mteixeira88>

#### Contributors
**Mauro Reis**
* <https://github.com/mauroreisvieira>

#### Project forked
* <https://github.com/andreros/typescript-boilerplate>
**André Rosa**
* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
