/* jshint esversion: 6 */

// import $ from 'jquery';

var $ = require("jquery");
// require('imports-loader?window.jQuery=jquery!./node_modules/path-to-slider-script.js');

$(document).ready(function () {
    console.log('Hello World!');
    $('h1').css('color', 'red');
});