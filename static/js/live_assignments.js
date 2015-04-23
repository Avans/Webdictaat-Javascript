var assert = {
    isFunction: function(value, error) {
        if(typeof value !== 'function') {
            throw error;
        }

    },
    isDefined: function(value, error) {
        if(typeof value === 'undefined') {
            throw error;
        }
    },
    isTruthy: function(value, error) {
        if(!value) {
            throw error;
        }
    },
    isArray: function(value, error) {
        if(value.constructor.name !== 'Array') {
            throw error;
        }
    },
    isNumber: function(value, error) {
        if(typeof value !== 'number') {
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
    small_array: {
        id: "5539279b60123324009cdd13",
        title: "Kleine array",
        description: "Definieer een variabele 'sites' die een array met twee waardes bevat: \"http://en.wikipedia.org/\" en \"http://reddit.com/\"",
        points: 10,
        return: "typeof sites === 'undefined' ? undefined : sites",
        tester: function(sites) {
            assert.isDefined(sites, "Je hebt geen variabele 'sites' gedefinieerd");
            assert.isArray(sites, "Variabele is geen array");
            assert.isEqual(sites.length, 2, "Er moeten 2 waardes in de array zitten");
            assert.isEqual(sites[0], "http://en.wikipedia.org/", "De eerste waarde moet \"http://en.wikipedia.org/\" zijn");
            assert.isEqual(sites[1], "http://reddit.com/", "De tweede waarde moet \"http://reddit.com/\" zijn");
        }
    },
    unixtime: {
        id: "553915c844761a2400e62edc",
        title: "Got the time?",
        description: "Definieer een functie tijd() die de tijd in seconde sinds 1 jan. 1970 teruggeeft (de zogenaamde Unix Timestamp http://www.unixtimestamp.com/ )",
        points: 10,
        return: "typeof tijd === 'undefined' ? undefined : tijd",
        tester: function(tijd) {
            assert.isFunction(tijd, "Je hebt geen functie 'tijd' gedefinieerd");
            assert.isNumber(tijd(), "Je functie geeft geen number waarde terug");
            assert.isEqual(tijd(), new Date().getTime(), "Je functie geeft niet de huidige tijd terug (is nu " + new Date().getTime() + ")");
        }
    },
    addition: {
        id: "55392649f0466f2400c179f4",
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
    increase_points: {
        id: "553915c844761a2400e62edc",
        title: "HTML veranderen",
        description: "Verander de inhoud van de div met JavaScript naar \"Punten: 1\"",
        points: 10,
        html: '<div class="punten">Punten: 0</div>',
        return: "document",
        tester: function(document) {
            assert.isTruthy(document.querySelector('.punten'), "div niet gevonden?");
            assert.isNotEqual(document.querySelector('.punten').innerHTML, "Punten: 0", "Je hebt niet de inhoud van de div gewijzigd");
            assert.isEqual(document.querySelector('.punten').innerHTML, "Punten: 1", "Inhoud van div wordt niet 'Punten: 1'");
        }
    }
}
