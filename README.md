# CSS variables for Internet Explorer <= 11

This project enables the use of the last breakthrough web enchancements like `css variables` on Internet Explorer.

## Motivation

When programming, the most frustrating part is when we test our website in Internet Explorer and we want to implement the last breakthrough
web enhancements like [css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables). This repository was created
to enable all programmers to stop thinking about this particular problem and start using `css variables` as they wish, without even worrying
if their code works in IE<=11.

## Test Prerequisites

### [Node.js](https://nodejs.org/en/download/)

#### Node installation

Please, read the [Node.js official installation guide](https://github.com/nodejs/node/wiki/Installation).

### [Gulp](https://gulpjs.com/)

Gulp uses Node for core processing, npm to manage project dependencies, and gulp.js to run tasks and interface with the core library. Node
version 8 or higher suffices. You can follow the directions for installing Node on the Node website if you haven't done so already.
Installation of Node will include npm. In order to run this project gulp tasks it is highly recommended that you install gulp globally.

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


## Usage<a id="usage"></a>
Below it is possible to see the rules used for the algorithm to work.

##### Note
This project is ready to test (in progress). If you want to use its code in your own project without cloning it, all you need is to copy the code in
the section [Use the Code](#usethecode).

This project only allows one transform at a time, meaning that when writing the style inline, it will write `style= transform:translateX(100px)`.
It is not possible (yet) to have multiple transforms like `style= transform:translate(100px, 20px) rotate(120deg)`.

### Naming Convention
When writing the css variable name, be aware that the property name, when writing the style inline in Internet Explorer, is always the last
word in the variable name like '--some-variable-name-i-like-`propertyInJavaScript`'.
The `propertyInJavaScript` must be compliant with the `HTML DOM style Property` rules. For a complete list of all the rules, please, click
[here](https://www.w3schools.com/jsref/dom_obj_style.asp).

In case you are using `transform` to animate the `propertyInJavaScript`, you should follow
these [property values](https://www.w3schools.com/cssref/css3_pr_transform.asp).

### CSS
All `css variables` must be inside the `:root` element. The Gulp task responsible for handling the conversion only allows `:root` element variables.
Tasks will be updated to work with all kinds of elements.

```css
:root {
  --variable: value;
}
element {
  color: var(--variable);
}
```


## Use the Code<a name="usethecode"></a>
### Typescript Class
```javascript
export class Utilities {
    /**
    * The Window.navigator read-only property returns a reference to the Navigator object,
    * which can be queried for information about the application running the script.
    * @return {string} browser
    */
    public static detectBrowser(): string {
        const agent = navigator.userAgent;
        let browser;
        if ((localStorage.getItem('browser') === undefined) ||
            (localStorage.getItem('browser') === null)) {
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
            localStorage.setItem('browser', browser);
            return browser;
        }
        return localStorage.getItem('browser');
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
```

### Typescript usage

```javascript
import {Utilities} from '../utilities';
const propStyle: any = {};
myHtmlElement = document.querySelector('.myHtmlElement');
propStyle['--my-varibale-left'] = '14px';
Utilities.changeProperty(myHtmlElement, propStyle);
```

### Typescript tsconfig.json
To be compatible with Internet Explorer you must have the target of the compiler options to `es5`.

```javascript
"compilerOptions": {
    "target": "es5"
}
```

### Typescript arrow functions
Typescript arrow functions do not work in Internet Explorer. To solve this problem, please bind the event.

```javascript
// Arrow function example
// Does not work in Internet Explorer
private onClick = (ev: Event) => {
    // some code
}

// Event binding
// Works in Internet Explorer
this.onClick = this.onClick.bind(this);
private onClick = () => {
  // your function goes here
}
```

### Gulp

#### Installation

This gulp is from [Evgeny Petukov](https://github.com/evgeny-petukhov/gulp-vars) project.

```sh
npm install gulp-vars --save-dev
```

```javascript
// css variables
    vars = require('gulp-vars'),

gulp.task('build:scss', function () {
    gulp.task('build-scss-css', function() {
        return gulp.src(SRC_FOLDER + '/index.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(gulp.dest(DIST_FOLDER));
    });

    gulp.task('build-ie', ['build-scss-css'], function() {
        return gulp.src(DIST_FOLDER + '/index.css')
            .pipe(vars())
            .pipe(rename(function (path) {
              path.basename += "-ie";
            }))
            .pipe(gulp.dest(DIST_FOLDER));
    });
    gulp.start('build-ie');
});
```

## HTML

In your `head.html` add the following script:
```javascript
 <script>
      /**
        Conditional rendering of CSS for IE
      **/
      (function () {
        if (
            (navigator.userAgent.indexOf('Trident/7.0') > 0) ||
            (/MSIE 10/i.test(navigator.userAgent)) ||
            (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent))
          ) {
            var css;
            var flag = [];
            var links = document.head.querySelectorAll('[rel="stylesheet"]');
            // Get current css links & delete them from DOM
            for (i = 0; i < links.length; i++) {
              flag.push(
                links[i].href.replace('.css', '-ie.css')
              );
              links[i].parentNode.removeChild(links[i]);
            }
            // Insert new css links optimized from IE (generated by gulp | pl-compile-ie:css)
            for (i = 0; i < flag.length; i++) {
              css = document.createElement("link");
              css.rel = "stylesheet";
              css.href = flag[i];
              document.head.appendChild(css);
            }
        }
      })();
    </script>
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

### Contributors
**Mauro Reis**
* <https://github.com/maurovieirareis>

**Abel Lopes**
* <https://github.com/abelflopes>

### Project forked from
* <https://github.com/andreros/typescript-boilerplate>

**André Rosa**
* <https://github.com/andreros/>

## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
