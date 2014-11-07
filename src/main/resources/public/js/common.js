/*---LEFT BAR ACCORDION----*/
$(function() {
  $('#nav-accordion').dcAccordion({
    eventType: 'click',
    autoClose: true,
    saveState: true,
    disableLink: true,
    speed: 'slow',
    showCount: false,
    autoExpand: true,
    classExpand: 'dcjq-current-parent'
  });
});

var Script = function() {
  // sidebar dropdown menu auto scrolling
  jQuery('#sidebar .sub-menu > a').click(function() {
    var o = ($(this).offset());
    diff = 250 - o.top;
    if (diff > 0)
      $("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
    else
      $("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
  });

  $(function() {
    function responsiveView() {
      var wSize = $(window).width();
      if (wSize <= 768) {
        $('#container').addClass('sidebar-close');
        $('#sidebar > ul').hide();
      }

      if (wSize > 768) {
        $('#container').removeClass('sidebar-close');
        $('#sidebar > ul').show();
      }
    }
    $(window).on('load', responsiveView);
    $(window).on('resize', responsiveView);
  });

  $('.fa-bars').click(function() {
    if ($('#sidebar').is(":visible") === true) {
      $('#main-content').css({
        'margin-left': '0px'
      });
      $('#sidebar').css({
        'margin-left': '-210px'
      });
      $('#sidebar').hide();
      $("#container").addClass("sidebar-closed");
      $('.header').removeData('pin');
      $('.nav-wrapper').pin();
      var width = $('.nav-wrapper').width();
      $('.nav-wrapper').width(width + 210);
      $(window).resize();
    } else {
      $('#main-content').css({
        'margin-left': '210px'
      });
      $('#sidebar').show();
      $('#sidebar').css({
        'margin-left': '0'
      });
      $("#container").removeClass("sidebar-closed");
      $('.nav-wrapper').removeData('pin');
      var width = $('.nav-wrapper').width();
      $('.nav-wrapper').width(width - 210);
      $('.header').pin();
      $(window).resize();
    }
  });

  $('.tooltips').tooltip();
  $('.popovers').popover();
}();