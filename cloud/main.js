"use strict";


module.exports = {

  testDb: function(params, cb) {

    $fh.db({
      act: "create",
      type: "timetable",
      fields: {
        days: {
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          fri: ""
        }
      }
    }, cb);

  }



};