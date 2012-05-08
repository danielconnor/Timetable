var Collections = Collections || {};

(function() {
  "use strict";

  Collections.Timetable = Backbone.Collection.extend({
    model: Models.Day,

    initialize: function(options) {
      this.fetch();
    },
    sync: function(method, model, options) {
      getTimetable(options.success);
    },

    getCurrentPeriod: function(time) {
      time = time || new Date();

      var today = this.find(function(day){
        return day.get("name") === time.getDayName();
      });

      return today;
    }

  });

})();