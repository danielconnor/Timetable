Backbone.sync = function(method, model, options) {
    var req = {};
    for(var i in options) {
        var opt = options[i];
        if(typeof opt !== "function") {
            req[i] = opt;
        }
    }
    req.model = model;
    $fh.act({
        act: model.acts[method],
        req: req
    }, function(res) {
        if(res.errorCode) {
            options.error(res);
        }
        else {
            options.success(res, null);
        }
    }, function(res) {
        options.error(res);
    });
};

Backbone.Model.prototype.parse = function(res, xhr) {
    var fields = res.fields;
    fields.guid = res.guid;
    return fields;
};

Backbone.Collection.prototype.parse = function(res, xhr) {
    return res.list;
};