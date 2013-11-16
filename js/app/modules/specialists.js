var Specialists = {};

Specialists.Models = {
    Specialist : Backbone.Model.extend({
        idAttribute: "Id",
        render: function() {
            console.log(this)
            return '<tr>' +
              '<td>' + this.attributes.Name + ' ' + this.attributes.Surname + '</td>' +
              '<td>' + this.attributes.Position + '</td>' +
              '<td>' + this.attributes.MajorSpeciality + '</td>' +
              '<td>' + this.attributes.Technologies.join(" ,") + '</td>' +
              '<td>' + this.attributes.EvaluatedTests + '</td>' +
              '<td>' +
                '<button class="btn btn-sm btn-danger" type="button" data-id="' + this.attributes.Id + '" ><i class="fa fa-trash-o"></i> Delete</button>' +
                '<button class="btn btn-sm btn-success" type="button" data-id="' + this.attributes.Id + '"><i class="fa fa-envelope"></i> Email</button>' +
                '<button class="btn btn-sm btn-info" type="button" data-id="' + this.attributes.Id + '"><i class="fa fa-gear"></i> Edit</button>' +
              '</td>' +
            '</tr>';
        }
    })
};

Specialists.Collection = {
    Specialists: Backbone.Collection.extend({
        model: Specialists.Models.Specialist,
        url: "/api/specialists/all.json",
        render: function() {
            var html = '';
             _.each(this.models, function(link) {
                html += link.render();
            });
            return html;
        }
    })
};

Specialists.Views = {
    Index: Backbone.View.extend({
        el: $('#page-wrapper'),

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },
        render: function () {
            var view = this;

            var specialists = new Specialists.Collection.Specialists();

            specialists.fetch().done(function () {;
                var listTmpl = "/templates/specialists/list.html";
                window.utils.fetchTemplate(listTmpl, function (tmpl) {
                    var list = $(tmpl({
                        specialists: specialists.toJSON()
                    }));

                    $(view.el).empty()
                    $(view.el).append(list);
                })
            }).fail(function () {
                console.log("fail")
            })


        }
    })
};