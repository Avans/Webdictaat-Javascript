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

app.directive('myDailyQuest', function() {
  return {
  	restrict: 'E',
    templateUrl: 'dailyQuest/quest.html',
    controller: function($scope){

    	$scope.question = "What is 1 + 1?";
    	$scope.answers = [
    		{char: 'A', value: 2, correct: true },
    		{char: 'B', value: 5, correct: false },
    		{char: 'C', value: 8, correct: false },
    		{char: 'D', value: 3, correct: false }
    	];
    	$scope.correctAnswer = 5;

    	$scope.submitAnswer = function(answer){
    		if(answer == $scope.correctAnswer){

    		}
    	}	
    }
  };
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