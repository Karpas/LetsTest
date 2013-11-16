Backbone.Router.prototype.before = function () { };
Backbone.Router.prototype.after = function () { };

Backbone.Router.prototype.route = function (route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (_.isFunction(name)) {
        callback = name;
        name = '';
    }
    if (!callback) callback = this[name];

        var router = this;

    Backbone.history.route(route, function (fragment) {
        var args = router._extractParameters(route, fragment);

        router.before.apply(router, arguments);
        callback && callback.apply(router, args);
        router.after.apply(router, arguments);

        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
    });
    return this;
};

AppRouter = Backbone.Router.extend({
	routes: {
        "": "login",
        "dashboard": "dashboard",
        "tests": "tests",
        "candidates": "candidates",
        "specialists": "specialists",
        "testcreator": "createTest"
    },

    initialize: function () {
        app.menu = new Menu.Views.Sidebar();
        app.header = new Nav.Views.Top();
        var template = new Template();
        Backbone.history.start({ pushState: true });
        $(document).on('click', 'a:not([data-bypass])', function (evt) {

            var href = $(this).attr('href');
            var protocol = this.protocol + '//';

            if (href.slice(protocol.length) !== protocol) {
              evt.preventDefault();
              app.router.navigate(href, true);
            }
        });
    },

    dashboard: function () {
        app.pageTitle = "Dashboard";
    },

    tests: function () {
        app.pageTitle = "Tests";
        var tests = new Tests.Views.MainView();
    },
    createTest: function () {
        app.pageTitle = "New test";
        var createTest = new Tests.Views.createTest()
    },
    candidates: function () {
        app.pageTitle = "Candidates";
        var candidates = new Candidates.Views.MainView();
    },
    specialists: function () {
        app.pageTitle = "Specialists";
    },
    after: function () {
        app.menu.refresh(Backbone.history.fragment);
        app.header.refresh();
    },

});
