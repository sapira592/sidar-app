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
		path : '#/'
	}, {
		name : 'תכנים חזותיים',
		path : '#/disciplines'
	}, {
		name : 'תכנים עיוניים',
		path : '#/'
	}, {
		name : 'אישי עזרה',
		path : '#/'
	}, {
		name : 'חיפוש',
		path : '#/'
	}];
	
	if (!$rootScope.globalWorks)
		$http.get('json/images.json').
		    success(function(data, status, headers, config) {
		      $rootScope.globalWorks = data;
		    }).
		    error(function(data, status, headers, config) {
		      // log error
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
	
	// $rootScope.$on('eventInfoBroadcast',function(event , data){
		// console.log(data);
		// $scope.event = data;
		// $location.url('/eventInfo');
	// });
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

