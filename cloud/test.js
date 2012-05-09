var cloud = require("./main.js");

cloud.getTimetable({}, function(err, timetable) {
  console.log(timetable);
});