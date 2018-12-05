<?php
//connexion a la base de données


$link = mysqli_connect("localhost", "root", "", "web");
if (!$link) {
die('Erreur de connexion');
} else {
//echo 'Succès... ';
}

  $requete = "UPDATE objets SET recupere = 0, affiche=0  WHERE id IN (1,2,3,4,5,6,7,8,9,10,11) ";

  mysqli_query ($link, $requete);

  $requete2 = "SELECT * FROM objets WHERE id =4";

  if ($liste = mysqli_query ($link, $requete2)){

      while ($result = mysqli_fetch_assoc($liste) ) {
          $sortie = $result;
            $sortie =json_encode($sortie, JSON_NUMERIC_CHECK);
          echo $sortie;
}}



?>
