const {
    Reminder,
    validateInput
} = require('../models/reminderModel');
const schedule = require('node-schedule');

//  Fetch dates of reminders; sort by date close > far

var j = schedule.scheduleJob('42 * * * * *', function () {
    console.log('The answer to life, the universe, and everything!');
});

/**

* * Say you very specifically want a function to execute at 5:30am on December 21, 2012. Remember - in JavaScript - 0 - January, 11 - December.

var schedule = require('node-schedule');
var date = new Date(2012, 11, 21, 5, 30, 0);
 
var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});

*/