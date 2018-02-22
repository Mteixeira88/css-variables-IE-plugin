module.exports.register = function (handlebars) {

    handlebars.__switch_stack__ = [];

    handlebars.registerHelper("switch", function (value, options) {
        handlebars.__switch_stack__.push({
            switch_match: false,
            switch_value: value
        });
        var html = options.fn(this);
        handlebars.__switch_stack__.pop();
        return html;
    });

    handlebars.registerHelper("case", function (value, options) {
        var args = Array.from(arguments);
        var options = args.pop();
        var caseValues = args;
        var stack = handlebars.__switch_stack__[handlebars.__switch_stack__.length - 1];

        if (stack.switch_match || caseValues.indexOf(stack.switch_value) === -1) {
            return '';
        } else {
            stack.switch_match = true;
            return options.fn(this);
        }
    });

    handlebars.registerHelper("default", function (options) {
        var stack = handlebars.__switch_stack__[handlebars.__switch_stack__.length - 1];
        if (!stack.switch_match) {
            return options.fn(this);
        }
    });

};
