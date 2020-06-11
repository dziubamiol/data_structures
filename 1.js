"use strict";
exports.__esModule = true;
var util_1 = require("util");
var crypto = require("crypto");
function getSymbolFrequency(arg) {
    return arg.split('').reduce(function (acc, val) {
        if (acc[val]) {
            acc[val] += 1;
        }
        else {
            acc[val] = 1;
        }
        return acc;
    }, {});
}
function getHuffmanTree(str) {
    var strFrequency = getSymbolFrequency(str);
    var roots = Object.keys(strFrequency).map(function (key) { return ({
        sum: strFrequency[key],
        value: {
            symbol: key
        }
    }); });
    roots.sort(function (a, b) { return b.sum - a.sum; }); // 3, 4, 1 -> 4, 3, 1 : desc order
    while (roots.length != 1) {
        var left = roots.pop();
        var right = roots.pop();
        if (left && right) {
            var newFather = {
                sum: left.sum + right.sum,
                value: {
                    left: left.value,
                    right: right.value
                }
            };
            roots.unshift(newFather);
            roots.sort(function (a, b) { return b.sum - a.sum; }); // 3, 4, 1 -> 4, 3, 1 : desc order
        }
        else {
            break;
        }
    }
    return roots;
}
function runTask1() {
    var str = '122333';
    var longStr = crypto.randomBytes(100).toString('hex').substr(0, 100);
    console.log(util_1["default"].inspect(getHuffmanTree(longStr), false, null, true /* enable colors */));
}
exports.runTask1 = runTask1;
