module.exports.register = function (handlebars) {

    handlebars.registerHelper("jsonStringify", function(context) {
        return JSON.stringify(context);
    });

};
