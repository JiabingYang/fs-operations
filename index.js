'use strict';

const utils = require('./utils');

let dir1 = 'E:/备份/音乐';
let dir2 = 'G:/音乐';
console.log(utils.getDifferenceFileList(dir1, dir2));
