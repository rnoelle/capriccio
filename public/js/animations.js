$(window).scroll(function () {
  var eTop = $(this).scrollTop();
  var wTop = $(window).height();
  if (eTop > $('.three-box-three').offset().top - ($(window).height()/1.5)) {
    $('.three-box').removeClass('hidden-left hidden-right hidden-fade');
    $('.three-arrow').removeClass('hidden-left hidden-right');
    }
  if ($('#slide-in').offset().left > ($(window).width()/1.7)) {
    $('#slide-in').css({
        'transform': 'translate(-'+ eTop /25 +'%, 0px)'
      });
    }
  }
)
