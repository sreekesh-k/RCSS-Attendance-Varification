-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 01, 2024 at 08:32 AM
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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('UG','PG') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`cid`, `cname`, `level`) VALUES
(1, 'MCA', 'PG'),
(2, 'BCA', 'UG');

-- --------------------------------------------------------

--
-- Table structure for table `coursesubjects`
--

DROP TABLE IF EXISTS `coursesubjects`;
CREATE TABLE IF NOT EXISTS `coursesubjects` (
  `csid` int NOT NULL AUTO_INCREMENT,
  `cid` int NOT NULL,
  `sid` int NOT NULL,
  PRIMARY KEY (`csid`),
  KEY `CourseSubjects_cid_fkey` (`cid`),
  KEY `CourseSubjects_sid_fkey` (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coursesubjects`
--

INSERT INTO `coursesubjects` (`csid`, `cid`, `sid`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `sname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`sid`, `sname`) VALUES
(1, 'C++'),
(2, 'C'),
(3, 'JAVA'),
(4, 'PYTHON'),
(5, 'AI'),
(6, 'ACCOUNTANCY'),
(7, 'PROBABILITY'),
(8, 'WTL');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE IF NOT EXISTS `teacher` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`tid`, `tname`) VALUES
(1, 'SUNU'),
(2, 'SHIJU'),
(3, 'DILJITH'),
(4, 'SABEEN'),
(5, 'KEERTHY'),
(6, 'BINDYA'),
(7, 'ANN'),
(8, 'ANAS');

-- --------------------------------------------------------

--
-- Table structure for table `teacherteachessubject`
--

DROP TABLE IF EXISTS `teacherteachessubject`;
CREATE TABLE IF NOT EXISTS `teacherteachessubject` (
  `ttsid` int NOT NULL AUTO_INCREMENT,
  `tid` int NOT NULL,
  `sid` int NOT NULL,
  PRIMARY KEY (`ttsid`),
  KEY `TeacherTeachesSubject_tid_fkey` (`tid`),
  KEY `TeacherTeachesSubject_sid_fkey` (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teacherteachessubject`
--

INSERT INTO `teacherteachessubject` (`ttsid`, `tid`, `sid`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8);

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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timeslots`
--

INSERT INTO `timeslots` (`tsid`, `starttime`, `endtime`) VALUES
(2, '9:00', '11:00'),
(3, '11:00', '1:00'),
(4, '2:00', '4:00'),
(5, '9:30', '11:00'),
(6, '11:00', '12:30'),
(7, '1:00', '2:30'),
(8, '2:30', '4:00');

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

DROP TABLE IF EXISTS `timetable`;
CREATE TABLE IF NOT EXISTS `timetable` (
  `ttid` int NOT NULL AUTO_INCREMENT,
  `day` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cid` int NOT NULL,
  `tsid` int NOT NULL,
  `ttsid` int NOT NULL,
  PRIMARY KEY (`ttid`),
  KEY `Timetable_cid_fkey` (`cid`),
  KEY `Timetable_tsid_fkey` (`tsid`),
  KEY `Timetable_ttsid_fkey` (`ttsid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`ttid`, `day`, `cid`, `tsid`, `ttsid`) VALUES
(1, 'MONDAY', 1, 2, 1),
(2, 'MONDAY', 1, 3, 2),
(3, 'MONDAY', 1, 4, 3),
(4, 'MONDAY', 2, 5, 4),
(5, 'MONDAY', 2, 6, 5),
(6, 'MONDAY', 2, 7, 6),
(7, 'MONDAY', 2, 8, 7);

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
('5b391526-992f-478f-9eb1-b46527946b73', 'c3ebeac9c6e88559b5d978026cc10e00e5920978d65e3d4487297bd646feadd2', '2024-08-01 08:13:47.519', '20240731112116_init', NULL, NULL, '2024-08-01 08:13:47.510', 1),
('2886120f-25eb-468a-880b-73742257442b', 'a84e80f5988958b16113dfc3669ce0567245fceb8f608206b2a52ef585a77133', '2024-08-01 08:13:47.812', '20240801043646_new_changes', NULL, NULL, '2024-08-01 08:13:47.527', 1),
('392cab7e-9b67-4947-b993-217519c1adaf', '75201a1da104258b579b67c2cee7b20b0cc568b1ae66cb702cb37a1403677a2c', '2024-08-01 08:13:48.409', '20240801044955_new', NULL, NULL, '2024-08-01 08:13:47.819', 1),
('b025b74e-c351-4520-bc82-4f2f9c3f0034', 'a3752abab6596ed8d2a1b19cc31f435fe159bd84ae0b7f6585dc88609b8c6459', '2024-08-01 08:13:48.796', '20240801073714_final_changes', NULL, NULL, '2024-08-01 08:13:48.416', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
