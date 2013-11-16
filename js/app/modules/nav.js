var Nav = {};
Nav.Views = {
    Top : Backbone.View.extend({
        el: $('#nav'),
        links: [],

        initialize: function() {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function(data) {
            var view = this;
            window.utils.fetchTemplate("/templates/header.html", function (tmpl) {
                $(view.el).html(tmpl({
                    username: app.currentUser.name + " " + app.currentUser.surname,
                    pageTitle: app.pageTitle
                }));
            });
        },

        refresh: function() {
            if (app.pageTitle.length) {
                $('.navbar-brand small').text("  - " +app.pageTitle);
            }
        }
    })
};
