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

        events: {
            "click #createTest": "createTest"
        },

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
                        $template = $(tmpl({
                            //candidates: candidates.toJSON()
                        }));

                        $(view.el).empty()
                        $(view.el).append($template);
                    })
                //}).fail(function () {
                    //console.log("fail")
                //})
        },
        createTest: function () {
            var createTest = new Tests.Views.createTest()
        }
    }),

    createTest: Backbone.View.extend({
        el: $('#page-wrapper'),

        events: {
            "click .newQuestionButton": "addQuestion"
        },

        initialize: function () {
            _.bindAll(this, 'render');
            console.log("New Tests view rendered");
            this.render();
        },

        render: function () {
            var view = this;

            var tests = new Tests.Collection.tests();

            var singleRecordTmpl = "/templates/tests/newTest.html";
            window.utils.fetchTemplate(singleRecordTmpl, function (tmpl) {
                var $template = $(tmpl({}));

                $(view.el).empty()
                $(view.el).append($template);
            })
        },

        addQuestion: function (e) {
            var view = this;
            var $button = $(e.currentTarget);

            var singleRecordTmpl = "/templates/tests/questions.html";

            window.utils.fetchTemplate(singleRecordTmpl, function (tmpl) {
                var $template = $(tmpl({
                    questionType: $button.data("questionType")
                }));

                $(view.el).append($template);
            })
        }
    })
};
