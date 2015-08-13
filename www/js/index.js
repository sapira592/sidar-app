g_data = {};
g_currWork = '';
g_currIndex = '';
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
	
	$('[data-role=header]').css('width', window.innerWidth - 30 + "px");
	
	var pages = $('[data-role=page]');
	$.each(pages,function (key ,val){
		var page = '#'+$(val).attr('id');
		
		var container = $(page+' .container').height() ;
		var nav = $(page+' .navigation').height();
	
		$('[data-role=header]').css('height', container + nav + "px !important");
		$("[data-role=content]").css("height", window.innerHeight - $('[data-role=header]').height()+ "px");
	
	});
	


	var imageWidth = $('.contentImg').width();
	$('.contentImg').css('height', imageWidth + "px");
	// console.log($('.contentImg').width(),$('.contentImg').height())
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
			}).attr('data-index', val.index);
			
			$(".content").append(contentImg);
		});
		// var imageWidth = $('.contentImg').width();
		// $('.contentImg').css('height', imageWidth + "px");
		initPageCss();
	});
}

// listening to the document for click event to contentImage class and exec the async function
/*
$(document).on('click', '.contentImg', function() {
	console.log($(this).attr('data-id'));
	g_currWork = $(this).attr('data-id');
	changePage('workPage');
});
*/


$(document).on('click', '.contentImg', function() {
	console.log($(this).attr('data-index'));
	g_currIndex = $(this).attr('data-index');
	if(g_currIndex == "1")
		changePageImg('workPage');
	else{
		changePageEvent('eventWorkPage',$(this));
	}
		
});


function aboutUs() {

	var article = $('<article>').addClass('textBox');
	$('#aboutPage .content').css("display", "none");
	$('#aboutPage #content article').remove();
	
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


function globalEvents() {
	var article = $('<div>').addClass("content").addClass("four_columns");
	$.getJSON("json/events.json", function(data) {
		console.log(data);
		$.each(data.events, function(key, val) {
			var contentImg = $("<div>").addClass("contentImg").css({
				"backgroundImage" : "url('" + val.url + "')",
				"border" : "1px solid " 
			}).attr('data-id', val.id);
			article.append(contentImg);
		});
		$('#eventsPage #content').html('');
	$('#eventsPage #content').append(article);
	
});
}


function initStaticData() {
	$.getJSON("json/data.json", function(data) {
		g_data = data;
	});
}


function changePageImg(page) {
	$.mobile.changePage("#" + page, {
		transition : "none",
		changeHash : true
	});
}


function changePageEvent(page,text) {
	$.mobile.changePage("#" + page, {
		transition : "none",
		changeHash : true
	});
	display_dataEvents(text);
}


function display_dataEvents(text){
	$('#eventWorkPage .content').css("display", "none");
	$('#eventWorkPage #content article').remove();
	var article = $('<article>').addClass('textBox');
	var shenkar_content;
	
	$.getJSON("json/events.json", function(data){
		console.log(data);
		$.each(data.events, function(key, val) {
			if(val.id == '2'){
				var shenkar_content = $('<ul>').addClass("textBox_content").addClass("list");
				var li = $('<li>').html(val);
				shenkar_content.append(li);
				console.log(shenkar_content);
			}
			
		})
	
	});
		
	article.append(shenkar_content);
	$('#eventWorkPage #content').append(article);
		
}
