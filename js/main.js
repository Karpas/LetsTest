(function($){
    var Template = Backbone.View.extend({
        el: $('#container'),
        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },
        render: function(){
            $(this.el).append("<ul> <li>hello world</li> </ul>");
        }
    });
    var template = new Template();
})(jQuery);