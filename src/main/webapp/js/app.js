var Dave = function () {
  "use strict";

  var uuid;
  var appViewTpl;

  return {init: init};

  function init() {
    initTemplate();
    initLayout();
    initEvents();
    initDashboards();
  }

  function initTemplate() {
    $.ajax({
      url: "/tpl/app_view.html.tpl",
      async: false,
      success: function(data) {
        appViewTpl = data;
      }
    });
  }

  function initEvents() {
    $('.tooltips').tooltip();
    $('.popovers').popover();
  }

  function initLayout() {
    $('#qrcode-qq').qrcode({
      text: 'http://qm.qq.com/cgi-bin/qm/qr?k=nrfx4-qm4RCsN_FWban61yt0-WfDziD0',
      width: 100,
      height: 100
    });

    function showPopover($self) {
      var $popover = $self.find('.popover');
      var height = $popover.height();
      var width = $popover.width();
      var $position = $self.position();
      $popover.css('top', ($position.top - height - 12) + 'px');
      $popover.css('left', ($position.left - width / 2 - 2) + 'px');
      $popover.show();
    }

    function hidePopover($self) {
      $self.find('.popover').hide();
    }

    $('#site-qq').on('mouseenter', function() {
      showPopover($(this));
    });

    $('#site-qq').on('mouseleave', function() {
      hidePopover($(this));
    });

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
      var iDisplayLength = 11;
      var iDisplayStart = +($('#iDisplayStart').text());
      var iDisplayEnd = +($('#iDisplayEnd').text());
      $.post('/api/dashboard/add', dashboard, function (json) {
        if (!json.isError) {
          if (iDisplayEnd === iDisplayStart - 1 + iDisplayLength) {
            enableNextLink();
          } else {
            if (0 === iDisplayStart) {
              iDisplayStart = 1;
            }
            ++iDisplayEnd;
          }
          updateInfo(iDisplayStart, iDisplayEnd);
          dashboard = json.data;
          render(dashboard);
          $('#modal-new-dashboard').modal('hide');
        }
      });
    });

    $('#main-content').on('click', '.btn-delete', function () {
      var dashboard = $(this).parents('.dashboard');
      uuid = dashboard.attr('id');
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
      var iDisplayLength = 11;
      var iDisplayStart = +($('#iDisplayStart').text());
      var iDisplayEnd = +($('#iDisplayEnd').text());
      $.post("/api/dashboard/delete", {
        id: uuid,
        iDisplayLength: iDisplayLength,
        iDisplayStart: iDisplayStart,
        iDisplayEnd: iDisplayEnd
      }, function(json) {
        if (!json.isError) {
          $('#' + uuid).remove();
          var dashboards = json.data;
          if (dashboards) {
            for (var i = 0; i < dashboards.length; ++i) {
              var dashboard = dashboards[i];
              render(dashboard);
            }
            if (iDisplayStart === iDisplayEnd) {
              iDisplayStart -= iDisplayLength;
              if (iDisplayStart <= 0) {
                disablePreviousLink();
                disableNextLink();
                updateInfo(0, 0);
              } else {
                if (0 === iDisplayStart) {
                  disablePreviousLink();
                }
                disableNextLink();
                updateInfo(iDisplayStart, iDisplayStart -1 + iDisplayLength);
              }
            } else {
              updateInfo(iDisplayStart, iDisplayEnd - 1);
            }
          }
        }
        $('#modal-delete-dashboard').modal('hide');
      });
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
    $.get('/api/dashboard/list?iDisplayStart=' + iDisplayStart + '&iDisplayLength=' + iDisplayLength, function (json) {
      if (!json.isError) {
        $('.dashboards').children(':not(:first-child)').remove();
        $('.dashboards').children(':first-child').children(':not(:first-child)').remove();
        var dashboards = json.data.dashboards;
        var iTotalRecords = json.data.iTotalRecords;
        var iDisplayEnd = iDisplayStart - 1 + dashboards.length;
        if (0 === iDisplayEnd) {
          iDisplayStart = 0;
        }
        if (1 >= iDisplayStart) {
          disablePreviousLink();
        } else {
          enablePreviousLink();
        }
        if (iDisplayEnd === iTotalRecords) {
          disableNextLink();
        } else {
          enableNextLink();
        }
        for (var i = 0; i < dashboards.length; ++i) {
          var dashboard = dashboards[i];
          render(dashboard);
        }
        updateInfo(iDisplayStart, iDisplayEnd);
      }
    });
  }

  function updateInfo(iDisplayStart, iDisplayEnd) {
    $('#iDisplayStart').text(iDisplayStart);
    $('#iDisplayEnd').text(iDisplayEnd);
    $.cookie('iDisplayStart', iDisplayStart);
  }

  function enablePreviousLink() {
    $('#previous').children('span').hide();
    $('#previous').children('a').show();
  }

  function disablePreviousLink() {
    $('#previous').children('a').hide();
    $('#previous').children('span').show();
  }

  function enableNextLink() {
    $('#next').children('span').hide();
    $('#next').children('a').show();
  }

  function disableNextLink() {
    $('#next').children('a').hide();
    $('#next').children('span').show();
  }

  function render(dashboard) {
    dashboard.date = moment(new Date(dashboard.date)).format("YYYY-MM-DD HH:mm:ss");
    var html = Mustache.to_html(appViewTpl, dashboard);
    $('.panel-new-dashboard').after(html);
  }
}();

$(function () {
  Dave.init();
  $('body').removeClass("loading");
});
