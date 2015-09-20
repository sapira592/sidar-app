/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('sidarApp', ['ngResource','ngRoute', 'ngStorage','angular-loading-bar']);

app.config(function($locationProvider, $routeProvider,$compileProvider) {
	
    //$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
    //$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);

// define each "html" (by url) page his own controller
	
	$routeProvider
      .when('/', {
        defaultRoute:true,
        templateUrl: 'includes/index.html',
        controller: 'indexCtrl'
       })
      .when('/about', {
        templateUrl: 'includes/about.html',
        controller: 'aboutCtrl'
      })
      .when('/eventInfo', {
        templateUrl: 'includes/eventInfo.html',
        controller: 'eventInfoCtrl'
      })
      .when('/work', {
        templateUrl: 'includes/work.html',
        controller: 'workCtrl'
      })
      .when('/designer', {
        templateUrl: 'includes/designer.html',
        controller: 'designerCtrl'
      })
      .when('/disciplines', {
        templateUrl: 'includes/disciplines.html',
        controller: 'disciplinesCtrl'
      })
      .when('/exhibitions', {
        templateUrl: 'includes/exhibitions.html',
        controller: 'exhibitionsCtrl'
      })
      .when('/theoreticals', {
        templateUrl: 'includes/theoreticals.html',
        controller: 'theoreticalsCtrl'
      })
      .when('/designPage', {
        templateUrl: 'includes/designPage.html',
        controller: 'designPageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});


app.run(function($rootScope, $window, $http, $localStorage, $location) {
	$location.url('/temp');
	 
	$rootScope.app = {
		name : 'Sidar',
		domain :  (document.domain == 'localhost')?'http://localhost/opensolar/sidarMobileApp.php':'http://192.116.128.64/newsite/sidarMobileApp.php/'
	};

	$.getJSON("json/data.json", function(data) {
		$rootScope.data = data;
	});

	$rootScope.categories = {
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
	document.addEventListener("deviceready", function(){
        window.confirm = function ( message ,confirmDismissed ){
        	navigator.notification.confirm(
            message,
            confirmDismissed,
            'Sidar',  
            'OK,Cancel'
        	);
        };
	}, false);
	
	$window.onresize = function() {
		initPageCss();
	};
	initPageCss();
});

/**********************************************************************
 * Index controller
 **********************************************************************/
app.controller('indexCtrl', function($scope, $rootScope, $http, $location) {
	$scope.navigation = [{
		name : 'על המכון',
		path : '#/about'
	}, {
		name : 'תחומי עיצוב',
		path : '#/designPage'
	}, {
		name : 'תכנים חזותיים',
		path : '#/disciplines'
	}, {
		name : 'תכנים עיוניים',
		path : '#/theoreticals'
	}, {
		name : 'אישי עזרה',
		path : '#/'
	}, {
		name : 'חיפוש',
		path : '#/'
	}];
	
	// if (!$rootScope.globalWorks)
		// $http.get('json/images.json')
	    // .success(function(data, status, headers, config) {
	      // $rootScope.globalWorks = data;
	    // }).
	    // error(function(data, status, headers, config) {
	      // // log error
	    // });
	    
 //plugin add https://github.com/apache/cordova-plugin-whitelist.git
		if (!$rootScope.globalWorks)
			$http.get($rootScope.app.domain+ '?func=getIndexImages')
		      .success(function(res){
		        	var arr = JSON.parse(res.data).response.docs;
		        	arr.forEach(function(val,key){
		        		if (val.bs_has_image){
							val.newImage = val.sm_field_image[1].replace("'medium':","");
						}
						else val.newImage = 'http://online.shenkar.ac.il/moodle/file.php?file=%2F1%2Flogoshadow1.gif'; 
		        	});
		        	console.log('data',arr);
		        	$rootScope.globalWorks = arr;
		      })
			 .error(function(err){
			 	console.log('error',err);
			 });
		
	$rootScope.getWorkFromGlobalWorks = function($index){
		console.log($rootScope.globalWorks[$index]);
		$rootScope.currWork = $rootScope.globalWorks[$index];
		$location.url('/work');
	};
	
	initPageCss();
});

/**********************************************************************
 * About controller
 **********************************************************************/

// In AngularJS, $scope is the application object (the owner of application variables and functions). 
app.controller('aboutCtrl', function($scope, $rootScope, $http) {
	
	if (!$scope.data)
	$.getJSON("json/events.json", function(data) {
		$scope.data = data;
	});
	
	$scope.navigation = [{
		name : 'אודותינו',
		path : '#/about'
	}, {
		name : 'מטרות המכון',
		path : '#/about'
	}, {
		name : 'הודעות',
		path : '#/about'
	}, {
		name : 'אירועים',
		path : '#/about'
	}, {
		name : 'צור קשר',
		path : '#/about'
	}, {
		name : 'חיפוש',
		path : '#/about'
	}];
	
	$scope.changeState = function($index){
		if ( $scope.state == $index )
			$scope.state = -1;
		else $scope.state = $index;
		
		if ($scope.state == 3 && !$rootScope.events)
			$http.get('json/events.json').
			    success(function(data, status, headers, config) {
			      $rootScope.events = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });
	};
		
	$scope.displayEvent = function($index){
		var currEvent = $rootScope.events[$index];
		console.log(currEvent);
		$rootScope.currEvent = currEvent;
		//$rootScope.$broadcast('eventInfoBroadcast', currEvent);
	};
	
	initPageCss();
});


/**********************************************************************
 * EventInfo controller
 **********************************************************************/
app.controller('eventInfoCtrl', function($scope, $rootScope, $http, $location) {

	$scope.navigation = [{
		name : 'אירועים',
		path : '#/about'
	}, {
		name : 'חיפוש',
		path : '#/eventInfo'
	}];
	
	// $rootScope.$on('eventInfoBroadcast',function(event , data){
		// console.log(data);
		// $scope.event = data;
		// $location.url('/eventInfo');
	// });
	
	initPageCss();
});


/**********************************************************************
 * Disciplines controller
 **********************************************************************/
app.controller('disciplinesCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	
	if (!$scope.data)
	$.getJSON("json/exhibitions.json", function(data) {
		$scope.data = data;
	});
	
	
	$scope.navigation = [{
		name : 'מעצבים',
		path : '#/disciplines'
	}, {
		name : 'קטגוריות',
		path : '#/disciplines'
	}, {
		name : 'נושאים',
		path : '#/disciplines'
	}, {
		name : 'שנים',
		path : '#/disciplines'
	}, {
		name : 'תערוכות',
		path : '#/disciplines'
	}, {
		name : 'חיפוש',
		path : '#/disciplines'
	}];
	
	$scope.changeState = function($index){
		if ( $scope.state == $index )
			$scope.state = -1;
		else $scope.state = $index;
		
		if ($scope.state == 4 && !$rootScope.exhibitions)
			$http.get('json/exhibitions.json').
			    success(function(data, status, headers, config) {
			      $rootScope.exhibitions = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });
	};
		
	$scope.displayExhibition = function($index){
		console.log($index);
		var currExh = $rootScope.exhibitions[$index];
		console.log(currExh);
		$rootScope.currExh = currExh;
		//$rootScope.$broadcast('eventInfoBroadcast', currEvent);
	};
		
	initPageCss();
});

/**********************************************************************
 * Theoreticals controller
 **********************************************************************/
app.controller('theoreticalsCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	

	$scope.navigation = [{
		name : 'אתרים',
		path : '#/theoreticals'
	}, {
		name : 'כתבות',
		path : '#/theoreticals'
	}, {
		name : 'מאמרים',
		path : '#/theoreticals'
	}, {
		name : 'קורות חיים',
		path : '#/theoreticals'
	}, {
		name : 'פילוסופיות',
		path : '#/theoreticals'
	}, {
		name : 'חיפוש',
		path : '#/theoreticals'
	}];
	
	$scope.changeState = function($index){
		if ( $scope.state == $index )
			$scope.state = -1;
		else $scope.state = $index;
		
		if ($scope.state == 0 && !$rootScope.sites)
			$http.get('json/sites.json').
			    success(function(data, status, headers, config) {
			      $rootScope.sites = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });
		if ($scope.state == 1 && !$rootScope.reports)
			$http.get('json/reports.json').
			    success(function(data, status, headers, config) {
			      $rootScope.reports = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });
		if ($scope.state == 2 && !$rootScope.articles)
			$http.get('json/articles.json').
			    success(function(data, status, headers, config) {
			      $rootScope.articles = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });
		if ($scope.state == 3 && !$rootScope.resume)
			$http.get('json/resume.json').
			    success(function(data, status, headers, config) {
			      $rootScope.resume = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });
		if ($scope.state == 4 && !$rootScope.philosophy)
			$http.get('json/philosophy.json').
			    success(function(data, status, headers, config) {
			      $rootScope.philosophy = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });	    
	};
	
	
	$scope.displaySite = function(site){
		//{{site.urlSite}}
		window.open(site.urlSite, '_blank');
		
	};
	
	$scope.displayPdf = function(pd){
		window.confirm("Do you want to save the PDF?",function(r){
			if (r == true) {
		    var ref = window.open(pd.urlInfo, '_system', 'location=yes');
		    console.log('pdf viewer');
			// setTimeout(function() {
	             // ref.close();
	         // }, 1000);
			} else {
				console.log('pdf cancel');
			    return;
			}
		});
	};
	
		initPageCss();
});



/**********************************************************************
 * DesignPage controller
 **********************************************************************/
app.controller('designPageCtrl', function($scope, $rootScope, $http) {
	// $scope.state;
	
	$scope.navigation = [{
		name : 'עיצוב אופנה',
		path : '#/designPage',
		cat:"Fashion"
	}, {
		name : 'תקשורת חזותית',
		path : '#/designPage',
		cat: "Visual"
	}, {
		name : 'עיצוב תכשיטים',
		path : '#/designPage',
		cat:"Jewelry"
	}, {
		name : 'עיצוב תעשייתי',
		path : '#/designPage',
		cat: "Industrial"
	}, {
		name : 'עיצוב טקסטיל',
		path : '#/designPage'
	}, {
		name : 'חיפוש',
		path : '#/designPage'
	}];
	
	$scope.changeState = function($index,name){
		if ( $scope.state == $index )
			$scope.state = -1;
		else $scope.state = $index;

		
		$http.get($rootScope.app.domain+ '?func=get'+name+'Images')
	      .success(function(res){
	        	var arr = JSON.parse(res.data).response.docs;
	        	arr.forEach(function(val,key){
	        		if (val.bs_has_image){
						val.newImage = val.sm_field_image[1].replace("'medium':","");
					}
					else val.newImage = 'http://online.shenkar.ac.il/moodle/file.php?file=%2F1%2Flogoshadow1.gif'; 
	        	});
	        	console.log('data',arr);
	        	$scope.designImages = arr;
	        		
	      })
		 .error(function(err){
		 	console.log('error',err);
		 });
		
		
	};
	
	// get the data from "design.json", and using the information in "designPage.html"
	
	
	$scope.init = function(){
		$http.get('json/design.json').
	    success(function(data, status, headers, config) {
	      $rootScope.design = data;
	    }).
	    error(function(data, status, headers, config) {
	      // log error
	    });	
	};
	$scope.init();
	
	initPageCss();
});

	


/**********************************************************************
 * Exhibitions controller
 **********************************************************************/
app.controller('exhibitionsCtrl', function($scope, $rootScope, $http, $location) {

	$scope.navigation = [{
		name : 'תערוכות',
		path : '#/disciplines'
	}, {
		name : 'חיפוש',
		path : '#/exhibitions'
	}];
	
	$scope.changeState = function($index){
		$scope.state = $index;
	};
	initPageCss();
});

/**********************************************************************
 * Work controller
 **********************************************************************/
app.controller('workCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	
	$scope.navigation = [{
		name : 'דיסיפלינה',
		path : '#/work'
	}, {
		name : 'חיפוש',
		path : '#/work'
	}];
	
	$scope.changeState = function($index){
		$scope.state = $index;
	};
	initPageCss();
});

/**********************************************************************
 * Designer controller
 **********************************************************************/
app.controller('designerCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	
	$scope.navigation = [{
		name : 'דיסיפלינה',
		path : '#/designer'
	}, {
		name : 'חיפוש',
		path : '#/designer'
	}];
	
	$scope.changeState = function($index){
		$scope.state = $index;
	};
	initPageCss();	
});

