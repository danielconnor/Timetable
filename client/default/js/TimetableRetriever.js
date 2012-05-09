var getTimetable = function(cb) {
  $fh.web({
    url: "http://timetable.itcarlow.ie/reporting/textspreadsheet;student+set;id;KCSOFD_3A%20Set%0D%0A?t=student+set+textspreadsheet&days=1-5&weeks=&periods=5-40&template=student+set+textspreadsheet",
    period: 60 * 60 * 60
  }, function(res) {
    parseTimetable(res.body, cb);
  });
};

var parseTimetable = function(html, cb) {
    var d = document.implementation.createHTMLDocument("");
    d.documentElement.innerHTML = html;

    var dayElements = d.getElementsByTagName("p");

    var timetable = [];

    for (var i = 0, il = dayElements.length; i < il; i++) {
      var periods = [],
        dayElement = dayElements[i],
        rows = dayElement.nextElementSibling.getElementsByTagName("tr");

      for(var j = 1, jl = rows.length; j < jl; j++) {
        var columns = rows[j].children;

        periods.push({
          name: columns[0].textContent,
          module: columns[1].textContent,
          type: columns[2].textContent,
          start: columns[3].textContent,
          end: columns[4].textContent,
          duration: columns[5].textContent,
          weeks: columns[6].textContent,
          room: columns[7].textContent,
          lecturers: columns[8].textContent,
          groups: columns[9].textContent.split(";")
        });
      }

      timetable.push({
        name: dayElement.textContent.trim(),
        periods: periods
      });
    }

    cb && cb(timetable);
};