"use strict";
exports.__esModule = true;
var util_1 = require("util");
var BinomialHeap = /** @class */ (function () {
    function BinomialHeap() {
        this.nodes = null;
        this.size = 0;
    }
    BinomialHeap.prototype.isEmpty = function () {
        return this.nodes === null;
    };
    BinomialHeap.prototype.getSize = function () {
        return this.size;
    };
    BinomialHeap.prototype.clear = function () {
        this.nodes = null;
        this.size = 0;
    };
    BinomialHeap.prototype.insert = function (value) {
        if (value > 0) {
            var temp = new BinomialHeapNode(value);
            if (this.nodes == null) {
                this.nodes = temp;
                this.size = 1;
            }
            else {
                this.unionNodes(temp);
                this.size++;
            }
        }
        else {
            throw new TypeError('Value must be positive number!');
        }
    };
    BinomialHeap.prototype.merge = function (binHeap) {
        var temp1 = this.nodes, temp2 = binHeap;
        while ((temp1 != null) && (temp2 != null)) {
            if (temp1.degree == temp2.degree) {
                var tmp = temp2;
                temp2 = temp2.sibling;
                tmp.sibling = temp1.sibling;
                temp1.sibling = tmp;
                temp1 = tmp.sibling;
            }
            else {
                if (temp1.degree < temp2.degree) {
                    if ((temp1.sibling == null) || (temp1.sibling.degree > temp2.degree)) {
                        var tmp = temp2;
                        temp2 = temp2.sibling;
                        tmp.sibling = temp1.sibling;
                        temp1.sibling = tmp;
                        temp1 = tmp.sibling;
                    }
                    else {
                        temp1 = temp1.sibling;
                    }
                }
                else {
                    var tmp = temp1;
                    temp1 = temp2;
                    temp2 = temp2.sibling;
                    temp1.sibling = tmp;
                    if (tmp == this.nodes) {
                        this.nodes = temp1;
                    }
                }
            }
        }
        if (temp1 == null && this.nodes) {
            temp1 = this.nodes;
            while (temp1.sibling != null) {
                temp1 = temp1.sibling;
            }
            temp1.sibling = temp2;
        }
    };
    BinomialHeap.prototype.unionNodes = function (binHeap) {
        this.merge(binHeap);
        var prevTemp = null, temp = this.nodes, nextTemp = this.nodes && this.nodes.sibling || null;
        if (temp) {
            while (nextTemp != null) {
                if ((temp.degree != nextTemp.degree) || ((nextTemp.sibling != null) && (nextTemp.sibling.degree == temp.degree))) {
                    prevTemp = temp;
                    temp = nextTemp;
                }
                else {
                    if (temp.key <= nextTemp.key) {
                        temp.sibling = nextTemp.sibling;
                        nextTemp.parent = temp;
                        nextTemp.sibling = temp.child;
                        temp.child = nextTemp;
                        temp.degree++;
                    }
                    else {
                        if (prevTemp == null) {
                            this.nodes = nextTemp;
                        }
                        else {
                            prevTemp.sibling = nextTemp;
                        }
                        temp.parent = nextTemp;
                        temp.sibling = nextTemp.child;
                        nextTemp.child = temp;
                        nextTemp.degree++;
                        temp = nextTemp;
                    }
                }
                nextTemp = temp.sibling;
            }
        }
    };
    BinomialHeap.prototype["delete"] = function (value) {
        if ((this.nodes != null) && (this.nodes.findANodeWithKey(value) != null)) {
            this.decreaseKeyValue(value, this.findMinimum() - 1);
            this.extractMin();
        }
    };
    BinomialHeap.prototype.findMinimum = function () {
        var _a;
        return ((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.findMinNode().key) || 0;
    };
    BinomialHeap.prototype.decreaseKeyValue = function (old_value, new_value) {
        if (this.nodes) {
            var temp = this.nodes.findANodeWithKey(old_value);
            if (temp == null)
                return;
            temp.key = new_value;
            var tempParent = temp.parent;
            while ((tempParent != null) && (temp.key < tempParent.key)) {
                var z = temp.key;
                temp.key = tempParent.key;
                tempParent.key = z;
                temp = tempParent;
                tempParent = tempParent.parent;
            }
        }
    };
    BinomialHeap.prototype.extractMin = function () {
        if (this.nodes == null)
            return -1;
        var temp = this.nodes, prevTemp = null;
        var minNode = this.nodes.findMinNode();
        while (temp && temp.key != minNode.key) {
            prevTemp = temp;
            temp = temp.sibling;
        }
        if (temp) {
            if (prevTemp == null) {
                this.nodes = temp.sibling;
            }
            else {
                prevTemp.sibling = temp.sibling;
            }
            temp = temp.child;
        }
        var fakeNode = temp;
        while (temp != null) {
            temp.parent = null;
            temp = temp.sibling;
        }
        if ((this.nodes == null) && (fakeNode == null)) {
            this.size = 0;
        }
        else {
            if ((this.nodes == null) && (fakeNode != null)) {
                this.nodes = fakeNode.reverse(null);
                this.size = this.nodes.getSize();
            }
            else {
                if ((this.nodes != null) && (fakeNode == null)) {
                    this.size = this.nodes.getSize();
                }
                else {
                    fakeNode && this.unionNodes(fakeNode.reverse(null));
                    this.nodes && (this.size = this.nodes.getSize());
                }
            }
        }
        return minNode.key;
    };
    return BinomialHeap;
}());
var BinomialHeapNode = /** @class */ (function () {
    function BinomialHeapNode(key) {
        this.key = key;
        this.degree = 0;
        this.parent = null;
        this.sibling = null;
        this.child = null;
    }
    BinomialHeapNode.prototype.reverse = function (sibl) {
        var ret;
        if (sibl != null) {
            ret = sibl.reverse(this);
        }
        else {
            ret = this;
        }
        this.sibling = sibl;
        return ret;
    };
    BinomialHeapNode.prototype.getSize = function () {
        return (1 + ((this.child == null) ? 0 : this.child.getSize()) + ((this.sibling == null) ? 0 : this.sibling.getSize()));
    };
    BinomialHeapNode.prototype.findANodeWithKey = function (value) {
        var temp = this, node = null;
        while (temp != null) {
            if (temp.key == value) {
                node = temp;
                break;
            }
            if (temp.child == null)
                temp = temp.sibling;
            else {
                node = temp.child.findANodeWithKey(value);
                if (node == null)
                    temp = temp.sibling;
                else
                    break;
            }
        }
        return node;
    };
    BinomialHeapNode.prototype.findMinNode = function () {
        var x = this, y = this;
        var min = x.key;
        while (x != null) {
            if (x.key < min) {
                y = x;
                min = x.key;
            }
            x = x.sibling;
        }
        return y;
    };
    return BinomialHeapNode;
}());
function runTask5() {
    var binomialHeap = new BinomialHeap();
    (new Array(100)).fill(0).forEach(function (value) {
        binomialHeap.insert(~~(Math.abs(value * Math.random())) + 1);
    });
    console.log(util_1["default"].inspect((binomialHeap), false, null, true));
}
exports.runTask5 = runTask5;
