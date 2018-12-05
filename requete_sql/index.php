<?php
      $link = mysqli_connect("localhost", "root", "", "web");
      if (!$link) {
      die('Erreur de connexion');
      } else {
      //echo 'Succès... ';
      }

      $requete = "SELECT * FROM hall_of_fame ORDER BY score DESC LIMIT 3";

      if ($retour = mysqli_query ($link, $requete)){
        while ($ligne = mysqli_fetch_assoc($retour)) {
            $data[] = $ligne;
      }
      echo(json_encode($data, JSON_NUMERIC_CHECK));
    }
?>
