var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien" },
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso" },
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé" },
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida" },
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación" },
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad" },
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas" },
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento" },
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano" },
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba" },
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria" },
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo" },
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas" },
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia" },
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo." },
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien" },
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft" },
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche" },
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático" },
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984" },
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914" },
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa" },
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso" },
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética" },
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal  por indígenas americanos" },
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional" },
];

localStorage.clear();
printRules();

function pasaPalabra() {
    var gameRuning = true;
    var correct = 0;
    var incorrect = 0;
    var name = prompt("Como te llamas?");

    resetGame();

    while (gameRuning) {

        for (i in questions) {
            if (questions[i].status == 0) {
                //var entry = prompt(questions[i].question, "Pasapalabra").toLowerCase();
                var entry = prompt(questions[i].question, "A").toLowerCase();
                if (processPrompt(entry) == 1 && checkAnswer(entry, questions[i].answer)) {
                    console.log("Respuesta correcta.");
                    questions[i].status = 1;
                    correct++;
                } else if (processPrompt(entry) == -1) {
                    console.log(`Te has rendido. Correctas: ${correct}, Incorrectas: ${incorrect}`);
                    return;
                } else if (processPrompt(entry) == 0) {
                    console.log("Pasapalabra");
                } else {
                    console.log("Respuesta incorrecta.");
                    questions[i].status = -1;
                    incorrect++;
                }
                if (checkFinish()) {
                    gameRuning = false;
                }
            }
        }
    }
    console.log(`Fin del juego. Correctas: ${correct}, Incorrectas: ${incorrect}`);

    var tempPlayer = new Player(name, correct, incorrect);
    localStorage.setItem(name, JSON.stringify(tempPlayer));
    printRanking();

    if (confirm("Deseas volver a jugar?")) {
        pasaPalabra();
    }
}

var player = {
    name: String,
    correct: Number,
    incorrect: Number
};

function Player(name, correct, incorrect) {
    this.name = name;
    this.correct = correct;
    this.incorrect = incorrect;
}

function printRules() {
    console.log("Reglas del juego:\n   - Si respondes Pasapalabra quedara sin responder pendiente para la siguiente ronda.\n   - Si escribes END finalizará el juego");
}

function printRanking() {
    console.log("RANKING:");
    for (let i = 0; i < localStorage.length; i++) {
        var playerPrint = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(`  - Player: ${playerPrint.name}, Correct: ${playerPrint.correct}, Incorrect: ${playerPrint.incorrect}`);
    }
}

function resetGame() {
    for (var obj of questions) {
        obj.status = 0;
    }
}

function checkAnswer(entry, answer) {
    if (entry == answer) {
        return true;
    }
    return false;
}

function processPrompt(entry) {
    if (entry == "end") {
        return -1;
    } else if (entry == "pasapalabra") {
        return 0;
    } else {
        return 1;
    }
}

function checkFinish() {
    for (i in questions) {
        if (questions[i].status == 0) {
            return false;
        }
    }
    return true;
}