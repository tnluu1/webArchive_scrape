var excelbuilder = require('msexcel-builder');
var config = require('./output.json');

var gl_arr = JSON.stringify(config.dates);
gl_arr = gl_arr.split("}");

for (var i = gl_arr.length - 1; i >= 0; i--) {
	gl_arr[i] = gl_arr[i].substring(1,gl_arr[i].length-1) + "}";
};

console.log(gl_arr[0]);

var json = JSON.parse(JSON.stringify(gl_arr[0]));
//console.log(json);