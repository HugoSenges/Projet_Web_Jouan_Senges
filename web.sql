-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 05 déc. 2018 à 18:19
-- Version du serveur :  5.7.17
-- Version de PHP :  7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `web`
--

-- --------------------------------------------------------

--
-- Structure de la table `hall_of_fame`
--

CREATE TABLE `hall_of_fame` (
  `id` int(11) NOT NULL,
  `pseudo` text NOT NULL,
  `score` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `hall_of_fame`
--

INSERT INTO `hall_of_fame` (`id`, `pseudo`, `score`) VALUES
(1, 'Typhaine', 200),
(2, 'Hugo', 180),
(3, 'PBodin', 250),
(4, 'JSon', 891.453);

-- --------------------------------------------------------

--
-- Structure de la table `objets`
--

CREATE TABLE `objets` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `img_path` text NOT NULL,
  `zoom` int(11) NOT NULL,
  `lat` float NOT NULL,
  `longi` float NOT NULL,
  `indice` text NOT NULL,
  `recupere` tinyint(1) NOT NULL,
  `affiche` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `objets`
--

INSERT INTO `objets` (`id`, `nom`, `img_path`, `zoom`, `lat`, `longi`, `indice`, `recupere`, `affiche`) VALUES
(1, 'ami', 'ami.png', 10, 4.097, -52.681, '', 0, 1),
(2, 'carte', 'carte.png', 8, 4.8196, -52.3637, 'J ai entendu dire qu un ami indigene t attendais a la frontiere bresilienne a l est, n hesite pas a bien la parcourir du nord au sud bon voyage', 0, 1),
(3, 'indigene', 'indigene.png', 11, 3.858, -51.826, 'Zabaicnoeautviaoceinsom aonxiveint  Trouve un decodeur pour dechiffrer ce qu il raconte', 0, 1),
(4, 'decodeur', 'decodeur.png', 13, 3.896, -51.804, 'decodeur', 1, 1),
(5, 'ariane', 'ariane.png', 11, 5.221, -52.769, 'Vas sur l ile du Diable ton ami n est pas ici', 0, 1),
(6, 'guide', 'guide.png', 14, 5.2927, -52.5842, 'Bienvenue sur mon ile  Ton ami n est pas ici mais je sais ou il se trouve suit moi vers le sud a l endroit du lac de Petit Saut vite le temps presse', 0, 1),
(7, 'pirogue', 'pirogue.png', 10, 5.065, -53.046, 'Une fois mon code deverrouille tu iras au centre de la Reserve Naturelle des Nouragues', 0, 1),
(8, 'prison', 'prison.png', 10, 4.097, -52.681, 'Trouve la cle s il te plait', 1, 1),
(9, 'cle', 'cle.png', 14, 4.0527, -52.6926, 'cle', 1, 1),
(10, 'reverse', 'indigene_reverse.wav', 0, 0, 0, '', 0, 1),
(11, 'indigene_forward', 'indigene_forward.wav', 0, 0, 0, '0', 0, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `hall_of_fame`
--
ALTER TABLE `hall_of_fame`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `objets`
--
ALTER TABLE `objets`
  ADD UNIQUE KEY `index_objet` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `hall_of_fame`
--
ALTER TABLE `hall_of_fame`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
