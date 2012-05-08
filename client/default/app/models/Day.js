var Models = Models || {};

(function() {
  "use strict";

  Models.Day = Backbone.Model.extend({
    initialize: function(options) {
      if(options.periods) {
        this.set("periods", new Collections.Periods(options.periods));
      }
    },

    getCurrentPeriod: function(time) {
      return this.get("periods").getCurrentPeriod(time);
    }
  });
  
})();