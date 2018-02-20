"use strict";
//CHECK IF AND OBJECT HAS PROPERTIES
function isEmpty(obj) {
    return Object.keys(obj).length < 1;
}
exports.isEmpty = isEmpty;
//CHECK IF IS ARRAY
function isArray(obj) {
    return (Object.prototype.toString.call(obj) == "[object Array]");
}
exports.isArray = isArray;
//DEEP MERGE OBJECTS
function merge(obj1, obj2, opts) {
    var add, prop, val;
    obj1 = Object.assign({}, obj1);
    add = function (prop) {
        if (!(!opts.usenull && !(obj2[prop] != null))) {
            return obj1[prop] = obj2[prop];
        }
    };
    if (isArray(obj1) || isArray(obj2)) {
        if (obj2 != null) {
            obj1 = obj2;
        }
    }
    else {
        for (prop in obj2) {
            val = obj2[prop];
            if (obj1.hasOwnProperty(prop)) {
                if (typeof obj1[prop] === "object") {
                    if (typeof obj2[prop] === "object" && opts.usedeep) {
                        obj1[prop] = merge(obj1[prop], obj2[prop], opts);
                    }
                    else {
                        add(prop);
                    }
                }
                else {
                    add(prop);
                }
            }
            else {
                add(prop);
            }
        }
    }
    return obj1;
}
exports.merge = merge;
//SET DATE OFFSET
function dateSetOffset(date, offset) {
    var hours = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() + hours + offset);
    return date;
}
exports.dateSetOffset = dateSetOffset;
//CUSTOM FOR EACH
function each(obj, work) {
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        work(obj[key]);
    }
}
exports.each = each;
function aloop(condition, work, end) {
    if (condition()) {
        end();
    }
    else {
        work(function () {
            aloop(condition, work, end);
        }, end);
    }
}
exports.aloop = aloop;
//ASYNC WORK EXECUTED ON AN ARRAY
function asyncLoop(source, clone, work, end, index) {
    var _this = this;
    if (clone === void 0) { clone = false; }
    if (index === void 0) { index = 0; }
    var sourceRef = source;
    // IF CLONE USE A COPY OF THE SOURCE
    if (clone) {
        source = [];
        for (var _i = 0, sourceRef_1 = sourceRef; _i < sourceRef_1.length; _i++) {
            var item = sourceRef_1[_i];
            source.push(item);
        }
    }
    // WORK WHILE THERE ARE ITEMS
    work(source[index], index, function () {
        if (source.length - 1 > index) {
            _this.asyncLoop(source, clone, work, end, index + 1);
        }
        else {
            end(source);
        }
    });
    return source;
}
exports.asyncLoop = asyncLoop;
//# sourceMappingURL=utils.js.map