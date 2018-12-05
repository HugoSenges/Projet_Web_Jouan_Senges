//INITIALISATION DES CONSTANTES
//
  //Fais la mise à jour des booléens "recupere" de la BDD
maj();
function maj(indice){

  var ajax = new XMLHttpRequest();
  ajax.open('GET', 'requete_sql/maj.php');
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax.addEventListener('load',  function () {

      var result = ajax.response;
      console.log('controle maj  '+result);

    }, false);
  ajax.send();

}

  //Marqueur de début de la partie en milisecondes

var debut = Date.now();
console.log(debut);
  //Initialise le score à 0
var score = 0;

//PARTIE CARTE
//
  // Affiche la carte dès le début du chargement de la page
var mymap = L.map('mapid').setView([4.8196, -52.3637], 12);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
  attribution: '&copy; <a     href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>  contributors'
}).addTo(mymap);

  //Affiche l'échelle de la carte
var scale = L.control.scale().addTo(mymap);

  //Affiche le zoom de la carte dans la console
var zoom = mymap.getZoom();
console.log(zoom);

  //Définit la couche d'objets où on rajoute les marqueurs
var nbr_obj = 0;
var Group = L.layerGroup([]);


//FONCTIONS POUR LE JEU
//
  // Affiche le le bouton de démarrage de la partie
var but = document.getElementById('btn');
var num_listener = 1;
var num_charge = 2;
    //Evenement qui écoute le début de la partie avec le clic sur le bouton démarrage
but.addEventListener("click", demarre, false);


function demarre(){
  charge(num_charge, num_listener);  //Appelle la fonction pour charger le parchemin (objet de début) sur la map
  but.removeEventListener('click', demarre);
}

//Fonction qui affiche sur la map le marqueur et le popup de chaque objet
function charge(num_charge, num_listener){
  //console.log(num);
  var ajax = new XMLHttpRequest();
  var but_nom = "";
  var but_lat = 0;
  var but_long = 0;
  var but_img = 0;
  var but_indice = "";
  var but_affiche = 0;
  var but_zoom = 0;
  var option = 0;
  ajax.open('POST', 'requete_sql/tuto.php');
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax.addEventListener('load',  function () {


        var result = JSON.parse(ajax.response);
        but_nom = result['nom'];
        but_img = result['img_path'];
        but_lat = result['lat'];
        but_long = result['longi'];
        but_indice = result['indice'];
        but_affiche = result['affiche'];
        but_zoom = result['zoom'];
        console.log(result);
        if (but_affiche == 0) {
          console.log('affiche = 0 for : '+ but_nom)
          var decodeur = L.icon({
            iconUrl: 'images/'+but_img,
            iconSize: [60,60]});
          var obj = L.marker([but_lat, but_long], {icon : decodeur});
          Group.addLayer(obj);
          obj.addTo(mymap);
          addListener(num_listener,but_indice);

          //Affichage en fonction du zoom et du statut 'prenable' de l'objet
        if (but_nom=='decodeur'||but_nom=='cle'){
            console.log('cas special obj prenable zoom : '+but_zoom);
            var unique = 0;
            mymap.on('zoomend', function() {
              if (mymap.getZoom() >= but_zoom){
                  if (unique <= 1){
                      obj.addTo(mymap);
                      unique +=1;
                      console.log ('unique  '+unique);
                    }
              }
              else if (mymap.getZoom() < but_zoom){
                      obj.remove(mymap);
                    //  console.log('objet prenable enleve');
                  }
              });
          }
              else{
                mymap.on('zoomend', function() {
                   if (mymap.getZoom() < but_zoom){
                           obj.remove(mymap);
                   }
                   else if (mymap.getZoom() >= but_zoom){
                           obj.addTo(mymap);
                       }
            });
          }

        }
      });
      var data = "ligne="+ num_charge;
      ajax.send(data);
    }

