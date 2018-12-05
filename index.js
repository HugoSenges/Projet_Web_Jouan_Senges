//Récupère les éléments de la liste à points du Hall of Fame du HTML
var V1 = document.getElementById('V1');
var V2 = document.getElementById('V2');
var V3 = document.getElementById('V3');
//Création de la variable qui sera appelée ensuite dans le addEventListener
var result;

//Ecoute le chargement de la page
window.addEventListener('load', charge, false);
//Fonction du addEventListener
function charge(event){
  console.log('Je charge');
  //Requete ajax classique
  var ajax = new XMLHttpRequest();
  ajax.open('POST', 'requete_sql/index.php');
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax.addEventListener('load', function(){
    //Traduit le JSON revoyé par le PHP en chaîne de caractère lisible
    result = JSON.parse(ajax.response);
    //Première ligne de la requête
    console.log(result[0]);
    //Deuxième ligne de la requête
    console.log(result[1]);
    //Troisième ligne de la requête
    console.log(result[2]);

    //On rentre maintenant les résultats de la requête dans la bonne ligne de la liste à puces
    V1.innerHTML = result[0]["pseudo"] + "          " + result[0]["score"];
    V2.innerHTML = result[1]["pseudo"] + "          " + result[1]["score"];
    V3.innerHTML = result[2]["pseudo"] + "          " + result[2]["score"];

  }, false);

  //Envoie la requête AJAX
  var data = "";
  ajax.send(data);
}
