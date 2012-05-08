var Views = Views || {};

(function() {
  "use strict";

  Views.Nav = Backbone.View.extend({

    events: {
    },

    initialize: function(options) {
      var nav = this;

      this.model.on("change", function() {
        nav.updateActive();
      });
    },

    updateActive: function() {
      var activeView = app.views.get("active"),
        previousView = app.views.previous("active"),
        $el = this.$el;

      if(previousView) {
        $el.find("[href=" + previousView.url + "]").parent().removeClass("active");
      }
      if(activeView) {
        $el.find("[href=" + activeView.url + "]").parent().addClass("active");
      }
    }

  });
  
})();