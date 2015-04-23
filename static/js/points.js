
var Points = {
    // Cached version of points
    points: 0,
    base_url: 'https://pointypony.herokuapp.com',

    init: function() {
        // Show temporarily cached points
        var points = window.localStorage['points'];
        if(points) {
            Points.set_points(Number(points));
        }

        $('#logout').click(function() {
            Points.logout();
        });

        $('#login').click(function() {
            Points.login();
        });

        if(!Points.is_logged_in()) {
            // Logged out
            $('#logged_in_name').hide();
            $('#logout').hide();
        } else {
            // Logged in
            $('#login').hide();
            Points.fetch_info();
        }
        // Test animation
        $('#test').click(function() {
            Points.add_points(5);
        })

    },

    is_logged_in: function() {
        return window.localStorage['token'] !== undefined;
    },

    set_points: function(points) {
        Points.points = points;
        $('#points').html(Points.points + " AvansPoints");

        // Cache points
        window.localStorage['points'] = points;
    },

    add_points: function(points) {
        if(Points.is_logged_in()) {
            $('.plus-animation').remove();
            var plus_animation = $('<span class="plus-animation">+ '+points+'</span>');
            $('#points').before(plus_animation);

            Points.set_points(Points.points + points);
        }
    },

    complete_assignment: function(assignment_string) {
        // TODO
    },

    logout: function() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('name');
        $('#logged_in_name').hide();
        $('#logout').hide();
        $('#login').show();
    },

    login: function() {
        // Redirect to
        window.localStorage['redirect_back_hash'] = window.location.hash;
        window.location.assign(Points.base_url + '/auth/avans');
    },

    fetch_info: function(token) {
        $.get(Points.base_url + '/points?token=' + window.localStorage['token'], function(data) {
            Points.set_points(data['points']);
            $('#logged_in_name').html('Ingelogd als ' + data['username']);
        });
    },

    check_hash: function() {
        if(window.location.hash.startsWith('#token=')) {
            var token = window.location.hash.replace('#token=', '');
            Points.fetch_info(token);
            window.localStorage['token'] = token;

            if(window.localStorage['redirect_back_hash']) {
                window.location.hash = window.localStorage['redirect_back_hash'];
            } else {
                window.location.hash = '/';
            }

            $('#logged_in_name').show();
            $('#logout').show();
            $('#login').hide();
        }
        window.localStorage.removeItem(['redirect_back_hash']);
    }
};

$(function() {
    //Points.init();
});