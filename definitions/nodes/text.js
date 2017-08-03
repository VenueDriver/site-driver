"use strict";
var TextNode = (function () {
    function TextNode(obj) {
        // THIS CLASS NAME
        this._ngClass = "TextNode";
        this._type = "Node";
        // TRANSFER PROPERTIES FROM THE INTERFACE TO THE CLASS
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    return TextNode;
}());
exports.TextNode = TextNode;
//# sourceMappingURL=text.js.map