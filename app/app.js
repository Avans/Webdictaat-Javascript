var app = angular.module("myApp", []);

BASE_URL = 'https://pointypony.herokuapp.com';

app.factory('UserFactory', function($http){
	var userFactory = {};

	userFactory.fetchInfo = function(options){
		$http.get(BASE_URL + '/Points?token=' + window.localStorage['token'])
			.success(function(data, status, headers, config){
				if(data)
					options.success(data);
				else
					options.error(status);
			});
	};

	userFactory.user = {
		isLoggedIn: false,
		username: 'Paul',
		points: 5
	};

	userFactory.login = function() {
		window.location.assign(BASE_URL + '/auth/avans');
	};

	userFactory.logout = function() {
		window.localStorage.removeItem('token');
		userFactory.user.isLoggedIn = false;
	};

	return userFactory;
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

app.controller("UserController", ["$scope", "$http", "UserFactory", function($scope, $http, UserFactory){
	$scope.user = UserFactory.user;

	$scope.login = function() {
		UserFactory.login();
	};

	$scope.logout = function() {
		UserFactory.logout();
	};

	UserFactory.fetchInfo({
		success: function(userInfo) {
			if(userInfo.username) {
				$scope.user.isLoggedIn = true;
				$scope.user.username = userInfo.username;
				$scope.user.points = userInfo.points;
			}
		}
	});

}]);

app.controller("LeaderboardController", ["$scope", "$http", "UserFactory", function($scope, $http, UserFactory){
	$scope.leaderboard = [];
	$scope.user = UserFactory.user;

	$scope.login = function() {
		UserFactory.login();
	};

	$http.get(BASE_URL + '/Leaderboards?token=' + window.localStorage['token'])
		.success(function(data, status){
			console.log(data);
			$scope.leaderboard = data;
	});
}]);