//Fonction qui gère le script
function addListener(num, indice){

    var machin = Group.getLayers()[num-1];
    console.log(machin);
    console.log(num);

    switch (num) {

        case 1 :
        //Carte
          machin.addEventListener("click", function() {
            charge(3,2);
            }, false);
          if (indice != ""){
            machin.bindPopup(indice);
          }
          break;

        case 2 :
        //Indigene
            var ajax = new XMLHttpRequest();
            ajax.open('POST', 'requete_sql/inventaire_0.php');
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajax.addEventListener('load',  () => {


                  var result = JSON.parse(ajax.response);
                  option = result['recupere'];
                  console.log("result inventaire_0 : "+result['recupere']);
                  act_indigene(machin, option, indice);
                  });

            var data = "ligne="+4;
            ajax.send(data);


            break;

        case 3 :
          //Decodeur

          machin.addEventListener("click", function() {
            bandeau(indice, 4);
            machin.remove(mymap);
            Group.addLayer(machin);
            }, false);

          break;

        case 4 :

        machin.addEventListener("click", function() {
          charge(6, 5);
          }, false);
        if (indice != null){
          machin.bindPopup(indice);
        }
        break;


        case 5 :
          machin.addEventListener("click", function() {
            charge(7, 6);
            }, false);
          if (indice != null){
            machin.bindPopup(indice);
          }
          break;

        case 6 :
          //code a implementer
            machin.addEventListener("click", function() {
              var y=window.prompt("La pirogue est attachée, il faut un code pour la libérer ");
              //window.alert(y);
              if (y== 0258){
                  window.alert('Pirogue dévérouillée, allons retrouver notre ami');
                  var promise1 = new Promise( function(resolve) {
                    setTimeout(function() {
                        resolve(charge(1, 0));
                      }, 001);;
                    resolve('done');
                  });
                  var promise2 = new Promise((resolve) => {
                    setTimeout(function() {
                        resolve(charge(8, 8));
                      }, 300);;
                    resolve('done');
                  });

                mymap.flyTo([4.097, -52.681], 10, true);
                if (indice != null){
                  machin.bindPopup(indice);
                }
              }
              else{
                window.alert('code erroné');
              }
              },false);


          break;
        case 7 :
        //ami
          var option = 0;
          var ajax = new XMLHttpRequest();
          ajax.open('POST', 'requete_sql/inventaire_0.php');
          ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          ajax.addEventListener('load',  () => {


                var result = JSON.parse(ajax.response);
                option = result['recupere'];
                console.log("result inventaire_0 : "+result['recupere']);
                });

          var data = "ligne="+9;
          ajax.send(data);

          machin.bindPopup(indice);

          machin.addEventListener("click", ()=> {
            if (otiont = 0){
              console.log("pas libere ou probleme ajax");
            }
            else {
              console.log('F.I.N');
              fin();
            }
          })

          break;

        case 8 :
        //prison
          machin.bindPopup(indice);
          var option = 0;
          var ajax = new XMLHttpRequest();
          ajax.open('POST', 'requete_sql/inventaire_0.php');
          ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          ajax.addEventListener('load',  () => {


                var result = JSON.parse(ajax.response);
                option = result['recupere'];
                console.log("result inventaire_0 : "+result['recupere']);
                prison(machin, option);
                });

          var data = "ligne="+9;
          ajax.send(data);

          break;
      case 9 :

        machin.addEventListener("click", function() {
          bandeau(indice, 9);
          machin.remove(mymap);
          }, false);
          break;
      default :
        break;
    }
}

//Fonction qui fais en sorte de jouer le son
function charge_son(reverse){

  var ajax = new XMLHttpRequest();
  var but_nom = "";
  var but_path = "";
  ajax.open('POST', 'requete_sql/tuto.php');
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax.addEventListener('load',  function () {
    var result = JSON.parse(ajax.response);
    but_nom = result['nom'];
    but_img = 'images/' + result['img_path'];
    var audio = new Audio(but_img);
    audio.play();
  });
  if (reverse == true){
    var data = "ligne="+ 11;
  }
  else{
    var data = "ligne="+ 10;
  }

  ajax.send(data);
}


