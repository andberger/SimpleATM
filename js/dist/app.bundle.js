!function(t){function n(o){if(e[o])return e[o].exports;var u=e[o]={i:o,l:!1,exports:{}};return t[o].call(u.exports,u,u.exports,n),u.l=!0,u.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=0)}([function(t,n,e){"use strict";function o(t){var n=2,e=$("#amountField").val();Array.from("0123456789").indexOf(t)>-1?e.length<6&&(e.length==n&&"0"==t||($("#amountField").val(e+t),u(!0))):(e.length>n&&$("#amountField").val(e.slice(0,-1)),e.length-1==n&&u(!1))}function u(t){t?($("#submitButton").prop("disabled",!1),$("#submitButton").css("opacity","1.0")):($("#submitButton").prop("disabled",!0),$("#submitButton").css("opacity","0.5"))}function r(){var t=$("#amountField").val();return Number(t.slice(2))}$(document).ready(function(){$("#amountField").val("£ "),u(!1)}),$("#amountField").on("keydown keypress keyup mousedown mouseup",!1),$("#numberpad").on("click","li",function(t){function n(t,n,e){t.style.background=n,t.style.color=e}var e=t.target;n(e,"white","#2bbed3"),setTimeout(function(){return n(e,"#2bbed3","white")},100),o(e.innerText)}),$("#submitButton").on("click",function(){var t=r();$("#amount").text("£ "+t)})}]);