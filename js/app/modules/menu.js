var Menu = {};
Menu.Models = {
    Link : Backbone.Model.extend({
        idAttribute: "href",
        href: undefined,
        name: undefined,
        isActive: false,
        iconClass: "fa-circle",
        render: function() {
            var activeClass = (this.attributes.isActive) ? ' class="active"' : '';
            var name = (this.attributes.name) ? 
            this.attributes.name : window.utils.capitalize(this.attributes.href) ;
            return '<li' + activeClass + ' id="' + this.attributes.href + '">' + 
                '<a href="' + this.attributes.href + '">' +
                    '<i class="fa ' + this.attributes.iconClass + '"></i> ' + 
                    name + 
                '</a>' + 
            '</li>';
        }
    })
};

Menu.Collection = {
    Links : Backbone.Collection.extend({
        model: Menu.Models.Link,
        render: function() {
            var html = '';
             _.each(this.models, function(link) {
                html += link.render();
            });
            return html;
        }
    })
};

Menu.Views = {
    Sidebar : Backbone.View.extend({
        el: $('#menu'),
        links: [],

        getLinks: function() {
            switch(app.currentUser.role) {
                case "hr":
                    this.links.push(new Menu.Models.Link({
                        href:"dashboard", 
                        iconClass: "fa-dashboard"
                    }));
                    this.links.push(new Menu.Models.Link({
                        href:"tests",
                        iconClass: "fa-check-square-o"
                    }));
                    this.links.push(new Menu.Models.Link({
                        href:"candidates",
                        iconClass: "fa-user"
                    }));
                    this.links.push(new Menu.Models.Link({
                        href:"specialists",
                        iconClass: "fa-group"
                    }));
                    break;
                case "specialist":
                    this.links.push(new Menu.Models.Link({
                        href:"tests-to-check",
                        iconClass: "fa-check-square"
                    }));
                    break;
            }
        },

        initialize: function() {
            this.getLinks();
            var linksCollection = new Menu.Collection.Links(this.links);
            
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(linksCollection.render()); // not all views are self-rendering. This one is.
        },

        render: function(data) {
            $(this.el).append(data);
        },

        refresh: function(href) {
            if ($('#'+href).length) {
                if ($('.active', this.el).length) {
                    $('.active', this.el).removeClass("active");
                }
                $('#'+href).addClass("active");
            }
        }
    })
};
