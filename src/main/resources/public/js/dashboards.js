var Dave = function() {
  "use strict";

  return {init: init};

  function init() {
    initLayout();
  }

  function initLayout() {
    $('#add-dashboard').on('click', function() {
      $('#modal-new-dashboard').modal('show');
    });

    $('.btn-cancel').on('click', function() {
      $('#modal-new-dashboard').modal('hide');
    });

    $('.btn-sure').on('click', function() {
      $.post('api/dashboard/add', {
        name: $('#dashboard-name').val(),
        category: $('#dashboard-category').val(),
        description: $('#dashboard-description').val()
      }, function(json) {
        if (!json.isError) {
          var html = '<div class="col-md-3">';
          html += '<div class="panel panel-default">';
          html += '<div class="panel-body">';
          html += '<div>' + $('#dashboard-name').val() + '</div>';
          html += '<div style="color: #aaa">' + json.data + '</div>';
          html += '<div style="padding-top: 5px;">' + $('#dashboard-description').val() + '</div>';
          html += '<div style="padding-top: 5px;">';
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
          $('#modal-new-dashboard').modal('hide');
        }
      });
    });

    $('#main-content').on('click', '.btn-delete', function() {
      $('#modal-delete-dashboard').modal('show');
    });

    $('.btn-delete-cancel').on('click', function() {
      $('#modal-delete-dashboard').modal('hide');
    });

    $('.btn-delete-sure').on('click', function() {
      $('#modal-delete-dashboard').modal('hide');
    });
  }
}();

$(function() {
  Dave.init();
});
