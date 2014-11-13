var Dave = function () {
  "use strict";

  return {init: init};

  function init() {
    initLayout();
    initDashboards();
  }

  function initLayout() {
    $('#add-dashboard').on('click', function () {
      $('#modal-new-dashboard').modal('show');
    });

    $('.btn-cancel').on('click', function () {
      $('#modal-new-dashboard').modal('hide');
    });

    $('.btn-sure').on('click', function () {
      var dashboard = {
        name: $('#dashboard-name').val(),
        category: $('#dashboard-category').val(),
        description: $('#dashboard-description').val()
      };
      $.post('api/dashboard/add', dashboard, function (json) {
        if (!json.isError) {
          dashboard.date = json.data;
          render(dashboard);
          $('#modal-new-dashboard').modal('hide');
        }
      });
    });

    $('#main-content').on('click', '.btn-delete', function () {
      $('#modal-delete-dashboard').modal('show');
    });

    $('.btn-delete-cancel').on('click', function () {
      $('#modal-delete-dashboard').modal('hide');
    });

    $('.btn-delete-sure').on('click', function () {
      $('#modal-delete-dashboard').modal('hide');
    });
  }

  function initDashboards() {
    var sid = $.cookie('sid');
    var eid = $.cookie('eid');
    if (!sid) {
      sid = 1;
      $.cookie('sid', sid);
    }
    if (!eid) {
      eid = 11;
      $.cookie('eid', eid);
    }
    $.get('api/dashboard/list?sid=' + sid + '&eid=' + eid, function (json) {
      if (!json.isError) {
        var data = json.data;
        for (var i = 0; i < data.length; ++i) {
          var dashboard = data[i];
          render(dashboard);
        }
      }
    });
  }

  function render(dashboard) {
    var html = '<div class="col-md-3">';
    html += '<div class="panel panel-default">';
    html += '<div class="panel-body">';
    html += '<div class="name">' + dashboard.name + '</div>';
    html += '<div class="date">' + new Date(dashboard.date).Format('yyyy-MM-dd hh:mm:ss') + '</div>';
    html += '<div class="description">' + dashboard.description + '</div>';
    html += '<div class="actions">';
    html += '<button class="btn btn-sm btn-info">查看</button>';
    html += '<button class="btn btn-sm btn-success">编辑</button>';
    html += '<button class="btn btn-sm btn-danger btn-delete">删除</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    var children = $('.dashboards').children('.row');
    var child = children[children.length - 1];
    if (4 === child.length) {
      html = '<div class="row">' + html;
      html += '</div>';
      $('.dashboards').append(html);
    } else {
      $(child).append(html);
    }
  }
}();

$(function () {
  Dave.init();
});
