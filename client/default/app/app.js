(function() {
    "use strict";

    window.app = new (Backbone.Router.extend({
      views: new Backbone.Model({
        timetable: new Views.Timetable({
          el: $("#timetableView")
        }),
        dayDetails: new Views.ClassDetails({
          el: $("#classView")
        }),
        classDetails: new Views.DayDetails({
          el: $("#dayView")
        }),
        info: new Views.Info({
          el: $("#infoView")
        }),
        active: null
      }),

      nav: null,


      timetable: null,

      routes: {
        "timetable":  "initTimetable",   // #timetable
        "day/:name":  "day",         // #search/kiwis
        "info":       "initInfo"      
      },

      initialize: function() {
        var views = this.views;

        this.nav = new Views.Nav({
          el: $("header"),
          model: this.views
        });

        document.location = "#info";
      },

      show: function(page, args) {
        var views = this.views,
          view = views.get(page),
          activeView = this.views.get("active");

        if(view && view !== activeView) {
          if(activeView) {
            activeView.hide();
          }
          view.show.apply(view, args);
          views.set("active", view);
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