var Menu = {};
Menu.Models = {
    Link : Backbone.Model.extend({
        idAttribute: "href",
        href: undefined,
        name: undefined,
        isActive: false,
        iconClass: "fa-circle",
        render: function() {
            return '<li' + (this.isActive) ? ' class="active"' : '' + '>' + 
                '<a href="' + this.href + '"><i class="fa ' + this.iconClass + '"> ' + 
                    (this.name) ? window.utils.capitalize(this.href) : this.name + 
                '</a>' + 
            '</li>';
        }
    })
};

Menu.Collection = {
    Links : Backbone.Collection.extend({
        model: Menu.Models.Link
    })
};

Menu.Views = {
    Sidebar : Backbone.View.extend({
        el: $('#menu'),

        getLinks: function() {
            var links = [];
            switch(app.currentUser.role) {
                case "hr":
                    dashboard = new Link({href:"dashboard", iconClass: "fa-dashboard"});
                    // links[] = new Link({href:"tests", iconClass: "fa-check-square-o"});
                    // links[] = new Link({href:"dashboard", iconClass: "fa-dashboard"});
                    // links[] = new Link({href:"dashboard", iconClass: "fa-dashboard"});
                    // links[] = new Link({href:"dashboard", iconClass: "fa-dashboard"});
            }
        },

        initialize: function() {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
            console.log("Menu rendered");
            this.render(); // not all views are self-rendering. This one is.
        },
        render: function() {
            $(this.el).append('<li class="active"><a id="dash" href="dashboard"><i class="fa fa-dashboard"></i> Dashboard</a></li>'+
                '<li><a href="tests"><i class="fa fa-check-square-o"></i> Tests</a></li>'+
                '<li><a href="candidates"><i class="fa fa-user"></i> Candidates</a></li>'+
                '<li><a href="tests-to-check"><i class="fa fa-check-square"></i> Tests to check</a></li>'+
                '<li><a href="specialists"><i class="fa fa-group"></i> Specialists</a></li>');
        },
    })
};
