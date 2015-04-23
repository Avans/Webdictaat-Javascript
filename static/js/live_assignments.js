var assert = {
    isFunction: function(value, error) {
        if(typeof value !== 'function') {
            throw error;
        }

    },
    isTruthy: function(value, error) {
        if(!value) {
            throw error;
        }
    },
    isEqual: function(value1, value2, error) {
        if(value1 !== value2) {
            throw error;
        }
    },
    isNotEqual: function(value1, value2, error) {
        if(value1 === value2) {
            throw error;
        }
    }
};

var assignments = {
    addition: {
        id: "additionhashed",
        title: "Optellen",
        description: "Maak een functie met de naam 'optellen' die de som van zijn twee parameters teruggeeft. Voorbeeld: optellen(1, 2) returned 3.",
        points: 10,
        return: "typeof optellen === 'undefined' ? undefined : optellen",
        tester: function(optellen) {
            assert.isFunction(optellen, "Je hebt geen functie 'optellen' gemaakt");
            assert.isEqual(optellen(1, 1), 2, "optellen(1, 1) moet 2 teruggeven");
            assert.isEqual(optellen(3, 4), 7, "optellen(3, 4) moet 7 teruggeven");
        }
    },
    increasePoints: {
        id: "increasePoints123",
        title: "HTML veranderen",
        description: "Verander de inhoud van de &lt;div&gt; met JavaScript naar \"Punten: 1\"",
        points: 5,
        html: '<div class="punten">Punten: 0</div>',
        return: "document",
        tester: function(document) {
            assert.isTruthy(document.querySelector('.punten'), "div niet gevonden?");
            assert.isNotEqual(document.querySelector('.punten').innerHTML, "Punten: 0", "Je hebt niet de inhoud van de div gewijzigd");
            assert.isEqual(document.querySelector('.punten').innerHTML, "Punten: 1", "Inhoud van div wordt niet 'Punten: 1'");
        }
    }
}

function live_assignments() {
    $('.live_assignment').each(function() {
        var outer_div = this;
        var assignment = assignments[$(this).data('assignment')];

        var template = $('<div>'
            + '<span class="points">10 punten</span>'
            + '<div class="description"></div>'
            + '<code class="editor html"></code>'
            + '<code class="editor js"></code>'
            + '<div class="result"></div>'
            + '<button class="run">Run!</button>'
            + '<div class="alert alert-error error">Error!</div>'
            + '<div class="alert alert-info complete">Challenge complete!</div>'
            + '</div>');

        template.find('.description').html(assignment.description);

        if(assignment.html) {
            template.find('.editor.html').text(assignment.html);
        } else {
            template.find('.editor.html').hide();
        }

        // Set source by student
        template.find('.editor.js').text(window.localStorage['source.' + assignment.id]);

        var js_editor = template.find('.editor.js').height(150);
        ace_editor = get_editor(js_editor[0]);
        ace_editor.getSession().setMode("ace/mode/javascript");

        js_editor.append(template.find('.run'));

        // Run button
        var run_button = template.find('.run')
            .data('editor', ace_editor)
            .click(function() {
                var user_code = $(this).data('editor').getSession().getValue();

                // Save code in browser
                window.localStorage['source.' + assignment.id] = user_code;

                // Set up an iframe to run code in
                var iframe = $('<iframe>');
                $('body').append(iframe);
                iframe.contents().find('body').append(assignment.html);
                var frameWindow = iframe[0].contentWindow;

                try {
                    // Run the code!
                    frameWindow.eval(user_code);

                    // Test the return value
                    var returnValue = frameWindow.eval(assignment.return);
                    assignment.tester(returnValue);

                    // No error, complete the assignment!
                    Points.complete_assignment(assignment.id);
                    Points.add_points(assignment.points);

                    $(outer_div).addClass("completed");
                    template.find('.complete')
                        .slideDown()
                        .delay(1000)
                        .slideUp();

                } catch(e) {
                    // Show error to user
                    template.find('.error').html("Error: " + e)
                        .slideDown()
                        .delay(3000)
                        .slideUp();
                } finally {
                    iframe.remove();
                }
        });

        $(this).append(template);

    });


}