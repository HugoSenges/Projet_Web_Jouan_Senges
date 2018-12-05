<?php
//connexion a la base de données


$link = mysqli_connect("localhost", "root", "", "web");
if (!$link) {
die('Erreur de connexion');
} else {
//echo 'Succès... ';
}

json_decode(file_get_contents('php://input'), true);
if(isset($_POST['ligne'])){
  $var = $_POST['ligne'];
  $requete = "UPDATE objets SET recupere = 1 WHERE id ='$var' ";

  mysqli_query ($link, $requete);
  $requete2 = "SELECT affiche, recupere FROM objets WHERE id ='$var'";

  if ($liste = mysqli_query ($link, $requete2)){

      while ($result = mysqli_fetch_assoc($liste) ) {
          $sortie = $result;
        //  $tab[$it] = $result;
          //$it += 1 ;
          $sortie =json_encode($sortie, JSON_NUMERIC_CHECK);
          echo $sortie;
}}
  else{echo "pbm requête";}
        //echo $tab;
}
?>
