var Candidates = {};
Candidates.Models = {
    Link: Backbone.Model.extend({})
};

Candidates.Collection = {
    Links: Backbone.Collection.extend({
        model: Menu.Models.Link
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

            var singleRecordTmpl = "/templates/candidates/candidates.html";
            window.utils.fetchTemplate(singleRecordTmpl, function (tmpl) {
                $newRecord = $(tmpl({}));

                $(view.el).empty()
                $(view.el).append($newRecord);
            })

        }
    })
};
