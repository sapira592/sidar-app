function initPageCss() {
	// $('[data-role=header]').css('width', window.innerWidth - 30 + "px");

	var pages = $('[data-role=page]');
	$.each(pages, function(key, val) {
		var page = '#' + $(val).attr('id');

		var container = $(page + ' .container').height();
		var nav = $(page + ' .navigation').height();

		// $('[data-role=header]').css('height', container + nav + "px !important");
		$("[data-role=content]").css("top", $('[data-role=header]').height() + "px");
		// $("[data-role=content]").css("top", $('[data-role=header]').height() + "px");

	});

	var imageWidth = $('.contentImg').width();
	$('.contentImg').css('height', imageWidth + "px");
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

// enableScroll();
// disableScroll();