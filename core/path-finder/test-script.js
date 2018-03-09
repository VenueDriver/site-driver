"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cp = require("child_process");
var path = require("path");
cp.exec('ls', { cwd: path.join(__dirname, '/../') }, function (error, stdout, stderr) {
    console.log(stdout);
    process.exit(0);
});
//# sourceMappingURL=test-script.js.map