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

    $('#previous a').on('click', function() {
      var iDisplayStart = +($('#iDisplayStart').text()) - 1;
      if (!iDisplayStart || iDisplayStart <= 0) {
        iDisplayStart = 1;
      }
      var iDisplayLength = 11;
      list(iDisplayStart, iDisplayLength);
    });

    $('#next a').on('click', function() {
      var iDisplayStart = +($('#iDisplayStart').text()) + 1;
      var iDisplayLength = 11;
      list(iDisplayStart, iDisplayLength);
    });
  }

  function initDashboards() {
    var iDisplayStart = $.cookie('iDisplayStart');
    if (!iDisplayStart || iDisplayStart <= 0) {
      iDisplayStart = 1;
    }
    var iDisplayLength = 11;
    list(iDisplayStart, iDisplayLength);
  }

  function list(iDisplayStart, iDisplayLength) {
    $.cookie('iDisplayStart', iDisplayStart);
    $.get('api/dashboard/list?iDisplayStart=' + iDisplayStart + '&iDisplayLength=' + iDisplayLength, function (json) {
      if (!json.isError) {
        var dashboards = json.data.dashboards;
        var iTotalRecords = json.data.iTotalRecords;
        $('#iDisplayStart').text(iDisplayStart);
        var iDisplayEnd = iDisplayStart + dashboards.length - 1;
        $('#iDisplayEnd').text(iDisplayEnd);
        if (1 === iDisplayStart) {
          $('#previous').attr('disabled', true);
          $('#previous').removeAttr('href');
        } else {
          $('#previous').attr('disabled', false);
          $('#previous').attr('href', 'javascript:void(0);');
        }
        if (iDisplayEnd === iTotalRecords) {
          $('#next').attr('disabled', true);
          $('#next').removeAttr('href');
        } else {
          $('#next').attr('disabled', false);
          $('#next').attr('href', 'javascript:void(0);');
        }
        for (var i = 0; i < dashboards.length; ++i) {
          var dashboard = dashboards[i];
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