//Fonction associant le comportement attendu à l'indigene (avec ou sans décodeur)
function act_indigene(machin, option, indice){
  console.log("appel act_indi : "+ indice);


  if (option == 0){

    machin.addEventListener("click", charge_son, false);
    machin.addEventListener("click", function(){
      charge(4, 3);
      if (indice != ""){
          machin.bindPopup(indice); }
    }, false);

}
  else {

    machin.removeEventListener("click");
    console.log("succès comportement fusé");
    machin.addEventListener("click", function() {
      charge(5,4);
      charge_son(true);
      mymap.openPopup(indice, [3.858, -51.826]);
      }, false);

  }

}


//Fonction permettant l'affichage des objets récupérés dansla barre objets
function bandeau(indice,num){

  var ajax = new XMLHttpRequest();
  ajax.open('POST', 'requete_sql/inventaire_1.php');
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax.addEventListener('load',  function (option) {


        var result = JSON.parse(ajax.response);
        console.log(result);

        });

  var data = "ligne="+num;
  ajax.send(data);

  var oDiv = document.getElementById("barre_obj")
  // creation image
  var oImg = document.createElement('img');
  //-- Ajout image
  oDiv.appendChild(oImg);

  oImg.src = "images/"+indice+".png";

  if (num == 4){
  oImg.addEventListener("click", couleur, false);
  function couleur(event){
    addListener(2, "Voila le chemin. Rappelle toi de ce code il est important : 0258");
    oImg.style.backgroundColor = "red";
  }
}
  else if (num == 9){
    oImg.addEventListener("click", ()=> {
      addListener(8, "Merci tu m'a liberer");
      oImg.style.backgroundColor = "red";
    })
  }
}


//Fonction gérant le comportement de la prison (avec ou sans clé)
function prison(machin, option){
  console.log('prison option : '+option+'!');
  //machin.removeEventListener('click');

if (option == 0){
  console.log('charge cle ');
  machin.addEventListener("click", () =>{
    charge(9,9);
    machin.bindPopup('trouve la clé, bien cachée, un peu au sud');
  });}


if (option == 1){

  machin.addEventListener("click", function(){


      var ajax = new XMLHttpRequest();
      ajax.open('POST', 'requete_sql/inventaire_1.php');
      ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      ajax.addEventListener('load',  function () {


            var result = JSON.parse(ajax.response);
            console.log(result);

            });

      var data = "ligne="+8;
      ajax.send(data);
      machin.remove(mymap);
      addListener(7,"Well Done");
  });}
  }



//Permet de cloturer le jeu, et de rentrer le score dans le Hall of Fame
function fin(){

// Marqueur de fin de la partie et affichage du formulaire de hall of fame
  var fin = Date.now();
  score = 1000 - (fin - debut)/600;
  console.log(score);
  alert("Remplissez le formulaire en dessous de la carte pour enregistrer votre score! Vous avez marqué :  " + score + "  points, BRAVOOOO !");
  //Requete AJAX pour rentrer le pseudo et le score dans la base de donnée
    var form_inscription = document.forms["inscription"];
    var btn = form_inscription.elements["valider"];
    btn.addEventListener("click", ajax_request, false);
    function ajax_request(event){
        event.preventDefault();
        var pseudo = form_inscription.elements["pseudoV"].value;
        console.log(pseudo);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'requete_sql/update.php');
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.addEventListener('load',  function () {
            console.log("pseudo="+pseudo+"&&score="+score);
            var result = ajax.response;
            console.log(result);
            var promise1 = new Promise( function(resolve) {
              setTimeout(function() {
                  resolve(document.location.href="index.html");
                }, 200);;
              resolve('done');
            });
          });
        var sending = "pseudo="+pseudo+"&&score="+score;
        ajax.send(sending);



      }
}
