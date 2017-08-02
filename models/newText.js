"use strict";
var TextNode = (function () {
    function TextNode(obj) {
        this._ngComponentName = 'TextComponent';
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    return TextNode;
}());
exports.TextNode = TextNode;
//# sourceMappingURL=newText.js.map