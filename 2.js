"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var dataset = __spreadArrays(new Array(100)).map(function (_v, index) { return ({
    key: index,
    value: ~~(Math.random() * 100)
}); });
var comparator = function (a, b) { return a.key - b.key; };
var buildTree = function (dataset) {
    if (dataset.length === 0) {
        return null;
    }
    else if (dataset.length === 1) {
        return dataset[0];
    }
    else {
        var sorted = dataset.sort(comparator); //It's bad idea to sort every time, but it's good enough for my goals
        var root = sorted[Math.floor(sorted.length / 2)];
        root.left = buildTree(sorted.slice(0, Math.floor(sorted.length / 2))) || undefined;
        root.right = buildTree(sorted.slice(Math.floor(sorted.length / 2) + 1)) || undefined;
        return root;
    }
};
function NLR(tree, key) {
    if (tree.key === key)
        return tree.value;
    var left = tree.left && NLR(tree.left, key);
    if (left)
        return left;
    var right = tree.right && NLR(tree.right, key);
    if (right)
        return right;
    return undefined;
}
function LRN(tree, key) {
    var left = tree.left && LRN(tree.left, key);
    if (left)
        return left;
    var right = tree.right && LRN(tree.right, key);
    if (right)
        return right;
    if (tree.key === key)
        return tree.value;
    return undefined;
}
function LNR(tree, key) {
    var left = tree.left && LRN(tree.left, key);
    if (left)
        return left;
    if (tree.key === key)
        return tree.value;
    var right = tree.right && LRN(tree.right, key);
    if (right)
        return right;
    return undefined;
}
function runTask2() {
    var tree = buildTree(dataset);
    if (tree) {
        console.log('Binary tree\n', tree);
        console.log('NLR result\n', NLR(tree, 12));
        console.log('LRN result\n', LRN(tree, 12));
        console.log('LNR result\n', LNR(tree, 12), '\n');
    }
}
exports.runTask2 = runTask2;
