var Views = Views || {};

(function() {
  "use strict";

  Views.Timetable = Backbone.View.extend({
    initialize: function(options) {



    },

    hide: function() {
      this.$el.hide();
    },

    show: function() {
      this.$el.show();
    }
  });
  
})();