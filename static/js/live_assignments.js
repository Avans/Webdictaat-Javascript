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
    isTrue: function(value, error) {
        if(value !== true) {
            throw error;
        }
    },
    isFalse: function(value, error) {
        if(value !== false) {
            throw error;
        }
    },
    isArray: function(value, error) {
        if(Object.prototype.toString.call(value) !== '[object Array]') {
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
    },
    contains: function(haystack, needle, error) {
        if(haystack.indexOf(needle) === -1) {
            throw error;
        }
    }
};
// NIET SPIEKEN!
// ANTWOORDEN WORDEN IN DE TOEKOMST OOK OP DE SERVER GECHECKT!

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
            var time = Math.floor(new Date().getTime() / 1000);
            assert.isFunction(tijd, "Je hebt geen functie 'tijd' gedefinieerd");
            assert.isNumber(tijd(), "Je functie geeft geen number waarde terug");
            assert.isEqual(tijd(), time, "Je functie geeft niet de huidige tijd terug (is nu " + time + ")");
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
        id: "5539286f60123324009cdd14",
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
    },
    reverse: {
        id: "553966a860123324009cdd15",
        title: "Omgedraaid",
        description: "Maak een functie 'omgedraaid' die een een string omgekeerd teruggeeft. omgedraaid('Hoi') retourneerd bijvoorbeeld 'ioH'.",
        points: 10,
        return: "typeof omgedraaid === 'undefined' ? undefined : omgedraaid",
        tester: function(omgedraaid) {
            assert.isFunction(omgedraaid, "Je hebt geen functie 'omgedraaid' gemaakt");
            assert.isEqual(omgedraaid('Hoi'), 'ioH', "omgedraaid('Hoi') moet 'ioH' teruggeven");
            assert.isEqual(omgedraaid('123456'), '654321', "Je functie werkt niet op alle strings");
        }
     },
     jquery_changecolor: {
        id: "5540bb977fd7b32400e7bb78",
        title: "I see a red door...",
        description: "Gebruik jQuery om de achtergrondkleur van de div zwart te maken.",
        html: "<div style=\"background-color: red;\">Door</div>",
        jquery: true,
        points: 10,
        return: "document",
        tester: function(document, source) {
            var color = $(document).find('div').css('background-color');
            assert.isNotEqual(color, 'rgb(255, 0, 0)', "Je hebt niet de kleur van de div veranderd");
            assert.isEqual(color, 'rgb(0, 0, 0)', "Maak de achtergrondkleur van de div zwart");
            assert.contains(source, '$(', "Gebruik jQuery");
        }
     },
     jquery_hide: {
        id: "5540bbac7fd7b32400e7bb79",
        title: "Hide in plain sight",
        description: "Maak alle p's onzichtbaar als er op een knop in de 'knoppen' div wordt geklikt",
        jquery: true,
        html: "<p>Hallo</p>\n<p>Wereld</p>\n<div class=\"knoppen\"><button>Verstop!</button></div>\n<button>Op mij klikken doet niks...</button>",
        points: 10,
        return: "document",
        tester: function(document, source) {
            assert.contains(source, '$(', "Gebruik jQuery");

            assert.isFalse($(document).find('p').is(':hidden'), "Maak p's pas onzichtbaar als er op de knop wordt geklikt.");

            $(document).find('button')[1].click();
            assert.isFalse($(document).find('p').is(':hidden'), "Voeg de click event-handler alleen toe op de knop in de 'knoppen' div");

            $(document).find('.knoppen button').click(),
            assert.isTrue($(document).find('p').is(':hidden'), "p's worden niet onzichtbaar als er op de knop wordt geklikt.");
        }
     },
     jquery_delegated: {
        id: "5540bbc17fd7b32400e7bb7a",
        title: "Leren delegeren",
        description: "Maak weer alle p's onzichtbaar als er op een knop in de 'knoppen' div wordt geklikt. Ook als die knop later worden toegevoegd aan de DOM.",
        jquery: true,
        html: "<p>Hallo</p>\n<p>Wereld</p>\n<div class=\"knoppen\"><button>Verstop!</button></div>\n<button>Op mij klikken doet niks...</button>",
        points: 10,
        return: "document",
        tester: function(document, source) {
            assignments.jquery_hide.tester(document, source);

            $(document).find('p').show();

            $(document).find('.knoppen').append('<button></button>');
            $(document).find('.knoppen button').last().click();

            assert.isTrue($(document).find('p').is(':hidden'), "Zorg ervoor dat knoppen die dynamisch worden toegevoegd aan de 'knoppen' div automatisch ook p's verbergen.");
        }
     },
     prototype_car: {
        id: "5558e7ca0949a911006dd8b1",
        title: "New car smell",
        description: "Maak een Car contructor functie die je kan aanroepen met \"new Car('Tesla');\". Zorg ervoor dat er dan het volgende object uitkomt: {type: 'Tesla'} (afhankelijk van parameter uiteraard).",
        points: 10,
        return: "window",
        tester: function(window) {
            assert.isFunction(window.Car, "Definieer een Car constructor functie");

            var car = new window.Car('BMW');
            assert.isTrue(car instanceof window.Car, "Object heeft niet het Car prototype, gebruik geen return!");
            assert.isEqual(car.type, "BMW", "Nieuwe object krijgt niet de juiste 'type' property");
        }
     },
     prototype_car_gettype: {
        id: "5558e7dd0949a911006dd8b2",
        title: "Got type?",
        description: "Kopieer de code van vorige opgave en voeg een getType() functie toe aan Car.prototype die het type van de auto teruggeeft.",
        points: 10,
        return: "window",
        tester: function(window) {
            assert.isFunction(window.Car, "Definieer een Car constructor functie");

            var car = new window.Car('BMW');
            assert.isTrue(car instanceof window.Car, "Object heeft niet het Car prototype, gebruik geen return!");
            assert.isEqual(car.type, "BMW", "Nieuwe object krijgt niet de juiste 'type' property");

            assert.isFunction(car.getType, "Nieuwe Car objecten hebben niet een getType() functie");

            assert.isFunction(window.Car.prototype.getType, "Voeg de functie toe via het prototype object van Car");
            assert.isEqual(car.getType(), "BMW", "getType() geeft niet het juiste type terug");
        }
     },
     prototype_reverse: {
        id: "5558e7ec0949a911006dd8b3",
        title: "diaardegmO",
        description: "Definieer een reversed() functie op het prototype van String die de omgekeerde waarde teruggeeft. \"WEBS3\".reversed() geeft bijvoorbeeld \"3SBEW\" terug.",
        points: 10,
        return: "window",
        tester: function(window) {
            assert.isFunction(window.String.prototype.reversed, "Definieer een reversed() functie op het prototype van String");

            var string = new window.String("123456789");
            var result = string.reversed();
            assert.isDefined(result, "Je functie returned geen waarde");
            assert.isEqual(result, "987654321", "Je functie moet de omgekeerde string teruggeven");
        }
     },
}
