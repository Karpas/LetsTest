AppRouter = Backbone.Router.extend({
	routes: {
        "": "login",
        "dashboard": "dashboard",
        "candidates": "candidates"
    },

    initialize: function () {
        Backbone.history.start({ pushState: true });
      $(document).on('click', 'a:not([data-bypass])', function (evt) {

        var href = $(this).attr('href');
        var protocol = this.protocol + '//';

        if (href.slice(protocol.length) !== protocol) {
          evt.preventDefault();
          app.router.navigate(href, true);
        }
      });
        var menu = new Menu.Views.Sidebar();
        var template = new Template();
    },

    dashboard: function () {
        alert("dashboard");
    },

    candidates: function () {
    	alert("dashboard");
    }
});
