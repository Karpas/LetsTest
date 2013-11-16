window.utils = {

    fetchTemplate: function (path, done) {
        window.JST = window.JST || {};

        if (window.JST[path]) {
            return done(window.JST[path]);
        }

        return $.get(path, function (contents) {
            var tmpl = _.template(contents);
            window.JST[path] = tmpl;

            done(tmpl);
        });
    },

    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};
