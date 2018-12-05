
<?php
//connexion a la base de données


$link = mysqli_connect("localhost", "root", "", "web");
if (!$link) {
die('Erreur de connexion');
} else {
//echo 'Succès... ';
}


if(isset($_POST['ligne'])){
  $var = $_POST['ligne'];
  $requete = "SELECT * FROM objets WHERE id ='$var'";

  if ($liste = mysqli_query ($link, $requete)){

      while ($result = mysqli_fetch_assoc($liste) ) {
          $sortie = $result;
          $sortie =json_encode($sortie, JSON_NUMERIC_CHECK);
          echo $sortie;

  }

}
  else{
      echo "pbm requête";}
        //echo $tab;

  $requete2 = "UPDATE objets SET affiche = 1 WHERE id ='$var' ";

  mysqli_query ($link, $requete2);

  return $sortie;
}


?>
