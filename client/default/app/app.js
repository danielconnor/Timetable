(function() {
    "use strict";

    window.app = new (Backbone.Router.extend({
      views: {
        timetable: null,
        dayDetails: null,
        classDetails: null,
        info: null
      },

      activeView: null,

      timetable: null,

      routes: {
        "timetable":  "initTimetable",   // #timetable
        "day/:name":  "day",         // #search/kiwis
        "info":       "initInfo"      
      },

      initialize: function() {
        var views = this.views;

        views.timetable = new Views.Timetable({
          el: $("#timetable")
        });
        views.classDetails = new Views.ClassDetails({
          el: $("#classDetails")
        });
        views.dayDetails = new Views.DayDetails({
          el: $("#dayDetails")
        });

        views.info = new Views.Info({
          el: $("#info")
        });

        document.location = "#info";
      },

      show: function(page, args) {
        var view = this.views[page];

        if(view && view !== this.activeView) {
          if(this.activeView) {
            this.activeView.hide();
          }
          view.show.apply(view, args);
          this.activeView = view;
        }
      },

      initTimetable: function() {
        this.show("timetable");
      },
      initInfo: function() {
        this.show("info");
      }

    }))();

    $(function() {
      Backbone.history.start({
          pushstate: true
      });
    });
})();