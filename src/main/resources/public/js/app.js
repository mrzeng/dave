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

    $('#main-content').on('click', '.btn-view', function() {
      var dashboard = $(this).parents('.dashboard');
      window.location.href = "view/dashboard/" + dashboard.attr('id');
    });

    $('#main-content').on('click', '.btn-edit', function() {
      var dashboard = $(this).parents('.dashboard');
      window.location.href = "edit/dashboard/" + dashboard.attr('id');
    });

    $('.btn-delete-cancel').on('click', function () {
      $('#modal-delete-dashboard').modal('hide');
    });

    $('.btn-delete-sure').on('click', function () {
      $('#modal-delete-dashboard').modal('hide');
    });

    $('#previous a').on('click', function() {
      var iDisplayLength = 11;
      var iDisplayStart = +($('#iDisplayStart').text()) - iDisplayLength;
      if (!iDisplayStart) {
        iDisplayStart = 1;
      } else {
        iDisplayStart = +(iDisplayStart);
        if (iDisplayStart <= 0) {
          iDisplayStart = 1;
        }
      }
      list(iDisplayStart, iDisplayLength);
    });

    $('#next a').on('click', function() {
      var iDisplayLength = 11;
      var iDisplayStart = +($('#iDisplayStart').text()) + iDisplayLength;
      list(iDisplayStart, iDisplayLength);
    });
  }

  function initDashboards() {
    var iDisplayStart = $.cookie('iDisplayStart');
    if (!iDisplayStart) {
      iDisplayStart = 1;
    } else {
      iDisplayStart = +(iDisplayStart);
      if (iDisplayStart <= 0) {
        iDisplayStart = 1;
      }
    }
    var iDisplayLength = 11;
    list(iDisplayStart, iDisplayLength);
  }

  function list(iDisplayStart, iDisplayLength) {
    $.cookie('iDisplayStart', iDisplayStart);
    $.get('api/dashboard/list?iDisplayStart=' + iDisplayStart + '&iDisplayLength=' + iDisplayLength, function (json) {
      if (!json.isError) {
        $('.dashboards').children(':not(:first-child)').remove();
        $('.dashboards').children(':first-child').children(':not(:first-child)').remove();
        var dashboards = json.data.dashboards;
        var iTotalRecords = json.data.iTotalRecords;
        $('#iDisplayStart').text(iDisplayStart);
        var iDisplayEnd = iDisplayStart - 1 + dashboards.length;
        $('#iDisplayEnd').text(iDisplayEnd);
        if (1 === iDisplayStart) {
          $('#previous').children('a').hide();
          $('#previous').children('span').show();
        } else {
          $('#previous').children('span').hide();
          $('#previous').children('a').show();
        }
        if (iDisplayEnd === iTotalRecords) {
          $('#next').children('a').hide();
          $('#next').children('span').show();
        } else {
          $('#next').children('span').hide();
          $('#next').children('a').show();
        }
        for (var i = 0; i < dashboards.length; ++i) {
          var dashboard = dashboards[i];
          render(dashboard);
        }
      }
    });
  }

  function render(dashboard) {
    var html = '<div id="' + dashboard.id + '" class="col-md-3 dashboard">';
    html += '<div class="panel panel-default">';
    html += '<div class="panel-body">';
    html += '<div class="name">' + dashboard.name;
    html += '<button type="button" class="close btn-delete">';
    html += '<span>&times;</span>';
    html += '</button>';
    html += '</div>';
    html += '<div class="date">' + new Date(dashboard.date).Format('yyyy-MM-dd hh:mm:ss') + '</div>';
    html += '<div class="description">' + dashboard.description + '</div>';
    html += '<div class="actions">';
    html += '<button class="btn btn-sm btn-info btn-view">&#x67e5;&#x770b;</button>';
    html += '<button class="btn btn-sm btn-success btn-edit">&#x7f16;&#x8f91;</button>';
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
