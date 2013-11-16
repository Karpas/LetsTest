var Tests = {};
Tests.Models = {
    SingleCandidate: Backbone.Model.extend({
        idAttribute: "id"
    })
};

Tests.Collection = {
    tests: Backbone.Collection.extend({
        model: Candidates.Models.SingleCandidate,

        url: "/api/tests/all.json"
    })
};

Tests.Views = {
    MainView: Backbone.View.extend({
        el: $('#page-wrapper'),

        initialize: function () {
            _.bindAll(this, 'render');
            console.log("Tests view rendered");
            this.render();
        },
        render: function () {
            var view = this;

            var tests = new Tests.Collection.tests();

            //tests.fetch().done(function () {
                var singleRecordTmpl = "/templates/tests/tests.html";
                    window.utils.fetchTemplate(singleRecordTmpl, function (tmpl) {
                        $newRecord = $(tmpl({
                            //candidates: candidates.toJSON()
                        }));

                        $(view.el).empty()
                        $(view.el).append($newRecord);
                    })
                //}).fail(function () {
                    //console.log("fail")
                //})

            

        }
    })
};
