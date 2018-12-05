<?php

$link = mysqli_connect("localhost", "root", "", "web");
if (!$link) {
die('Erreur de connexion');}
else {
echo 'Succès... ';
}

if (isset($_POST['pseudo'])){
  #echo $_POST['score'];
  $score = $_POST['score'];
  $pseudo = $_POST['pseudo'];
  $requete =  "INSERT INTO hall_of_fame (id, pseudo, score) VALUES ('0', '$pseudo', '$score')";
  mysqli_query ($link, $requete);
}
else{ echo 'moort';}
?>
