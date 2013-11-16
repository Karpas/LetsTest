var Candidates = {};
Candidates.Models = {
    SingleCandidate: Backbone.Model.extend({
        idAttribute: "id"
    })
};

Candidates.Collection = {
    candidates: Backbone.Collection.extend({
        model: Candidates.Models.SingleCandidate,

        url: "/api/candidates/all.json"
    })
};

Candidates.Views = {
    MainView: Backbone.View.extend({
        el: $('#page-wrapper'),

        initialize: function () {
            _.bindAll(this, 'render');
            console.log("Candidates view rendered");
            this.render();
        },
        render: function () {
            var view = this;

            var candidates = new Candidates.Collection.candidates();

            candidates.fetch().done(function () {
                    var singleRecordTmpl = "/templates/candidates/candidates.html";
                    window.utils.fetchTemplate(singleRecordTmpl, function (tmpl) {
                        $newRecord = $(tmpl({
                            candidates: candidates.toJSON()
                        }));

                        $(view.el).empty()
                        $(view.el).append($newRecord);
                    })
                }).fail(function () {
                    console.log("fail")
                })

            

        }
    })
};
