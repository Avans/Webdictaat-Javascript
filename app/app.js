var app = angular.module("myApp", []);

app.factory('PointFactory', function($http){
	
	var pointFactory = {};

	pointFactory.getPoints = function(options){

		console.log(window.localStorage['token']);

		$http.get('https://pointypony.herokuapp.com/Points?token=' + window.localStorage['token'])
			.success(function(data, status, headers, config){
				if(data)
					options.success(data);
				else
					options.error(status);
			});
	};

	return pointFactory;
});

app.controller("LeaderboardController", ["$scope", "$http", "PointFactory", function($scope, $http, PointFactory){

	$scope.isLoggedIn = false;
	$scope.username = "";
	$scope.points = "";
	$scope.leaderboard = [];

	PointFactory.getPoints({
		success: function(points){
			$scope.username = points.username;
			$scope.points = points.points;
			$scope.isLoggedIn = true;
		}
	});



	$http.get('https://pointypony.herokuapp.com/Leaderboards?token=' + window.localStorage['token'])
		.success(function(data, status){
			$scope.leaderboard = data;
			console.log(data);
	});
}]);