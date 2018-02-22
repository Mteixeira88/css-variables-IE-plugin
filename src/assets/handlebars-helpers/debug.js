module.exports.register = function (handlebars) {

    handlebars.registerHelper("debug", function (optionalValue) {
        console.log("\n");
        console.log("#####################################");
        console.log("############ START DEBUG ############");
        console.log("#####################################");
        console.log("\t======== CONTEXT =========");
        console.log(this);
        console.log("\t========== END ===========");
        if (optionalValue) {
            console.log("\t========= VALUE ==========");
            console.log(optionalValue);
            console.log("\t========== END ===========");
        }
        console.log("#####################################");
        console.log("############# END DEBUG #############");
        console.log("#####################################");
        console.log("\n");
    });

};