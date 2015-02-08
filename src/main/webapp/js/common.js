$.fn.extend({
  initDateRangePicker: function () {
    var $drp = $(this);
    var $elem = $drp.find('span');
    $elem.text(moment().subtract('days', 7).format('YYYY/MM/DD')
        + ' - ' + moment().subtract('days', -1).format('YYYY/MM/DD'));
    $drp.daterangepicker(
        {
          opens: 'left',
          locale: {
            applyLabel: '&#x786e;&#x8ba4;',
            cancelLabel: '&#x53d6;&#x6d88;',
            fromLabel: '&#x8d77;&#x59cb;&#x65e5;&#x671f;',
            toLabel: '&#x7ed3;&#x675f;&#x65e5;&#x671f;',
            weekLabel: 'W',
            customRangeLabel: '&#x81ea;&#x5b9a;&#x4e49;&#x65e5;&#x671f;&#x8303;&#x56f4;',
            daysOfWeek: ['&#x65e5;', '&#x4e00;', '&#x4e8c;', '&#x4e09;', '&#x56db;', '&#x4e94;', '&#x516d;'],
            monthNames: ['1&#x6708;', '2&#x6708;', '3&#x6708;', '4&#x6708;', '5&#x6708;', '6&#x6708;', '7&#x6708;', '8&#x6708;', '9&#x6708;', '10&#x6708;', '11&#x6708;', '12&#x6708;'],
            firstDay: 0
          },
          startDate: moment().subtract('days', 7),
          endDate: moment().subtract('days', -1),
          maxDate: moment().subtract('days', -1)
        },
    function (start, end) {
      $elem.text(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD')).trigger('change');
    });
  },
  initBackToTop: function () {
    var backToTop = $('<a>', {
      id: 'back-to-top',
      href: '#top',
      html: '<i class="fa fa-chevron-circle-up"></i>'
    });
    backToTop.appendTo('body');
    backToTop.hide();

    $(window).scroll(function () {
      if ($(this).scrollTop() > 150) {
        backToTop.fadeIn();
      } else {
        backToTop.fadeOut();
      }
    });

    backToTop.click(function (e) {
      e.preventDefault();

      $('body, html').animate({
        scrollTop: 0
      }, 600);
    });
  },
  drawTable: function() {
    
  },
  drawPieChart: function() {
    
  },
  drawLineChart: function() {
    
  },
  drawAreaChart: function() {
    
  },
  drawBarChart: function() {
    
  }
});