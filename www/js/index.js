$(document).ready(function() {
	initPageCss();
});

$(window).resize(function() {
	initPageCss();
});

function initPageCss() {
	$("[data-role=content]").css("height", window.innerHeight-125 + "px");
	var imageWidth = $('.contentImg').width();
	var imageHeight = $('.contentImg').height();
	$('.contentImg').css('height', imageWidth+"px");
	$('[data-role=header]').css('width', window.innerWidth-30 + "px");
	
}

$(window).on('hashchange', function(e) {
	// if (e.originalEvent.newURL.indexOf('#filterPage') != -1) {}

});

$(document).on("click", '[data-role=footer]', function(e) {

});





