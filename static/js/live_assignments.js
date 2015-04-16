var assignments = {
    addition: {
        title: "Optellen",
        description: "Maak een functie met de naam 'optellen' die de som van zijn twee parameters teruggeeft.",
        points: 10,

        tester: function(scope) {
            if(!scope.optellen)
                return "Maak een functie die de naam 'optellen' heeft";

            // If is callable

            var value = scope.optellen(1, 1);
            if(value != 2) {
                return "optellen(1, 1) geeft " + value + " terug in plaats van 2";
            }

            return true;
        }
    }
}

function live_assignments() {
    $('.live_assignments').each(function() {
        var js_editor = $('<code class="editor js"></code>')
                    .css('height', 200)
                    .html("function optellen(a, b) { return a+b;}");

        ace_editor = get_editor(js_editor[0]);
        ace_editor.getSession().setMode("ace/mode/javascript");

        var run_button = $('<button>Run!</button>');
        run_button
            .data('editor', ace_editor)
            .data('assignment', assignments.addition)
            .click(function() {
                var user_code = $(this).data('editor').getSession().getValue();
                var assignment = $(this).data('assignment');

                console.log(user_code);
        });
        $(this).append(js_editor).append(run_button);



    });


}