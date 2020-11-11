//vuelos
var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];
//Pide al usuarion su nombre y le da la bienvenida.
var userName = prompt('Por favor, introduzca su nombre');
console.log(`Bienvenid@ ${userName}!`);

//llamamos a las funciones para que nos enseñe en pantalla el resultado de cada una.
showFlights(flights);
averageCost();
scaleFlights();
lastFiveFlights();
userOrAdmin();


// la funcion muestra todos los vuelos y chequea si el vuelo tiene escalas o no y le cambia el nombre en consecuencia
function showFlights(arrFlights){
    var checkScales='';
    for(i in arrFlights){
        if(arrFlights[i].scale == true){
            checkScales = 'realiza escalas';
        }else{
            checkScales = 'no realiza ninguna escala';
        };
        console.log(`ID ${arrFlights[i].id}: El vuelo con origen: ${arrFlights[i].from}, y destino: ${arrFlights[i].to} tiene un coste de ${arrFlights[i].cost}€ y ${checkScales}.`);
    }    
}
// calcula el coste medio de los precios de los vuelos
function averageCost(){
    var totalCost = 0;
    for(i in flights){
        totalCost += flights[i].cost;
    }
    var totalAverage = totalCost/flights.length;
    console.log(`El coste medio de los vuelos es: ${parseFloat(totalAverage).toFixed(3)}€.`);
}
//calcula el número de vuelos que tienen escala
function scaleFlights(){
    numberOfScaleFlights = 0;
    for(i in flights){
        if(flights[i].scale === true){
            numberOfScaleFlights++;
        }
    }
    console.log(`El número de vuelos con escala son: ${numberOfScaleFlights}`);
}
//averigua cual es el destino de los últimos cinco vuelos
function lastFiveFlights(){
    lastFive = [];
    for(i in flights){
        if(i >= flights.length -5){
            lastFive.push(flights[i].to);
        }
    } 
    console.log(`El destino de los últimos cinco vuelos son: ${lastFive}.`);
}
//Funcion para determinar si el usuario es usuario o administrador
function userOrAdmin(){
    var question = prompt(`Querid@ ${userName} indique si es usted ADMIN o USER`).toLocaleLowerCase();
    switch(question){
        case 'admin':
            console.log(`Bienvenid@ administrador/a ${userName}`);
            //activar función administrador
            admin();
        break;
        case 'user':
            console.log(`Bienvenid@ usuari@ ${userName}`)
            //activar función usuario
            user();
        break;
        default:
            alert('Por favor introduzaca ADMIN o USER');
            userOrAdmin();
    }
}
//En caso de ser administrador si activa esta funcion que da acceso a añadir o borrar un vuelo
function admin(){
    var questionChoise = prompt(`Administrador/a ${userName} indique si quiere añadir un vuelo mediante la clave "ad" o si quiere borrarlo "eliminar".`).toLocaleLowerCase();
    var answerSwitch = [];
    switch(questionChoise){
        case 'ad'://para añadir un vuelo te pide los datos por separado i los devuelve todos juntos i en caso de ser superior de 15 no te deja añadir otro. 
            if(flights.length > 15){//si el número de vuelos es superior a 15 no puedes añadir más.
                    alert('No se pueden añadir más vuelos, máximo permitido son 15.');
                    var stopAdFlights = prompt('Si quiere continuar borrando vuelos escriba Continuar, en caso contrario dele al Enter').toLocaleLowerCase();
                        //te permite volver atras para borrar algun vuelo para poder añadir otro en caso de desearlo.
                        switch(stopAdFlights){
                        case 'continuar':
                            admin();
                        break;
                        case '':
                            alert(`Hasta pronto ${userName}!`);
                        break;
                    }
            }else{//pasos para añadir el vuelo
                var to = prompt('Indique el destino');
                answerSwitch[0] = to;
                var from = prompt('Indique el origen');
                answerSwitch[1] = from;
                var cost = parseFloat(prompt('Indique el precio'));
                answerSwitch[2] = cost;
                function checkScales(){//comprueba que el vuelo tenga o no escalas y te devuelve un valor true o false que la funcion showFlights traducirá
                    var scale = prompt('Indique si el vuelo tiene escalas con si o no').toLocaleLowerCase();
                        switch(scale){
                            case 'si':
                                answerSwitch[3] = true;
                            break;
                            case 'no':
                                answerSwitch[3] = false;
                            break;
                            default:
                                alert('Por favor introduzca si o no');
                                checkScales();//en caso de equivocación a la hora de poner si o no te devuelvea la pregunta
                    }
                }
                checkScales();//dispara la funcion anterior
                flights.push({id: flights.length, to: answerSwitch[0], from: answerSwitch[1], cost: answerSwitch[2], scale: answerSwitch[3]});//graba el resultado en flights
                showFlights(flights);// te enseña los vuelos más los que se hayan añadido nuevos
                repeatQuestion();// te repite la pregunta por si quieres volver a empezar
            }
        break;
        case 'eliminar'://eliminar vuelo
            var deleteFlight = prompt(`Sabe el ID del vuelo? aprete 'Enter' de lo contrario con 'Ver' le enseñara los vuelos y su ID`);
                switch(deleteFlight){
                    case 'ver'://si no saben ID pueden comprobar con ver y activa funcion para borrar vuelos
                        showFlights(flights);    
                        deleteFlights();
                    break;
                    default:
                        deleteFlights();//si ya sabe ID activa directamente funcion para borrar vuelo
                            }
                        }
                }

