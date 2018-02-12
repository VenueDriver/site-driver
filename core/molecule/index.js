"use strict";
var Molecule = (function () {
    function Molecule(data) {
        this._name = '';
        this._id = '';
        this._type = 'molecule';
        this._value = null;
        var readOnly = ['_type'];
        for (var key in data) {
            if (readOnly.indexOf(key) == -1)
                this[key] = data[key];
        }
    }
    return Molecule;
}());
module.exports = Molecule;
//# sourceMappingURL=index.js.map