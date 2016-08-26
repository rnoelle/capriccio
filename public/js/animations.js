$(window).scroll(function () {
  var eTop = $(this).scrollTop();
  var wTop = $(window).height();
  if (eTop > $('.three-box-three').offset().top - ($(window).height()/1.5)) {
    $('.three-box').removeClass('hidden-left hidden-right hidden-fade');
    $('.three-arrow').removeClass('hidden-left hidden-right');
    }
    console.log($('#slide-in').offset().left);
  if ($('#slide-in').offset().left > ($(window).width()/1.7)) {
    console.log('yup');
    $('#slide-in').css({
        'transform': 'translate(-'+ eTop /20 +'%, 0px)'
      });
    }
  }
)
