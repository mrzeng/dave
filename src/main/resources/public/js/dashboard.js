var App = function() {
  "use strict";

  return {init: init};

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

  /**
   * 
   * @param {type} id
   * @param {type} width
   * @returns {undefined}
   */
  function initTableWidgetLayout(id, width) {
    var tableWidget = '<div class="dave-widget ' + width + '" id="' + id + '" data-widget-type="table" data-widget-width="' + width + '">';
    tableWidget += '<div class="panel panel-default" style="border: none !important;box-shadow: none !important">';
    tableWidget += '<div class="dave-header">';
    tableWidget += '<nav class="table-title">';
    tableWidget += '<div class="container-fluid">';
    tableWidget += '<div class="navbar-header">';
    tableWidget += '<div class="panel-title">';
    tableWidget += '<i class="fa fa-table" style="margin-right: 10px;"></i>';
    tableWidget += '<span></span>';
    tableWidget += '<div class="input-group" style="display: none">';
    tableWidget += '<input type="text" placeholder="图表名称...">';
    tableWidget += '<span class="input-group-addon">';
    tableWidget += '<i class="fa fa-pencil"></i>';
    tableWidget += '</span>';
    tableWidget += '</div>';
    tableWidget += '</div>';
    tableWidget += '</div>';
    tableWidget += '<ul class="nav navbar-nav pull-right">';
    tableWidget += '<li>';
    tableWidget += '<a href="javascript:void(0);" class="dave-table-filter dropdown-toggle" data-toggle="dropdown">';
    tableWidget += '<i class="fa fa-filter"></i>';
    tableWidget += '</a>';
    tableWidget += '<ul class="table-filter-menu dropdown-menu dropdown-menu-right">';
    tableWidget += '</ul>';
    tableWidget += '</li>';
    tableWidget += '<li>';
    tableWidget += '<a href="javascript:void(0);" class="dave-hide">';
    tableWidget += '<i class="fa fa-minus"></i>';
    tableWidget += '</a>';
    tableWidget += '</li>';
    tableWidget += '<li style="display: none">';
    tableWidget += '<a href="javascript:void(0);" class="dave-expand">';
    tableWidget += '<i class="fa fa-plus"></i>';
    tableWidget += '</a>';
    tableWidget += '</li>';
    tableWidget += '<li>';
    tableWidget += '<a href="javascript:void(0);" class="dave-settings">';
    tableWidget += '<i class="fa fa-cog"></i>';
    tableWidget += '</a>';
    tableWidget += '</li>';
    tableWidget += '<li style="display: none">';
    tableWidget += '<a href="javascript:void(0);" class="dave-view">';
    tableWidget += '<i class="fa fa-eye"></i>';
    tableWidget += '</a>';
    tableWidget += '</li>';
    tableWidget += '<li>';
    tableWidget += '<a href="javascript:void(0);" class="dave-remove">';
    tableWidget += '<i class="fa fa-times"></i>';
    tableWidget += '</a>';
    tableWidget += '</li>';
    tableWidget += '</ul>';
    tableWidget += '</div>';
    tableWidget += '</nav>';
    tableWidget += '</div>';
    tableWidget += '<div class="dave-body dave-table">';
    tableWidget += getWidgetConfigOption('table');
    tableWidget += '<div class="dave-content">';
    tableWidget += '<table class="widget-container table table-striped table-hover table-highlight">';
    tableWidget += '</table>';
    tableWidget += '</div>';
    tableWidget += '</div>';
    tableWidget += '</div>';
    tableWidget += '</div>';
    $('.content-wrapper').append(tableWidget);
    var $tableWidget = $('#' + id);
    $tableWidget.find('.select-width').val(width);
    $tableWidget.find('.kettle').uploadFile({
      url: 'api/widget/' + id + '/kettle/upload',
      allowedTypes: 'ktr',
      showProgress: true,
      dragDrop: true,
      multiple: false,
      showDelete: true,
      showDownload: true,
      dragDropStr: "<span><b>拖拽文件到这里</b></span>",
      abortStr: '终止',
      cancelStr: '取消',
      deletelStr: '删除',
      doneStr: '成功',
      downloadStr: '下载',
      statusBarWidth: '100%',
      dragdropWidth: '100%',
      maxFileCount: 1
    });
    $(window).resize();
  }

  /**
   * 
   * @param {type} id
   * @param {type} width
   * @returns {undefined}
   */
  function initChartWidgetLayout(id, width) {
    var chartWidget = '<div class="dave-widget ' + width + '" id="' + id + '" data-widget-type="chart" data-widget-width="' + width + '">';
    chartWidget += '<div class="panel panel-default">';
    chartWidget += '<div class="panel-heading dave-header">';
    chartWidget += '<nav>';
    chartWidget += '<div class="container-fluid">';
    chartWidget += '<div class="navbar-header">';
    chartWidget += '<div class="panel-title">';
    chartWidget += '<i class="fa fa-photo" style="margin-right: 10px;"></i>';
    chartWidget += '<span></span>';
    chartWidget += '<div class="input-group" style="display: none">';
    chartWidget += '<input type="text" placeholder="图表名称...">';
    chartWidget += '<span class="input-group-addon">';
    chartWidget += '<i class="fa fa-pencil"></i>';
    chartWidget += '</span>';
    chartWidget += '</div>';
    chartWidget += '</div>';
    chartWidget += '</div>';
    chartWidget += '<ul class="nav navbar-nav pull-right">';
    chartWidget += '<li>';
    chartWidget += '<a href="javascript:void(0);" class="dave-hide">';
    chartWidget += '<i class="fa fa-minus"></i>';
    chartWidget += '</a>';
    chartWidget += '</li>';
    chartWidget += '<li style="display: none">';
    chartWidget += '<a href="javascript:void(0);" class="dave-expand">';
    chartWidget += '<i class="fa fa-plus"></i>';
    chartWidget += '</a>';
    chartWidget += '</li>';
    chartWidget += '<li>';
    chartWidget += '<a href="javascript:void(0);" class="dave-settings">';
    chartWidget += '<i class="fa fa-cog"></i>';
    chartWidget += '</a>';
    chartWidget += '</li>';
    chartWidget += '<li style="display: none">';
    chartWidget += '<a href="javascript:void(0);" class="dave-view">';
    chartWidget += '<i class="fa fa-eye"></i>';
    chartWidget += '</a>';
    chartWidget += '</li>';
    chartWidget += '<li>';
    chartWidget += '<a href="javascript:void(0);" class="dave-remove">';
    chartWidget += '<i class="fa fa-times"></i>';
    chartWidget += '</a>';
    chartWidget += '</li>';
    chartWidget += '</ul>';
    chartWidget += '</div>';
    chartWidget += '</nav>';
    chartWidget += '</div>';
    chartWidget += '<div class="dave-body panel-body">';
    chartWidget += getWidgetConfigOption('chart');
    chartWidget += '<div class="dave-content">';
    chartWidget += '<div class="row">';
    chartWidget += '<div class="col-md-12">';
    chartWidget += '<div class="widget-container"></div>';
    chartWidget += '</div>';
    chartWidget += '</div>';
    chartWidget += '</div>';
    chartWidget += '</div>';
    chartWidget += '</div>';
    chartWidget += '</div>';
    $('.content-wrapper').append(chartWidget);
    var $chartWidget = $('#' + id);
    $chartWidget.find('.select-width').val(width);
    $chartWidget.find('.kettle').uploadFile({
      url: 'api/widget/' + id + '/kettle/upload',
      allowedTypes: 'ktr',
      showProgress: true,
      dragDrop: true,
      multiple: false,
      showDelete: true,
      showDownload: true,
      dragDropStr: "<span><b>拖拽文件到这里</b></span>",
      abortStr: '终止',
      cancelStr: '取消',
      deletelStr: '删除',
      doneStr: '成功',
      downloadStr: '下载',
      statusBarWidth: '100%',
      dragdropWidth: '100%',
      maxFileCount: 1
    });
    $(window).resize();
  }

  /**
   * 
   * @param {type} opt chart or table
   * @returns {String}
   */
  function getWidgetConfigOption(opt) {
    var widget = '<div class="dave-config" style="display: none">';
    widget += '<div class="form-horizontal">';
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">宽度</label>';
    widget += '<div class="col-sm-10">';
    widget += '<select class="form-control select-width">';
    widget += '<option value="col-md-12" checked>1/1宽</option>';
    widget += '<option value="col-md-8">2/3宽</option>';
    widget += '<option value="col-md-6">1/2宽</option>';
    widget += '<option value="col-md-4">1/3宽</option>';
    widget += '</select>';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">描述</label>';
    widget += '<div class="col-sm-10">';
    widget += '<textarea cols="10" rows="2" class="form-control" data-label="description">';
    widget += '</textarea>';
    widget += '</div>';
    widget += '</div>';
    if ('chart' === opt) {
      widget += '<div class="form-group">';
      widget += '<label class="col-sm-2 control-label">类型</label>';
      widget += '<div class="col-sm-10">';
      widget += '<select class="form-control" data-label="type">';
      widget += '<option value="line" checked>直线图</option>';
      widget += '<option value="area">区域图</option>';
      widget += '<option value="bar">条形图</option>';
      widget += '<option value="pie">饼图</option>';
      //widget += '<option value="column">柱状图</option>';
      //widget += '<option value="spline">曲线图</option>';
      //widget += '<option value="areaspline">曲线区域图</option>';
      widget += '</select>';
      widget += '</div>';
      widget += '</div>';
    }
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">数据源</label>';
    widget += '<div class="col-sm-10">';
    widget += '<select class="form-control form-selector" data-label="datasource">';
    widget += '<option value="MySQL" checked>MySQL</option>';
    widget += '<option value="MSSQL">MSSQL</option>';
    widget += '<option value="Kettle">Kettle</option>';
    widget += '</select>';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group" style="display: none">';
    widget += '<label class="col-sm-2 control-label">文件</label>';
    widget += '<div class="col-sm-10">';
    widget += '<div class="kettle">上传文件</div>';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">主机名</label>';
    widget += '<div class="col-sm-10">';
    widget += '<input type="text" class="form-control" data-label="hostname" data-required="true">';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">端口号</label>';
    widget += '<div class="col-sm-10">';
    widget += '<input type="text" class="form-control" data-label="port" data-required="true">';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">用户名</label>';
    widget += '<div class="col-sm-10">';
    widget += '<input type="text" class="form-control" data-label="username" data-required="true">';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">密码</label>';
    widget += '<div class="col-sm-10">';
    widget += '<div class="input-group" style="width: 100%">';
    widget += '<input type="password" class="form-control" data-label="password" data-required="true">';
    widget += '<span class="input-group-btn">';
    widget += '<button class="btn btn-default show-passwd" type="button">';
    widget += '<i class="fa fa-eye"></i>';
    widget += '</button>';
    widget += '</span>';
    widget += '</div>';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group">';
    widget += '<label class="col-sm-2 control-label">SQL</label>';
    widget += '<div class="col-sm-10">';
    widget += '<textarea cols="10" rows="5" class="form-control" data-label="sql">';
    widget += '</textarea>';
    widget += '</div>';
    widget += '</div>';
    widget += '<div class="form-group">';
    widget += '<div class="pull-right" style="margin-right: 15px;">';
    widget += '<button class="btn btn-warning btn-cancel" style="margin-right: 10px">取消</button>';
    widget += '<button class="btn btn-primary btn-sure">确定</button>';
    widget += '</div>';
    widget += '</div>';
    widget += '</div>';
    widget += '</div>';
    return widget;
  }

  function showWidgetContent($daveWidget) {
    $daveWidget.find('.dave-config').hide();
    $daveWidget.find('.dave-content').show();
    $daveWidget.find('.dave-settings').parent().show();
    $daveWidget.find('.dave-table-filter').parent().show();
    $daveWidget.find('.dave-view').parent().hide();
    $daveWidget.find('.panel-title .input-group').hide();
    $daveWidget.find('.panel-title').children('span').show();
    $(window).resize();
  }

  function showWidgetConfig($daveWidget) {
    $daveWidget.find('.dave-config').show();
    $daveWidget.find('.dave-content').hide();
    $daveWidget.find('.dave-settings').parent().hide();
    $daveWidget.find('.dave-table-filter').parent().hide();
    $daveWidget.find('.dave-view').parent().show();
    $daveWidget.find('.panel-title').children('span').hide();
    $daveWidget.find('.panel-title .input-group').show();
  }

  function drawTableWidget(widgetId) {
    $.getJSON('api/widget/' + widgetId + '/config', function(json) {
      if (!json.isError) {
        drawTableWidgetData(json.data);
      }
    });
  }

  function drawChartWidget(widgetId) {
    $.getJSON('api/widget/' + widgetId + '/config', function(json) {
      if (!json.isError) {
        drawChartWidgetData(json.data);
      }
    });
  }

  function drawTableWidgetData(widgetData) {
    var $tableWidget = $('#' + widgetData.id);
    $tableWidget.find('.panel-title').children('span').html(widgetData.name);
    $tableWidget.find('.panel-title input').val(widgetData.name);
    for (var key in widgetData) {
      var value = widgetData[key];
      if ('datasource' === key) {
        showDataSourceOpt(value, $tableWidget);
      }
      $tableWidget.find('[data-label="' + key +'"]').val(value);
    }
    $.getJSON('api/widget/' + widgetData.id + '/data?path=' + getPath() + '&daterange=' + getDateRange(), function(json) {
      if (!json.isError) {
        var dt = json.data;
        drawTableData($tableWidget.find('.widget-container'), $tableWidget.find('.table-filter-menu'), dt);
      }
    });
  }

  function drawChartWidgetData(widgetData) {
    var $chartWidget = $('#' + widgetData.id);
    $chartWidget.find('.panel-title').children('span').html(widgetData.name);
    $chartWidget.find('.panel-title input').val(widgetData.name);
    for (var key in widgetData) {
      var value = widgetData[key];
      if ('datasource' === key) {
        showDataSourceOpt(value, $chartWidget);
      }
      $chartWidget.find('[data-label="' + key +'"]').val(value);
    }
    $.getJSON('api/widget/' + widgetData.id + '/data?path=' + getPath() + '&daterange=' + getDateRange(), function(json) {
      if (!json.isError) {
        drawChartData($chartWidget.find('.widget-container'), widgetData.type, json.data);
      }
    });
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

    var dom = '<thead>';
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
    initLayout();
    initComponent();
    initSelectPath();
    initDatePicker();
    initBackToTop();
    initWidgetsLayout();
  }

  function showDataSourceOpt(ds, $daveWidget) {
    if ('Kettle' === ds) {
      $daveWidget.find('.kettle').parents('.form-group').show();
      $daveWidget.find('[data-label="hostname"]').parents('.form-group').hide();
      $daveWidget.find('[data-label="port"]').parents('.form-group').hide();
      $daveWidget.find('[data-label="username"]').parents('.form-group').hide();
      $daveWidget.find('[data-label="password"]').parents('.form-group').hide();
      $daveWidget.find('[data-label="sql"]').parents('.form-group').hide();
    } else {
      $daveWidget.find('.kettle').parents('.form-group').hide();
      $daveWidget.find('[data-label="hostname"]').parents('.form-group').show();
      $daveWidget.find('[data-label="port"]').parents('.form-group').show();
      $daveWidget.find('[data-label="username"]').parents('.form-group').show();
      $daveWidget.find('[data-label="password"]').parents('.form-group').show();
      $daveWidget.find('[data-label="sql"]').parents('.form-group').show();
    }
  }

  function initLayout() {
    $('.ui-sortable').sortable({
      handle: '.dave-header'
    });

    $('.ui-sortable').on('mouseenter', '.dave-header', function() {
      $(this).css({
        cursor: 'move'
      });
      var $daveWidget = $(this).parents('.dave-widget');
      $daveWidget.css({
        border: '1px dashed #000'
      });
    }).on('mouseleave', '.dave-header', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      $daveWidget.css({
        border: '0px'
      });
    });

    $('.content-wrapper').on('change', '.form-selector', function() {
      var ds = $(this).val();
      var $daveWidget = $(this).parents('.dave-widget');
      showDataSourceOpt(ds, $daveWidget);
    });

    $('.content-wrapper').on('click', '.show-passwd', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      var $password = $daveWidget.find('[data-label="password"]');
      $password.attr('type', 'text');
      $(this).removeClass('show-passwd');
      $(this).addClass('hide-passwd');
      $(this).find('i').removeClass('fa-eye').addClass('fa-lock');
    });

    $('.content-wrapper').on('click', '.hide-passwd', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      var $password = $daveWidget.find('[data-label="password"]');
      $password.attr('type', 'password');
      $(this).removeClass('hide-passwd');
      $(this).addClass('show-passwd');
      $(this).find('i').removeClass('fa-lock').addClass('fa-eye');
    });

    $('.content-wrapper').on('change', '.select-width', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      var id = $daveWidget.attr('id');
      var width = $(this).val();
      $.post('api/dashboard/index/layout/' + id + '/update', {width: width}, function(json) {
        if (!json.isError) {
          $daveWidget.prop('class', 'dave-widget');
          $daveWidget.addClass(width);
          $daveWidget.attr('data-widget-width', width);
        }
      });
    });

    $('.content-wrapper').on('click', '.dave-settings', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      showWidgetConfig($daveWidget);
    });

    $('.content-wrapper').on('click', '.btn-cancel', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      showWidgetContent($daveWidget);
      if ('table' === $daveWidget.attr('data-widget-type')) {
        drawTableWidget($daveWidget.attr('id'));
      } else if ('chart' === $daveWidget.attr('data-widget-type')) {
        drawChartWidget($daveWidget.attr('id'));
      }
    });
    
    $('.content-wrapper').on('click', '.btn-sure', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      var widgetId = $daveWidget.attr('id');
      var data = {};
      $.each($daveWidget.find('[data-label]'), function() {
        var key = $(this).attr('data-label');
        var value = $(this).val();
        data[key] = value;
      });
      data.id = widgetId;
      data.name = $daveWidget.find('.panel-title').children('span').html();
      if ('table' === $daveWidget.attr('data-widget-type')) {
        $.post('api/widget/' + widgetId + '/table/update', {
          'widget': JSON.stringify(data),
          'path': getPath(),
          'daterange': getDateRange()
        }, function(json) {
          if (!json.isError) {
            drawTableData($daveWidget.find('.widget-container'), $daveWidget.find('.table-filter-menu'), json.data);
            showWidgetContent($daveWidget);
          }
        });
      } else if ('chart' === $daveWidget.attr('data-widget-type')) {
        $.post('api/widget/' + widgetId + '/chart/update', {
          'widget': JSON.stringify(data),
          'path': getPath(),
          'daterange': getDateRange()
        }, function(json) {
          if (!json.isError) {
            var type = $daveWidget.find('[data-label="type"]').val();
            drawChartData($daveWidget.find('.widget-container'), type, json.data);
            showWidgetContent($daveWidget);
          }
        });
      }
    });

    $('.content-wrapper').on('click', '.dave-view', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      var widgetId = $daveWidget.attr('id');
      var data = {};
      $.each($daveWidget.find('[data-label]'), function() {
        var key = $(this).attr('data-label');
        if ('type' !== key) {
          var value = $(this).val();
          data[key] = value;
        }
      });
      data.id = widgetId;
      data.name = $daveWidget.find('.panel-title').children('span').html();
      if ('table' === $daveWidget.attr('data-widget-type')) {
        $.getJSON('api/widget/data?path=' + getPath() + '&daterange=' + getDateRange(), {'widget': JSON.stringify(data)}, function(json) {
          if (!json.isError) {
            drawTableData($daveWidget.find('.widget-container'), $daveWidget.find('.table-filter-menu'), json.data);
            showWidgetContent($daveWidget);
          }
        });
      } else if ('chart' === $daveWidget.attr('data-widget-type')) {
        $.getJSON('api/widget/data?path=' + getPath() + '&daterange=' + getDateRange(), {'widget': JSON.stringify(data)}, function(json) {
          if (!json.isError) {
            var type = $daveWidget.find('[data-label="type"]').val();
            drawChartData($daveWidget.find('.widget-container'), type, json.data);
            showWidgetContent($daveWidget);
          }
        });
      }
    });

    $('.content-wrapper').on('click', '.dave-remove', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      var daveWidgetId = $daveWidget.attr('id');
      $.post('api/dashboard/index/widget/' + daveWidgetId + '/remove', function(json) {
        if (!json.isError) {
          $daveWidget.remove();
        }
      });
    });

    $('.content-wrapper').on('click', '.dave-hide', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      $daveWidget.find('.dave-body').hide();
      $daveWidget.find('.dave-hide').parent().hide();
      $daveWidget.find('.dave-expand').parent().show();
    });

    $('.content-wrapper').on('change', '.panel-title input', function() {
      var value = $(this).val();
      $(this).parent().siblings('span').html(value);
    });

    $('.content-wrapper').on('click', '.dave-expand', function() {
      var $daveWidget = $(this).parents('.dave-widget');
      $daveWidget.find('.dave-body').show();
      $daveWidget.find('.dave-expand').parent().hide();
      $daveWidget.find('.dave-hide').parent().show();
    });
  }

  function initComponent() {
    $('.dave-widget-table').on('click', function() {
      $.post('api/dashboard/index/widget/add', {type: 'table', width: 'col-md-12'}, function(json) {
        if (!json.isError) {
          var id = json.data;
          initTableWidgetLayout(id, 'col-md-12');
          var $widget = $('#' + id);
          showWidgetConfig($widget);
          $.scrollTo($widget, 800);
          $(window).resize();
        }
      });
    });
  
    $('.dave-widget-chart').on('click', function() {
      $.post('api/dashboard/index/widget/add', {type: 'chart', width: 'col-md-12'}, function(json) {
        if (!json.isError) {
          var id = json.data;
          initChartWidgetLayout(id, 'col-md-12');
          var $widget = $('#' + id);
          showWidgetConfig($widget);
          $.scrollTo($widget, 800);
          $(window).resize();
        }
      });
    });
  }

  function initPathRoot() {
    $.ajax({
      url: 'api/path/root',
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
      url: 'api/path/next',
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

  function initDatePicker() {
    $('#date-range span').html(moment().subtract('days', 7).format('YYYY/MM/DD')
        + ' - ' + moment().subtract('days', -1).format('YYYY/MM/DD'));
    $('#date-range').daterangepicker(
        {
          ranges: {
            '今日': [moment(), moment()],
            '昨日': [moment().subtract('days', 1), moment().subtract('days', 1)],
            '本周': [moment().subtract('days', 6), moment()],
            '本月': [moment().startOf('month'), moment().endOf('month')],
            '上个月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
          },
          opens: 'left',
          locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel: '起始日期',
            toLabel: '结束日期',
            weekLabel: 'W',
            customRangeLabel: '自定义日期范围',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            firstDay: 0
          },
          startDate: moment().subtract('days', 7),
          endDate: moment().subtract('days', -1),
          maxDate: moment().subtract('days', -1)
        },
        function(start, end) {
          $('#date-range span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
          initWidgetsLayout();
        }
    );
  }

  function initBackToTop() {
    var backToTop = $('<a>', {
      id: 'back-to-top',
      href: '#top',
      html: '<i class="fa fa-chevron-circle-up"></i>'
    });
    backToTop.appendTo('body');
    backToTop.hide();

    $(window).scroll(function() {
      if ($(this).scrollTop() > 150) {
        backToTop.fadeIn();
      } else {
        backToTop.fadeOut();
      }
    });

    backToTop.click(function(e) {
      e.preventDefault();

      $('body, html').animate({
        scrollTop: 0
      }, 600);
    });
  }

  function initWidgetsLayout() {
    $('.content-wrapper').empty();
    $.getJSON('api/dashboard/index/layout', function(json) {
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
});
