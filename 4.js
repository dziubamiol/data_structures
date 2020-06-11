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
    value: Math.round(Math.random() * 100)
}); });
var add = function (heap, elem) {
    var newHeap = __spreadArrays(heap, [elem]);
    var i = newHeap.length - 1;
    var parentIndex = (i - 1) / 2;
    while (i > 0 && newHeap[parentIndex] < newHeap[i]) {
        var temp = newHeap[i];
        newHeap[i] = newHeap[parentIndex];
        newHeap[parentIndex] = temp;
        i = parentIndex;
        parentIndex = (i - 1) / 2;
    }
    return newHeap;
};
var getMin = function (heap) {
    var list = __spreadArrays(heap);
    var result = list[0];
    list[0] = list[list.length - 1];
    list = list.slice(0, list.length - 1);
    return [result, list];
};
var heapify = function (heap, i) {
    var leftChild;
    var rightChild;
    var largestChild;
    while (true) {
        leftChild = 2 * i + 1;
        rightChild = 2 * i + 2;
        largestChild = i;
        if (leftChild < heap.length && heap[leftChild].value > heap[largestChild].value) {
            largestChild = leftChild;
        }
        if (rightChild < heap.length && heap[rightChild].value > heap[largestChild].value) {
            largestChild = rightChild;
        }
        if (largestChild == i)
            break;
        var temp = heap[i];
        heap[i] = heap[largestChild];
        heap[largestChild] = temp;
        i = largestChild;
    }
};
function buildHeap(dataset) {
    var heap = dataset;
    for (var i = heap.length / 2; i >= 0; i--) {
        heapify(heap, i);
    }
    return heap;
}
function runTask4() {
    console.log('Heap \n', buildHeap(dataset), '\n');
}
exports.runTask4 = runTask4;
