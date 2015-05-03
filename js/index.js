$(document).ready(function() {
	initPageCss();
});

$(window).resize(function() {
	initPageCss();
});

function initPageCss() {
	$("[data-role=content]").css("height", window.innerHeight-125 + "px");
	var imageWidth = $('.contentImg').width();
	$('.contentImg').css('height', imageWidth+"px");
	
}

$(window).on('hashchange', function(e) {
	// if (e.originalEvent.newURL.indexOf('#filterPage') != -1) {}

});

$(document).on("click", '[data-role=footer]', function(e) {

});





