var Models = Models || {};

(function() {
  "use strict";

  Models.Period = Backbone.Model.extend({
    defaults: {
      start: null,
      end: null,
      duration: 0,
      name: "",
      lecturers: ""
    },

    initialize: function(options) {
      if(options.start) {
        this.set("start", Date.parse(options.start));
      }
      if(options.end) {
        this.set("end", Date.parse(options.end));
      }
      if(options.duration) {
        this.set("duration", Date.parse(options.duration));
      }
    }
  });
  
})();