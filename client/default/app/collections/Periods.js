var Collections = Collections || {};

(function() {
  "use strict";

  Collections.Periods = Backbone.Collection.extend({
    model: Models.Period,

    getCurrentPeriod: function(time) {
      time = time || new Date();

      var period = this.find(function(period) {
        return time >= period.get("start") && time <= period.get("end");
      });
      return period;
    }
  });

})();