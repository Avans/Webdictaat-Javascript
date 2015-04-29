var app = angular.module("myApp", ["ui.router"]);


BASE_URL = 'https://pointypony.herokuapp.com';

//Comentaar toevoegen

app.config(function($stateProvider, $httpProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'home.html'
    })
    .state('token', {
        url: '/token={token:.+}',
        controller: function($state, $stateParams, UserFactory) {
            window.localStorage['token'] = $stateParams.token;
            $state.go('home');
            UserFactory.fetchInfo();
        }
    })
    .state('page', {
        url: '/{url:.+}',
        template: '<div ng-include="url" updatelinks></div>',
        controller: function($scope, $stateParams) {
            $scope.url = $stateParams.url;
        }
    });
});

app.directive('updatelinks', function($compile) {
    return {
        link: function(scope, element) {
            var links = element.find('a').each(function(a) {
                var href = $(this).attr('href');
                if(!$(this).hasClass('no_ajax') && !href.startsWith('http')) {
                    $(this).attr('href', '#/'+href);
                }
            });

            if(scope.url) {
                var dirname = scope.url.substring(0, scope.url.lastIndexOf('/'));

                element.find('img').each(function() {
                   $(this).attr('src', dirname + '/' + $(this).attr('src'));
                });
            }

        }
    };
});


app.factory('UserFactory', function($http){
	var userFactory = {};

	userFactory.fetchInfo = function(){
		$http.get(BASE_URL + '/Points?token=' + window.localStorage['token'])
    		.success(function(data, status, headers, config){
    			if(data.username) {
                    userFactory.user.isLoggedIn = true;
                    userFactory.user.username = data.username;
                    userFactory.user.points = data.points;
                }
            });
	};

	userFactory.user = {
		isLoggedIn: false,
		username: '',
		points: 0
	};

	userFactory.login = function() {
		window.location.assign(BASE_URL + '/auth/avans?returnUrl=' + window.location);
	};

	userFactory.logout = function() {
		window.localStorage.removeItem('token');
		userFactory.user.isLoggedIn = false;
	};

	userFactory.completeAssignment = function(assignmentId, points) {
		$http.post(BASE_URL + '/Points?token=' + window.localStorage['token'],{assignmentId: assignmentId})
			.success(function(data) {
				userFactory.user.points = data.points;
				if(!data.msg) {
					$('.plus-animation').remove();
	            	var plus_animation = $('<span class="plus-animation">+ '+points+'</span>');
	            	$('#points').before(plus_animation);
	            }
			});
		console.log(assignmentId, points);
	};

	return userFactory;
});

app.directive('spChallenge', function($compile, UserFactory) {
	return {
		restrict: 'E',
		scope: {
			assignment: '@'
		},
		templateUrl: 'challenge.html',
		link: function(scope, element, attrs) {
			// Make it an Ace editor
			var js_editor = element.find('.editor.js')
				.text(window.localStorage['source.' + scope.a.id])
				.height(150);
            ace_editor = get_editor(js_editor[0]);
        	ace_editor.getSession().setMode("ace/mode/javascript");
        	js_editor.append(element.find('.run'));

        	scope.js_editor = ace_editor;
        	scope.element = element;
		},
		controller: function($scope) {
			var assignment = assignments[$scope.assignment];
			$scope.a = assignment;

			$scope.run = function() {
				var user_code = $scope.js_editor.getSession().getValue();

                // Save code in browser
                window.localStorage['source.' + assignment.id] = user_code;

                // Set up an iframe to run code in
                var iframe = $('<iframe>');
                $('body').append(iframe);
                iframe.contents().find('body').append(assignment.html);
                var frameWindow = iframe[0].contentWindow;

                // Load jQuery
                if(assignment.jquery) {
                    var jquerySource = '';
                    var f = $.ajax('static/js/jquery.js', {
                        async: false,
                        cache: true,
                        success: function(data) {
                            jquerySource = data;
                        }
                    });
                    frameWindow.eval(jquerySource);
                }

                try {

                    // Run the code!
                    frameWindow.eval(user_code);

                    // Test the return value
                    var returnValue = frameWindow.eval(assignment.return);
                    assignment.tester(returnValue);

                    // No error, complete the assignment!
                    UserFactory.completeAssignment(assignment.id, assignment.points);

                    $scope.completed = true;
                    $scope.element.find('.live_assignment').addClass('completed');
                    $scope.element.find('.complete')
                        .slideDown()
                        .delay(1000)
                        .slideUp();

                } catch(e) {
                    // Show error to user
                    $scope.element.find('.error').html("Error: " + e)
                        .slideDown()
                        .delay(3000)
                        .slideUp();
                } finally {
                    iframe.remove();
                }
			}


		}
	};
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

	UserFactory.fetchInfo();

}]);

app.controller("LeaderboardController", ["$scope", "$http", "UserFactory", function($scope, $http, UserFactory){
	$scope.leaderboard = [];
	$scope.user = UserFactory.user;
    $scope.consolation = null;

	$scope.login = function() {
		UserFactory.login();
	};

	$http.get(BASE_URL + '/Leaderboards?token=' + window.localStorage['token'])
		.success(function(data, status){
			$scope.leaderboard = data;
            $scope.consolation = data.consolation;
	});
}]);

var get_editor = function(element) {
    var editor = ace.edit(element);
    editor.setTheme("ace/theme/chrome");
    editor.setHighlightActiveLine(false);
    editor.setShowFoldWidgets(false);
    editor.setShowPrintMargin(false);
    editor.session.setUseWrapMode(true);
    editor.renderer.setShowGutter(false);
    editor.renderer.setScrollMargin(8, 8, 0, 0);
    editor.renderer.setPadding(10);
    return editor;
};
