$(document).ready(function() {
	initPageCss();
});

$(window).resize(function() {
	initPageCss();
});

function initPageCss() {
	console.log("page-size ",window.innerHeight);
	$("[data-role=content]").css("height", window.innerHeight+ "px");
}

$(window).on('hashchange', function(e) {
	// if (e.originalEvent.newURL.indexOf('#filterPage') != -1) {}

});

$(document).on("click", '[data-role=footer]', function(e) {

});





