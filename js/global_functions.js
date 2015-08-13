function initPageCss() {
	// $('[data-role=header]').css('width', window.innerWidth - 30 + "px");

	var pages = $('[data-role=page]');
	$.each(pages, function(key, val) {
		var page = '#' + $(val).attr('id');

		var container = $(page + ' .container').height();
		var nav = $(page + ' .navigation').height();

		$('[data-role=header]').css('height', container + nav + "px !important");
		$("[data-role=content]").css("height", window.innerHeight - $('[data-role=header]').height() + "px");

	});

	var imageWidth = $('.contentImg').width();
	$('.contentImg').css('height', imageWidth + "px");
}