function repeatQuestion(){//funcion para repetir la pregunta de añadir o borrar vuelo una vez terminado uno de los procesos.
    var question = prompt('Quiere añadir o borrar algún otro vuelo? conteste si o no').toLocaleLowerCase();
    switch(question){
        case 'si'://en caso afirmativo te devuelve a la pregunta original
            admin();
        break;
        case 'no'://en caso negativo se despide y da por finalizado el programa
            alert(`Adios ${userName}!`);
        break;
        default://en caso de no ser correcta la respuesta te avisa y te la repite
            alert('Por favor introduzca si o no');
            repetQuestion();
        break;
    }
}
function deleteFlights(){//esta funcion es para borrar un vuelo mediante el ID
    deleteID = prompt('Indique el ID del vuelo que quiera eliminar');
    flights.splice(flights.map(function(elem){
        return elem.id;
    }).indexOf(parseInt(deleteID)),1);
    console.log(`Ha eliminado el vuelo con ID: ${deleteID}`);
    showFlights(flights);//una vez eliminado el vuelo te enseña de nuevo los vuelos disponibles 
    repeatQuestion();//y repite la pregunta por si queires continuar 
}
function user(){//en caso de elegir usuario te permite adquirir un vuelo
    var questionUser = prompt(`${userName} deseas comprar algun vuelo? Indica si o no`).toLocaleLowerCase();
        switch(questionUser){
            case 'si':
                alert('Bien!')
                flightsfilter();//funcion para filtrar vuelos
            break;
            case 'no'://si dice que no se despide y termina el programa
                alert(`Adios ${userName}, hasta la próxima!`);
            break;
            default://en caso de error en la respuesta te devuelve a la pregunta principal
                alert('Por favor introduzca si o no');
                user();
            break;
        } 
    
}
function flightsfilter(){//funcion para filtrar los vuelos
    var amount = parseFloat(prompt(`${userName}, indique el precio que busca`));
    var testAmount = false;
    while(testAmount === false){//comprueba si lo que ha introducido el usuario es un numero, sino le alerta de que no es correcto.
        (isNaN(Number(amount)))? amount = prompt ("El número no es correcto. Inténtelo de nuevo"): testAmount = true;
    }
    //opciones para filtrar los vuelos
    var optionsFilter = prompt('Puede filtrar por: si es su presupuesto MAXIMO, MINIMO o EXACTO. Si ya sabe el vuelo que desea dele a Enter').toLocaleLowerCase();
    switch(optionsFilter){
        case 'maximo'://si es el presupuesto maximo muestra los vuelos con precio menor al indicado
            var maxAmount = [];
            for (var i = 0; i < flights.length; i++) {
                if (flights[i].cost < amount) {
                    maxAmount.push(flights[i]);
                }
            }
            showFlights(maxAmount);//te enseña los vuelos requeridos
            buyFlight();//activa la funcion para comprar el vuelo definitivamente
            break;
        case 'minimo'://si es el presupuesto minimo muestra los vuelos con precio mayor al indicado
            var minAmount = [];
            for (var i = 0; i < flights.length; i++) {
                if (flights[i].cost > amount) {
                    minAmount.push(flights[i]);
                }
            }
            showFlights(minAmount);//enseña los vuelos requeridos
            buyFlight();//activa la funcion para comprar definitivamente el vuelo
            break;
        case 'exacto':// en este caso te enseña los vuelos con el precio exacto al que se ha indicado
            var exactAmount = flights.filter(function(flights){
                return flights.cost === amount;
            })
            if(exactAmount.length === 0){//si el importe no coincide con ningun vuelo te avisa y vuelve a preguntar
                alert('No hay ningun vuelo con ese importe. Indique de nuevo el importe deseado');
                flightsfilter();
            }else{//si coincide te enseña los vuelos requeridos
                showFlights(exactAmount);
                buyFlight();//activa la funcion para comprar el vuelo definitivamente
            }                
            break;
        case ''://si ya sabe el ID salta la pregunta de confirmacion 
            var idFlights = confirm('¿Conoce el ID de su vuelo?');
            switch(idFlights){
                case true://en caso afirmativo activa funcion para comprar vuelo
                    buyFlight();
                break;
                case false://de lo contrario te enseña de nuevo los ID de los vuelos para poder elegir
                    showFlights(flights);//enseña de nuevo los vuelos
                    buyFlight();//activa funcion de compra
                break;
            }
            break;
        default://si lo escrito no conicide con ninguno de los casos te avisa y te hace la pregunta de nuevo
            alert('No ha indicado correctamente el filtro, por favor indique de nuevo el precio deseado.');
            flightsfilter();      
    }
}
function buyFlight(){//funcion para compra definitiva
    var idFlight = prompt('Indique el ID deseado');
    //verifica el ID deseado y pregunta confirmación del ID
    var confirmPurchase = prompt(`¿Desea comprar el vuelo con ID: ${idFlight}? responda si o no`).toLocaleLowerCase();
        switch(confirmPurchase){
            case 'si'://en caso afirmativo se da la enhorabuena al usuario y se borra el vuelo adquirido.
                alert(`Enhorabuena ${userName} has adquirido el vuelo con ID: ${idFlight}`);
                deleteAuto(idFlight);//activa funcion para borrar vuelo comprado
                user();//activa funcion del usuario por si quieres continuar comprando vuelos
            break;
            case 'no'://en caso contrario se activa de nuevo la pregunta de la cantidad deseada
                flightsfilter();
            break;
            default:// si no coincide la respuesta con lo esperado te avisa y te repregunta el ID
                alert('Por favor introduzaca si o no');
                buyFlight();
        }
    
}
function deleteAuto(arrDelete){//funcion para borrar los vuelos que el usuario compra
    flights.splice(flights.map(function(elem){
        return elem.id;
    }).indexOf(parseInt(arrDelete)),1);