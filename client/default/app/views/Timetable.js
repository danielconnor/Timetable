var Views = Views || {};

(function() {
  "use strict";

  Views.Timetable = Backbone.View.extend({
    url: "#timetable",

    initialize: function(options) {
      this.dayScroll = $("#days .scroll-content");
      this.timeScroll = $("#periods .scroll-content");
      this.table = this.$el.find(".table");

      this.collection = new Collections.Timetable();
      this.collection.on("reset", function() {
        this.render();
      }, this);
    },

    render: function() {
      var days = this.collection,
        dayScroll = this.dayScroll,
        timeScroll = this.timeScroll,
        table = this.table,
        hour = 100;

      for(var i = 0; i < days.length; i++) {
        var day = days.at(i),
          periods = day.get("periods"),
          column = $("<div></div>").addClass("column");

        $("<div></div>").text(day.name).appendTo(dayScroll);

        for(var j = 0; j < periods.length; j++) {
          var period = periods.at(j);

          $("<div></div>").text(period.get("name")).css({
            top: (period.get("start").getHours() - 9) * 100 + "px",
            height: period.get("duration").getHours() * 100 + "px"
          }).appendTo(column);

        }
        table.append(column);
      }

    },

    hide: function() {
      this.$el.hide();
    },

    show: function(collection) {
      this.$el.show();

      if(collection && this.collection !== collection) {
        this.collection = collection;
        this.render();
      }
    }
  });
  
})();