$(document).ready(function() {
	initPageCss();
	updateMainScreen();
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


function updateMainScreen() {
	$.getJSON("json/images.json", function(data) {
		$.each(data, function(key, val) {
			var contentImg= $("<div>").addClass("contentImg").css("backgroundImage","url('"+val.url+"')");
			$(".content").append(contentImg);
		});
		initPageCss();
	});
}







