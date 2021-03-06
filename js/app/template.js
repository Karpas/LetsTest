Template = Backbone.View.extend({
    el: $('body'),

    initialize: function () {
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

        this.render(); // not all views are self-rendering. This one is.
    },
    render: function () {
        $('#page-wrapper', this.el).append("<ul> <li>hello world</li> </ul>");
    },
});
