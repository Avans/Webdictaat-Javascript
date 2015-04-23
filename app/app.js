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