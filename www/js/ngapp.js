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
      .when('/eventInfo', {
        templateUrl: 'includes/eventInfo.html',
        controller: 'eventInfoCtrl'
      })
      .when('/disciplines', {
        templateUrl: 'includes/disciplines.html',
        controller: 'disciplinesCtrl'
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
		path : '#/disciplines'
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
	
	if (!$rootScope.globalWorks)
		$.getJSON("json/images.json", function(data) {
			$rootScope.globalWorks = data;
		});
});

/**********************************************************************
 * About controller
 **********************************************************************/
app.controller('aboutCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	
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
		$scope.state = $index;
		
		if ($index == 3 && !$scope.events){
			$.getJSON("json/events.json", function(data) {
				$scope.events = data;
			});
		}
	};
		
	$scope.displayEvent = function($index){
		var currEvent = $scope.events[$index];
		console.log(currEvent)
		//$rootScope.$broadcast('eventInfoBroadcast', currEvent);
	};
});


/**********************************************************************
 * EventInfo controller
 **********************************************************************/
app.controller('eventInfoCtrl', function($scope, $rootScope, $http, $location) {

	$scope.navigation = [{
		name : 'אירועים',
		path : '#/events'
	}, {
		name : 'חיפוש',
		path : '#/eventInfo'
	}];
	
	$rootScope.$on('eventInfoBroadcast',function(event , data){
		console.log(data);
		$scope.event = data;
		$location.url('/eventInfo');
	});
	
});


/**********************************************************************
 * Disciplines controller
 **********************************************************************/
app.controller('disciplinesCtrl', function($scope, $rootScope, $http) {
	$scope.state;
	
	$scope.navigation = [{
		name : 'מעצבים',
		path : '#/'
	}, {
		name : 'קטגוריות',
		path : '#/'
	}, {
		name : 'נושאים',
		path : '#/'
	}, {
		name : 'שנים',
		path : '#/'
	}, {
		name : 'תערוכות',
		path : '#/'
	}, {
		name : 'חיפוש',
		path : '#/'
	}];
	
	$scope.changeState = function($index){
		$scope.state = $index;
	};
		

});
