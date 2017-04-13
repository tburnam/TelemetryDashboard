// const $ = require('jquery');  // ES5

// change require to es6 import style
import $ from 'jquery';

let count = 1;
setInterval(() => {
  $('#main').html(`You've been on the page for ${count} second(s)`);
  count += 1;
}, 1000);
