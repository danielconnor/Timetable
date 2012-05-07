var Models = Models || {};

(function() {
  "use strict";

  Models.Class = Backbone.Model.extend({
    defaults: {
      start: null,
      end: null,
      name: "",
      lecturer: ""
    },

    initialize: function(options) {
      
    }
  });
  
})();