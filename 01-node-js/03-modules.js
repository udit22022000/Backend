// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require("./04-names");
const sayHii = require("./05-utils");
const data = require("./06-alternative-flavor");
require("./07-mind-grenade"); //importing a module means invoking it...//it will run the suum function in 07-mind-grenade file..//
sayHii("susan");
sayHii(names.john);
sayHii(names.peter);
