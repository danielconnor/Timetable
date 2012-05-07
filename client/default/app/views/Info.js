var Views = Views || {};

(function() {
  "use strict";

  Views.Info = Backbone.View.extend({

    timeout: null,

    initialize: function(options) {
      this.canvas = $("#countdown")[0];
      this.context = this.canvas.getContext("2d");

    },

    show: function(model) {
      this.$el.show();

      this.nextTick();

    },

    hide: function() {
      this.$el.hide();
    },

    draw: function() {
      var ctx = this.context;
      ctx.fillStyle = "#333";
      ctx.clearRect(0,0,200,200);
      ctx.beginPath();
      ctx.arc(100, 100, 75, 0, Math.PI*2, true);
      ctx.fill();

      ctx.fillStyle = "#33b5e5";
      ctx.beginPath();
      ctx.arc(100, 100, 75, -Math.PI / 2, Math.PI / 3, false);
      ctx.lineTo(100, 100);
      ctx.fill();
    },

    nextTick: function() {
      var info = this;

      this.draw();

      this.timeout = setTimeout(function() {
        info.nextTick();
      }, 1000);

    }

  });
  
})();