"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var red = 'red';
var black = 'black';
var dataset = __spreadArrays(new Array(100)).map(function (_v, index) { return ({
    key: index,
    value: Math.round(Math.random() * 100)
}); });
function add(root, item) {
    item.color = red;
    if (root.key > item.key && root.left) {
        insert(root.left, item);
    }
    else if (root.key < item.key && root.right) {
        insert(root.right, item);
    }
    else {
        var left = root.key > item.key;
        item.parent = root;
        if (left) {
            root.left = item;
        }
        else {
            root.right = item;
        }
    }
}
function rotate(tree, type) {
    var parent = tree.parent;
    var node = __assign({}, tree);
    var left = __assign({}, tree.left);
    var right = __assign({}, tree.right);
    if (!tree)
        return;
    if (type === 'right' && left) {
        tree = left;
        node.left = tree.right;
        tree.right = node;
        tree.parent = parent;
    }
    else if (!!right) {
        tree = right;
        node.right = tree.left;
        tree.left = node;
        tree.parent = parent;
    }
}
;
function fix_balance(item) {
    if (!item)
        return;
    var father = item.parent;
    if (father) {
        var side = father.left && father.left.key === item.key ? 'left' : 'right';
        var uncle = father && father.parent && father.parent[side === 'left' ? 'right' : 'left'];
        if (father.color === red) {
            if (uncle) {
                if (uncle.color === red && father.parent) {
                    father.color = black;
                    uncle.color = black;
                    father.parent.color = red;
                    fix_balance(father.parent);
                }
            }
            else {
                if (side === 'left') {
                    rotate(father, 'left');
                    if (father.parent) {
                        father.parent.color = black; //father
                        if (father.parent.parent)
                            father.parent.parent.color = red; //grandfather
                        rotate(father.parent, 'right');
                    }
                }
                else {
                    rotate(father, 'right');
                    if (father.parent) {
                        father.parent.color = black; //father
                        if (father.parent.parent)
                            father.parent.parent.color = red; //grandfather
                        rotate(father.parent, 'left');
                    }
                }
            }
        }
    }
}
function balance_after_del(root) {
    var _a, _b, _c, _d, _e, _f;
    var p = root;
    while (p.color === black && p.parent && p.parent.left) {
        var side = p.parent.left.key === p.key ? 'left' : 'right';
        var brother = p.parent[side === 'left' ? 'right' : 'left'];
        if (brother) {
            if (side === 'left') {
                if (brother.color === red) {
                    brother.color = black;
                    p.parent.color = red;
                    rotate(p, 'left');
                }
                if (((_a = brother.left) === null || _a === void 0 ? void 0 : _a.color) === black && ((_b = brother.right) === null || _b === void 0 ? void 0 : _b.color) === black) {
                    brother.color = red;
                }
                else {
                    if (brother.left && ((_c = brother.right) === null || _c === void 0 ? void 0 : _c.color) === black) {
                        brother.left.color = black;
                        brother.color = red;
                        rotate(p, 'left');
                    }
                    else {
                        brother.color = p.parent.color;
                        p.parent.color = black;
                        brother.right && (brother.right.color = black);
                        rotate(p, 'right');
                    }
                }
            }
            else {
                if (brother.color === red) {
                    brother.color = black;
                    p.parent.color = red;
                    rotate(p, 'right');
                }
                if (((_d = brother.left) === null || _d === void 0 ? void 0 : _d.color) === black && ((_e = brother.right) === null || _e === void 0 ? void 0 : _e.color) === black) {
                    brother.color = red;
                }
                else {
                    if (((_f = brother.left) === null || _f === void 0 ? void 0 : _f.color) === black && brother.right) {
                        brother.right.color = black;
                        brother.color = red;
                        rotate(p, 'right');
                    }
                    else {
                        brother.color = p.parent.color;
                        p.parent.color = black;
                        brother.left && (brother.left.color = black);
                        rotate(p, 'left');
                    }
                }
            }
        }
    }
    p.color = black;
}
function insert(root, item) {
    add(root, item);
    fix_balance(root);
    root.color = black;
}
var build_tree = function (dataset) {
    var root = __assign({ color: black }, dataset.shift());
    root = __assign(__assign({}, root), dataset.shift());
    var item = __assign({ color: red }, dataset.shift());
    while (item) {
        insert(root, item);
        var firstElement = dataset.shift();
        if (firstElement) {
            item = __assign({ color: red }, firstElement);
        }
        else {
            break;
        }
    }
    return root;
};
function runTask3() {
    console.log('Black red tree\n', build_tree(dataset), '\n');
}
exports.runTask3 = runTask3;
