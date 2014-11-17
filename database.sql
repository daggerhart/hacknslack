-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 17, 2014 at 05:00 PM
-- Server version: 5.5.37-0ubuntu0.14.04.1
-- PHP Version: 5.5.14-2+deb.sury.org~trusty+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `demo_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `adventures`
--

CREATE TABLE IF NOT EXISTS `adventures` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `encounters` text NOT NULL,
  `current_encounter` int(11) NOT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pcs`
--

CREATE TABLE IF NOT EXISTS `pcs` (
  `pcid` int(11) NOT NULL AUTO_INCREMENT,
  `slack_user_id` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `details` text NOT NULL,
  `equipment` text NOT NULL,
  `inventory` text NOT NULL,
  `current_aid` int(11) NOT NULL,
  PRIMARY KEY (`pcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `slack_user_id` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `current_pcid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
