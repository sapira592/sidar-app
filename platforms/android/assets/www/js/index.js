g_data = {};

$(document).ready(function() {
	$.mobile.defaultPageTransition="none";
	initPageCss();
	updateMainScreen();
	initStaticData();
});

$(window).resize(function() {
	initPageCss();
});

function initPageCss() {
	$("[data-role=content]").css("height", window.innerHeight-$('header').height() + "px");
	var imageWidth = $('.contentImg').width();
	$('.contentImg').css('height', imageWidth+"px");
	$('[data-role=header]').css('width', window.innerWidth-30 + "px");
	
}

$(window).on('hashchange', function(e) {
	// if (e.originalEvent.newURL.indexOf('#filterPage') != -1) {}

});


function updateMainScreen() {
	$.getJSON("json/images.json", function(data) {
		$.each(data, function(key, val) {
			var contentImg= $("<div>").addClass("contentImg").css("backgroundImage","url('"+val.url+"')").attr('data-id',new Date().getTime());
			$(".content").append(contentImg);
		});
		initPageCss();
	});
}



function aboutUs(){
	
	$('#aboutPage .content').css("display","none");
	$('#aboutPage #content article').remove();
	var article=$('<article>').addClass('textBox');
	/*val- the current object
  	key-index*/
	$.each(g_data.info, function(key, val) {
		var shenkar = $('<p>').addClass("textBox_title").html(val.title);
		var shenkar_content = $('<p>').addClass("textBox_content").html(val.content);
		article.append(shenkar).append(shenkar_content);
	});
	$('#aboutPage #content').append(article);
}



function goals(){
	
	$('#aboutPage .content').css("display", "none");
	$('#aboutPage #content article').remove();
	var article = $('<article>').addClass('textBox');

	var shenkar_content = $('<ul>').addClass("textBox_content").addClass("list");
	$.each(g_data.goals, function(key, val) {
		var li = $('<li>').html(val);
		shenkar_content.append(li);
	});
	article.append(shenkar_content);
 	$('#aboutPage #content').append(article);

}

function initStaticData(){
	$.getJSON("json/data.json", function(data) {
		g_data = data;
	}); 
}

