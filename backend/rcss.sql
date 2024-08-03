-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 03, 2024 at 04:36 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rcss`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sem` int NOT NULL DEFAULT '1',
  `level` enum('UG','PG') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`cid`, `cname`, `sem`, `level`) VALUES
(1, 'MCA', 1, 'PG'),
(2, 'MCA', 2, 'PG'),
(3, 'BCA', 1, 'UG'),
(4, 'BCA', 2, 'UG');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `sname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cid` int NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `Subjects_cid_fkey` (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`sid`, `sname`, `cid`) VALUES
(1, 'DCCN', 1),
(2, 'OS', 1),
(3, 'C', 1),
(4, 'DBMS', 2),
(5, 'AI', 2),
(6, 'SE', 2),
(7, 'JAVA', 3),
(8, 'SPRING', 3),
(9, 'PHP', 3),
(10, 'LARAVEL', 3),
(11, 'PYTHON', 4),
(12, 'DJANGO', 4),
(13, 'JS', 4),
(14, 'REACT', 4);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`tid`, `tname`) VALUES
(1, 'SABEEN'),
(2, 'KEERTHY'),
(3, 'ANN'),
(4, 'SUNU'),
(5, 'FATHIMA'),
(6, 'SHOBY'),
(7, 'DILJITH'),
(8, 'ANAS'),
(9, 'SHIJU'),
(10, 'PRIYANKA'),
(11, 'NEETHU'),
(12, 'KIRAN'),
(13, 'SHAJU'),
(14, 'BINDYA');

-- --------------------------------------------------------

--
-- Table structure for table `timeslots`
--

DROP TABLE IF EXISTS `timeslots`;
CREATE TABLE IF NOT EXISTS `timeslots` (
  `tsid` int NOT NULL AUTO_INCREMENT,
  `starttime` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endtime` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tsid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timeslots`
--

INSERT INTO `timeslots` (`tsid`, `starttime`, `endtime`) VALUES
(1, '9:00', '11:00'),
(2, '11:00', '1:00'),
(3, '2:00', '4:00'),
(4, '9:30', '11:00'),
(5, '11:00', '12:30'),
(6, '1:00', '2:30'),
(7, '2:30', '4:00');

-- --------------------------------------------------------

--
-- Table structure for table `timetables`
--

DROP TABLE IF EXISTS `timetables`;
CREATE TABLE IF NOT EXISTS `timetables` (
  `ttid` int NOT NULL AUTO_INCREMENT,
  `day` enum('MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MONDAY',
  `cid` int NOT NULL,
  `tsid` int NOT NULL,
  `tid` int NOT NULL,
  `sid` int NOT NULL,
  PRIMARY KEY (`ttid`),
  KEY `TimeTables_sid_fkey` (`sid`),
  KEY `TimeTables_cid_fkey` (`cid`),
  KEY `TimeTables_tid_fkey` (`tid`),
  KEY `TimeTables_tsid_fkey` (`tsid`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timetables`
--

INSERT INTO `timetables` (`ttid`, `day`, `cid`, `tsid`, `tid`, `sid`) VALUES
(1, 'MONDAY', 1, 1, 1, 1),
(2, 'MONDAY', 1, 2, 2, 2),
(3, 'MONDAY', 1, 3, 3, 3),
(4, 'MONDAY', 2, 1, 4, 4),
(5, 'MONDAY', 2, 2, 5, 5),
(6, 'MONDAY', 2, 3, 6, 6),
(7, 'MONDAY', 3, 4, 7, 7),
(8, 'MONDAY', 3, 5, 8, 8),
(9, 'MONDAY', 3, 6, 9, 9),
(10, 'MONDAY', 3, 7, 10, 10),
(11, 'MONDAY', 4, 4, 11, 11),
(12, 'MONDAY', 4, 5, 12, 12),
(13, 'MONDAY', 4, 6, 13, 13),
(14, 'MONDAY', 4, 7, 14, 14);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0bdc9b68-0b1c-40ef-8f89-665837d5c2e2', 'e7a3118cc8fe7bfc5bc8f986400695330866dc777294a56f9da25fbed29accb4', '2024-08-03 16:12:05.238', '20240801155151_test', NULL, NULL, '2024-08-03 16:12:05.155', 1),
('72c01c05-eb5d-414c-acd6-92b1b353ae2e', '4027d6edf19ce49ac0e91df247a1ce89eb40371b1156ffe32070b0a218f1f1f1', '2024-08-03 16:12:05.422', '20240801181138_fixes', NULL, NULL, '2024-08-03 16:12:05.239', 1),
('1f76981c-75b0-4519-af89-de67d06f30bd', '6025549c1be4e4fd088692239c385124afefd3ea616526ede75d4ddf4fa860ab', '2024-08-03 16:12:15.615', '20240803161215_final', NULL, NULL, '2024-08-03 16:12:15.271', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
