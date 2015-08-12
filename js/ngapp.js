/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('sidarApp', ['ngResource','ngRoute', 'ngStorage','angular-loading-bar']);

app.config(function($locationProvider, $routeProvider) {

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
       .when('/events', {
        templateUrl: 'includes/events.html',
        controller: 'eventsCtrl'
      })
       .when('/eventInfo', {
        templateUrl: 'includes/eventInfo.html',
        controller: 'eventInfo'
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
	
});

/**********************************************************************
 * Index controller
 **********************************************************************/
app.controller('indexCtrl', function($scope, $rootScope, $http) {
	$scope.navigation = [{
		name : 'על המכון',
		path : '#/about'
	}, {
		name : 'תחומי עיצוב',
		path : '#/'
	}, {
		name : 'תכנים חזותיים',
		path : '#/'
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
	
	// if (!$rootScope.globalWorks)
		$.getJSON("json/images.json", function(data) {
			$rootScope.globalWorks = data;
		});
});

/**********************************************************************
 * About controller
 **********************************************************************/
app.controller('aboutCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	$scope.data;
	
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
		path : '#/events'
	}, {
		name : 'צור קשר',
		path : '#/about'
	}, {
		name : 'חיפוש',
		path : '#/about'
	}];
	
	$scope.changeState = function($index){
		$scope.state = $index;
	};
	
});

/**********************************************************************
 * Events controller
 **********************************************************************/
app.controller('eventsCtrl', function($scope, $rootScope, $http, $location) {
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
		path : '#/events'
	}, {
		name : 'צור קשר',
		path : '#/about'
	}, {
		name : 'חיפוש',
		path : '#/about'
	}];
	
	// if (!$scope.events)
		$.getJSON("json/events.json", function(data) {
			$scope.events = data;
		});
		
	$scope.displayEvent = function($index){
		console.log($index);
		var currEvent = $scope.events[$index];
		$scope.$broadcast('eventInfoBroadcast', currEvent);
	};
	
	
});

/**********************************************************************
 * EventInfo controller
 **********************************************************************/
app.controller('eventInfo', function($scope, $rootScope, $http, $location) {

	$scope.navigation = [{
		name : 'אירועים',
		path : '#/events'
	}, {
		name : 'חיפוש',
		path : '#/eventInfo'
	}];
	
	scope.$on('eventInfoBroadcast',function(event, data){
		console.log(data);
		$scope.event = data;
		$location.url('/eventInfo');
	});
	
});