g_data = {};
g_currWork = '';
g_categories = {
	F : {
		color : "red",
		name : "אופנה"
	},
	G : {
		color : "blue",
		name : "גרפיקה"
	},
	I : {
		color : "yellow",
		name : "תעשייתי"
	},
	J : {
		color : "black",
		name : "תכשיטים"
	}
};

$(document).ready(function() {
	$.mobile.defaultPageTransition = "none";
	initPageCss();
	updateMainScreen();
	initStaticData();
});

$(window).resize(function() {
	initPageCss();
});

function initPageCss() {
	var container = $('.container').height() ;
	var nav = $('.navigation').height();
	
	$('[data-role=header]').css('width', window.innerWidth - 30 + "px");
	
	$('[data-role=header]').css('height', container + nav + "px !important");
	$("[data-role=content]").css("height", window.innerHeight - $('[data-role=header]').height()+ "px");


	var container = $('#workPage .container').height() ;
	var nav = $('#workPage .navigation').height();
	
	$('#workPage [data-role=header]').css('height', container + nav + "px !important");
	$("#workPage [data-role=content]").css("height", window.innerHeight-$('#workPage [data-role=header]').height() + "px");

	var imageWidth = $('.contentImg').width();
	$('.contentImg').css('height', imageWidth + "px");
	console.log($('.contentImg').width(),$('.contentImg').height())
}


$(window).on('hashchange', function(e) {
	// if (e.originalEvent.newURL.indexOf('#filterPage') != -1) {}

});

function updateMainScreen() {
	$.getJSON("json/images.json", function(data) {
		$.each(data, function(key, val) {
			var contentImg = $("<div>").addClass("contentImg").css({
				"backgroundImage" : "url('" + val.url + "')",
				"border" : "1px solid " + g_categories[val.id.split("-")[0]].color
			}).attr('data-id', val.id);
			$(".content").append(contentImg);
		});
		// var imageWidth = $('.contentImg').width();
		// $('.contentImg').css('height', imageWidth + "px");
		initPageCss();
	});
}

// listening to the document for click event to contentImage class and exec the async function
$(document).on('click', '.contentImg', function() {
	console.log($(this).attr('data-id'));
	g_currWork = $(this).attr('data-id');
	changePage('workPage');
});

function aboutUs() {

	$('#aboutPage .content').css("display", "none");
	$('#aboutPage #content article').remove();
	var article = $('<article>').addClass('textBox');
	/*val- the current object
	 key-index*/
	$.each(g_data.info, function(key, val) {
		var shenkar = $('<p>').addClass("textBox_title").html(val.title);
		var shenkar_content = $('<p>').addClass("textBox_content").html(val.content);
		article.append(shenkar).append(shenkar_content);
	});
	$('#aboutPage #content').append(article);
}


function display_data(text) {

	$('#aboutPage .content').css("display", "none");
	$('#aboutPage #content article').remove();
	var article = $('<article>').addClass('textBox');

	var shenkar_content = $('<ul>').addClass("textBox_content").addClass("list");
	$.each(g_data[text], function(key, val) {
		var li = $('<li>').html(val);
		shenkar_content.append(li);
	});
	article.append(shenkar_content);
	$('#aboutPage #content').append(article);

}


function events(text) {

	$('#aboutPage .content').css("display", "none");
	$('#aboutPage #content article').remove();
	var article = $('<article>').addClass('textBox');

	var shenkar_content = $('<ul>').addClass("textBox_content").addClass("list");
	$.each(g_data[text], function(key, val) {
		var li = $('<li>').html(val);
		shenkar_content.append(li);
	});
	article.append(shenkar_content);
	$('#aboutPage #content').append(article);

}

function initStaticData() {
	$.getJSON("json/data.json", function(data) {
		g_data = data;
	});
}

function changePage(page) {
	$.mobile.changePage("#" + page, {
		transition : "none",
		changeHash : true
	});
}
