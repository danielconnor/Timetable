"use strict";

var http = require("http");
var jsdom  = require("jsdom").jsdom;

module.exports = {

  getTimetable: function(params, cb) {

  //   var req = http.get({
  //     host: "timetable.itcarlow.ie",
  //     path: "/reporting/textspreadsheet;student+set;id;KCSOFD_3A+Set?t=student+set+textspreadsheet&days=1-5&weeks=&periods=5-40&template=student+set+textspreadsheet",
  //     port: 80
  //   }, function(res) {
  //     var resText = "";
      
  //     res.on("data", function(chunk) {
  //       resText += chunk.toString();
  //     });

  //     res.on("end", function() {
  //       parseHtml(resText, function(err, dom) {
  //         parseTimetable(dom, cb);
  //       });
  //     });

  //   });
  
    $fh.web({
      url: "http://timetable.itcarlow.ie/reporting/textspreadsheet;student+set;id;KCSOFD_3A+Set?t=student+set+textspreadsheet&days=1-5&weeks=&periods=5-40&template=student+set+textspreadsheet"
    }, function(err, res) {
      cb(err, res);
    });
  }

};

function parseHtml(html, cb) {
    var doc = jsdom(html, null, {
      features: {
        FetchExternalResources   : false,
        ProcessExternalResources : false,
        MutationEvents           : false,
        QuerySelector            : false
      }
    });
    cb(null, doc);
}


var layout = {
  name: 0,
  module: 1,
  type: 2,
  start: 3,
  end: 4,
  duration: 5,
  weeks: 6,
  room: 7,
  lecturers: 8,
  groups: 9
};

function parseTimetable(document, cb) {

    var dayElements = document.getElementsByTagName("p");

    var timetable = [];

    for (var i = 0, il = dayElements.length; i < il; i++) {
      var periods = [],
        dayElement = dayElements[i],
        rows = dayElement.nextSibling.nextSibling.getElementsByTagName("tr");


      for(var j = 1, jl = rows.length; j < jl; j++) {
        var columns = rows[j].children;

        var period = {};

        for(var k in layout) if(layout.hasOwnProperty(k)) {
          var child = columns[layout[k]];
          period[k] = child ? child.textContent : "";
        }

        periods.push(period);
      }

      timetable.push({
        name: dayElement.textContent.trim(),
        periods: periods
      });
    }

    cb && cb(null, timetable);
}



