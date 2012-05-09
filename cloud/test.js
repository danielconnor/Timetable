var cloud = require("./main.js");

cloud.getTimetable({}, function(timetable) {
  console.log(timetable);
});