-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 28 nov. 2025 à 08:27
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `school_attendance`
--

-- --------------------------------------------------------

--
-- Structure de la table `attendance_records`
--

DROP TABLE IF EXISTS `attendance_records`;
CREATE TABLE IF NOT EXISTS `attendance_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `status` enum('present','absent') COLLATE utf8mb4_general_ci DEFAULT 'absent',
  `recorded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  KEY `student_id` (`student_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `attendance_sessions`
--

DROP TABLE IF EXISTS `attendance_sessions`;
CREATE TABLE IF NOT EXISTS `attendance_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `group_id` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `session_date` date NOT NULL,
  `opened_by` int NOT NULL,
  `status` enum('open','closed') COLLATE utf8mb4_general_ci DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `attendance_sessions`
--

INSERT INTO `attendance_sessions` (`id`, `course_id`, `group_id`, `session_date`, `opened_by`, `status`, `created_at`) VALUES
(1, 'MATH101', 'G1', '2024-01-15', 1, 'open', '2025-11-27 23:13:42'),
(2, 'PHY101', 'G2', '2024-01-16', 1, 'closed', '2025-11-27 23:13:42');

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `matricule` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `group_id` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricule` (`matricule`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `students`
--

INSERT INTO `students` (`id`, `fullname`, `matricule`, `group_id`) VALUES
(1, 'John Doe', 'STD001', 'G1'),
(2, 'Jane Smith', 'STD002', 'G1'),
(3, 'Bob Johnson', 'STD003', 'G2'),
(4, 'Test Student', '999', 'GTest'),
(5, 'Test User', '106', 'G1'),
(6, 'Debug Test', '107', 'G1'),
(7, 'Jean Dupont', '108', 'G1'),
(8, 'pierre martin', '100', 'G3'),
(9, 'yassmine yassmine', '234', 'G3'),
(10, 'samir samir', '245', 'G4'),
(11, 'anis anis', '000', 'G4');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
