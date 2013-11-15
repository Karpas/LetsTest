var Candidates = {};
Candidates.Models = {
    singleCandidate: Backbone.Model.extend({})
};

Candidates.Collection = {
    candidates: Backbone.Collection.extend({
        model: Menu.Models.singleCandidate,

        url: "/api/candidates/all"
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
                    console.log("done");
                }).fail(function () {
                    console.log("fail")
                })

            var singleRecordTmpl = "/templates/candidates/candidates.html";
            window.utils.fetchTemplate(singleRecordTmpl, function (tmpl) {
                $newRecord = $(tmpl({}));

                $(view.el).empty()
                $(view.el).append($newRecord);
            })

        }
    })
};
