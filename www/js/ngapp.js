/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('sidarApp', ['ngResource','ngRoute', 'ngStorage','angular-loading-bar']);

app.config(function($locationProvider, $routeProvider,$compileProvider) {
	
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);

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
		domain : ''
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
	
	if (!$rootScope.globalWorks)
		$http.get('json/images.json')
	    .success(function(data, status, headers, config) {
	      $rootScope.globalWorks = data;
	    }).
	    error(function(data, status, headers, config) {
	      // log error
	    });
	    
	    /* // to get the real images --> right now origin problem occurs ! 
	     $http({
			url:'http://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*:*&wt=json&indent=true&start=0&fq=bundle:visual_communication&fq=sm_field_design_categories:%28%22taxonomy_term:208%22%29&fq=tm_designer_name:%28%22%D7%91%D7%95%D7%9C%D7%A7%D7%99%D7%94+%D7%A4%D7%99%D7%9C%D7%99%D7%A4%22%29',
			method: "GET",
			responseType:'json'
		})
		.then(function(data) {
	      	$rootScope.globalWorks = (data.response)? data.response.docs : [];
        }, function(data) {
        	console.log('global works', data.response || "Request failed");
      	});
	     * */
		
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
		if ($scope.state == 4 && !$rootScope.philosophy)
			$http.get('json/philosophy.json').
			    success(function(data, status, headers, config) {
			      $rootScope.philosophy = data;
			    }).
			    error(function(data, status, headers, config) {
			      // log error
			    });	    
	};
	
	
		initPageCss();
});



/**********************************************************************
 * DesignPage controller
 **********************************************************************/
app.controller('designPageCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	
	$scope.navigation = [{
		name : 'עיצוב אופנה',
		path : '#/designPage'
	}, {
		name : 'תקשורת חזותית',
		path : '#/designPage'
	}, {
		name : 'עיצוב תכשיטים',
		path : '#/designPage'
	}, {
		name : 'עיצוב תעשייתי',
		path : '#/designPage'
	}, {
		name : 'עיצוב טקסטיל',
		path : '#/designPage'
	}, {
		name : 'חיפוש',
		path : '#/designPage'
	}];
	
	$scope.changeState = function($index){
		if ( $scope.state == $index )
			$scope.state = -1;
		else $scope.state = $index;
	};
		
		
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

