'use strict';
var fs = require('fs');
var path = require('path');

const getFilePathList = pathStart => {
    var filePathList = [];
    var walkBreadthFirst = function (path) {
        var dirList = fs.readdirSync(path);
        dirList.forEach(function (item) {
            if (fs.statSync(path + '/' + item).isFile()) {
                filePathList.push(path + '/' + item);
            }
        });

        dirList.forEach(function (item) {
            if (fs.statSync(path + '/' + item).isDirectory()) {
                walkBreadthFirst(path + '/' + item);
            }
        });
    }
    var walkDepthFirst = function (path) {
        var dirList = fs.readdirSync(path);
        dirList.forEach(function (item) {
            if (fs.statSync(path + '/' + item).isDirectory()) {
                walkDepthFirst(path + '/' + item);
            } else {
                filePathList.push(path + '/' + item);
            }
        });
    }
    walkBreadthFirst(path.resolve(pathStart));
    return filePathList;
};

const getDifference = (a, b) => {
    return a.concat(b).filter(v => !a.includes(v) || !b.includes(v));
};

const getDifferenceFileList = (pathA, pathB) => {
    return getDifference(getFilePathList(pathA).map(filePath => filePath.slice(pathA.length)),
        getFilePathList(pathB).map(filePath => filePath.slice(pathB.length)));
};

exports.getFilePathList = getFilePathList;
exports.getDifferenceFileList = getDifferenceFileList;