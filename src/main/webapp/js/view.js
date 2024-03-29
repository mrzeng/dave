var App = function() {
  "use strict";

  var templates = {};

  return {init: init};

  function getId() {
    var pathname = window.location.pathname;
    var paths = pathname.split('/');
    return paths[paths.length - 1];
  }

  function getPath() {
    var path = '';
    var pathItems = $('#team').find('.path-item span');
    for (var i = 0; i < pathItems.length; ++i) {
      path += '/';
      path += $(pathItems[i]).html();
    }
    return path;
  }

  function getDateRange() {
    return $('#date-range span').html();
  }

  function initTableWidgetLayout(id, width) {
    var tableWidget = '<div class="dave-widget" id="' + id + '" data-widget-type="table">';
    tableWidget += templates['view_table'];
    tableWidget += '</div>';
    $('.content-wrapper').append(tableWidget);
    var $tableWidget = $('#' + id);
    $tableWidget.addClass(width);
    $tableWidget.attr('data-widget-width', width);
    $(window).resize();
  }

  function initChartWidgetLayout(id, width) {
    var chartWidget = '<div class="dave-widget" id="' + id + '" data-widget-type="chart">';
    chartWidget += templates['view_chart'];
    chartWidget += '</div>';
    $('.content-wrapper').append(chartWidget);
    var $chartWidget = $('#' + id);
    $chartWidget.addClass(width);
    $chartWidget.attr('data-widget-width', width);
    $(window).resize();
  }

  function drawTableWidget(widgetId) {
    $.getJSON('/api/widget/' + widgetId + '/config', function(json) {
      if (!json.isError) {
        drawTableWidgetData(json.data);
      }
    });
  }

  function drawChartWidget(widgetId) {
    $.getJSON('/api/widget/' + widgetId + '/config', function(json) {
      if (!json.isError) {
        drawChartWidgetData(json.data);
      }
    });
  }

  function drawTableWidgetData(widgetData) {
    var $tableWidget = $('#' + widgetData.id);
    $tableWidget.find('.panel-title').children('span').html(widgetData.name);
    $tableWidget.find('.panel-title input').val(widgetData.name);
    var $container = $tableWidget.find('.widget-container');
    drawLoading($container);
    $.getJSON('/api/widget/' + widgetData.id + '/data?path=' + getPath() + '&daterange=' + getDateRange(), function(json) {
      if (!json.isError) {
        var dt = json.data;
        drawTableData($container, $tableWidget.find('.table-filter-menu'), dt);
      } else {
        drawErrorMessage($container, json.message);
      }
    });
  }

  function drawChartWidgetData(widgetData) {
    var $chartWidget = $('#' + widgetData.id);
    $chartWidget.find('.panel-title').children('span').html(widgetData.name);
    $chartWidget.find('.panel-title input').val(widgetData.name);
    var $container = $chartWidget.find('.widget-container');
    drawLoading($container);
    $.getJSON('/api/widget/' + widgetData.id + '/data?path=' + getPath() + '&daterange=' + getDateRange(), function(json) {
      if (!json.isError) {
        drawChartData($container, widgetData.type, json.data);
      } else {
        drawErrorMessage($container, json.message);
      }
    });
  }

  function drawLoading($container) {
    $container.empty();
    $container.html(templates['loading']);
  }

  function drawErrorMessage($container, message) {
    $container.empty();
    $container.html(message);
  }
 
  function drawTableData($container, $menu, dt) {
    $container.empty();
    $menu.empty();
    for (var i = 0; i < dt[0].length; ++i) {
      var li = '<li>';
      li += '<input class="icheck-menu" data-column-id="col-' + i + '" type="checkbox" checked>';
      li += dt[0][i];
      li += '</li>';
      $menu.append(li);
    }

    $menu.find('.icheck-menu').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue',
      inheritClass: true
    }).on('ifChecked', function(e) {
      var colId = $(e.target).attr('data-column-id');
      $('.' + colId).show();
    }).on('ifUnchecked', function(e) {
      var colId = $(e.target).attr('data-column-id');
      $('.' + colId).hide();
    });

    var dom = '<table class="table table-striped table-hover table-highlight">';
    dom += '<thead>';
    dom += '<tr>';
    for (var i = 0; i < dt[0].length; ++i) {
      dom += '<td class="col-' + i + '">';
      dom += dt[0][i];
      dom += '</td>';
    }
    dom += '</tr>';
    dom += '</thead>';
    dom += '<tbody>';
    for (var i = 1; i < dt.length; ++i) {
      dom += '<tr>';
      for (var j = 0; j < dt[i].length; ++j) {
        dom += '<td class="col-' + j + '">';
        dom += dt[i][j];
        dom += '</td>';
      }
      dom += '</tr>';
    }
    dom += '</tbody>';
    dom += '</table>';
    $container.append(dom);
    $(window).resize();
  }

  function drawChartData($container, type, dt) {
    $container.empty();
    var dataOptions = {
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        enabled: true
      },
      plotOptions: {
        line: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true
        },
        bar: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true
        },
        area: {
          allowPointSelect: false,
          cursor: 'pointer',
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true,
          showInLegend: true
        }
      }
    };
    if ('pie' === type) {
      var series = [];
      var isize = 100.0 / (dt.length - 1);
      for (var i = 1; i < dt.length; ++i) {
        var name = dt[i][0];
        var data = [];
        for (var j = 1; j < dt[i].length; ++j) {
          data.push([dt[0][j], dt[i][j]]);
        }
        series.push({
          name: name,
          data: data,
          type: type,
          size: i * isize + '%',
          innerSize: (i - 1) * isize + '%'
        });
      }
      dataOptions.pointFormat = '{series.name}: <b>{point.percentage:.1f}%</b>';
      dataOptions.series = series;
      $container.highcharts(dataOptions);
    } else if ('bar' === type) {
      var categories = [];
      var series = [];
      for (var i = 1; i < dt[0].length; ++i) {
        categories.push(dt[0][i]);
      }
      for (i = 1; i < dt.length; ++i) {
        var name = dt[i][0];
        var data = [];
        for (var j = 1; j < dt[i].length; ++j) {
          data.push(dt[i][j]);
        }
        series.push({
          'name': name,
          'data': data,
          'type': type
        });
      }
      dataOptions.xAxis = {
        categories: categories
      };
      dataOptions.tooltip.formatter = function() {
        return '<b>' + this.series.name + '</b><br>(' + this.x + ', ' + this.y + ')';
      };
      dataOptions.series = series;
      $container.highcharts(dataOptions);
    } else if ('line' === type || 'area' === type) {
      var categories = [];
      var series = [];
      for (var i = 1; i < dt.length; ++i) {
        categories.push(dt[i][1]);
      }
      var j = 0;
      var name;
      var data = [];
      for (i = 1; i < dt.length; ++i) {
        name = dt[i][0];
        for (j = i; j < dt.length; ++j) {
          if (name === dt[j][0]) {
            data.push(dt[j][2]);
          } else {
            series.push({
              'name': name,
              'data': data,
              'type': type
            });
            data = [];
            i = j - 1;
            break;
          }
        }
        if (dt.length === j) {
          series.push({
            'name': name,
            'data': data,
            'type': type
          });
          break;
        }
      }
      dataOptions.xAxis = {
        categories: categories,
        labels: {
          rotation: 90
        }
      };
      dataOptions.tooltip.formatter = function() {
        return '<b>' + this.series.name + '</b><br>(' + this.x + ', ' + this.y + ')';
      };
      dataOptions.series = series;
      $container.highcharts(dataOptions);
    }
    $(window).resize();
  }

  function init() {
    loadTemplates();
    initLayout();
    initSelectPath();
    $('#date-range').initDateRangePicker();
    $.fn.initBackToTop();
    initWidgetsLayout();
    initEvents();
  }

  function initEvents() {
    $('.tooltips').tooltip();
    $('.popovers').popover();
    $('#date-range span').on('change', function() {
      initWidgetsLayout();
    });
  }

  function loadTemplates() {
    $.get('/api/ui-widget/list', {async: false}, function(json) {
      if (!json.isError) {
        var data = json.data;
        for (var i = 0; i < data.length; ++i) {
          var name = data[i].name;
          var tpl = data[i].tpl;
          templates[name] = tpl;
        }
      }
    });
  }

  function initLayout() {
    
  }

  function initPathRoot() {
    $.ajax({
      url: '/api/path/root',
      type: 'GET',
      async: false,
      success: function(json) {
        if (!json.isError) {
          appendPath(json.data);
        }
      }
    });
  }
  
  function appendPath(path) {
    var li = '<li class="dropdown path-non-leaf">';
    li += '<a href="#" class="path-item">';
    li += '<span>';
    li += path;
    li += '</span>';
    li += '</a>';
    $.ajax ({
      url: '/api/path/next',
      type: 'GET',
      async: false,
      data: {'path': getPath() + '/' + path},
      success: function(json) {
        if (!json.isError) {
          var subpaths = json.data;
          if (subpaths && 0 !== subpaths.length) {
            li += '<a href="#" data-toggle="dropdown" class="dropdown-toggle">';
            li += '<b class="caret"></b>';
            li += '</a>';
            li += '<ul class="dropdown-menu">';
            for (var i = 0; i < subpaths.length; ++i) {
              li += '<li>';
              li += '<a href="#" class="path-sub">';
              li += subpaths[i];
              li += '</a>';
              li += '</li>';
            }
            li += '</ul>';
            li += '</li>';
          }
          $('.breadcrumb').append(li);
        }
      }
    });
  }

  function initSelectPath() {
    if ($.parseQuery().base) {
      var arr = $.parseQuery().base.split('/');
      for (var i = 1; i < arr.length; ++i) {
        appendPath(arr[i]);
      }
    } else {
      initPathRoot();
    }

    $('.breadcrumb').on('click', '.path-item', function() {
      $(this).parent().nextAll().remove();
      initWidgetsLayout();
    });

    $('.breadcrumb').on('click', '.path-sub', function() {
      var path = $(this).html();
      var $li = $(this).parent().parent().parent();
      $li.nextAll().remove();
      appendPath(path);
      initWidgetsLayout();
    });
  }

  function initWidgetsLayout() {
    $('.content-wrapper').empty();
    $.getJSON('/api/dashboard/' + getId() + '/layout', function(json) {
      if (!json.isError) {
        var data = json.data;
        for (var i = 0; i < data.length; ++i) {
          if ('table' === data[i].type) {
            initTableWidgetLayout(data[i].id, data[i].width);
          } else if ('chart' === data[i].type) {
            initChartWidgetLayout(data[i].id, data[i].width);
          }
        }
        
        for (var i = 0; i < data.length; ++i) {
          var widgetId = data[i].id;
          var widgetType = data[i].type;
          if ('table' === widgetType) {
            drawTableWidget(widgetId);
          } else if ('chart' === widgetType) {
            drawChartWidget(widgetId);
          }
        };
        $('.nav-wrapper').pin();
      }
    });
  }
}();

$(function() {
  App.init();
  $('body').removeClass("loading");
});
