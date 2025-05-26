-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 09:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `image_url`, `description`, `category`) VALUES
(1, 'sepeda', 11111.00, 2, 'Unknown column \'description\' in \'field list\'', 'sepeda shiva', NULL),
(2, 'LAPTOP ASUS VIVOBOOK FLIP 14', 99999999.99, 1, 'https://sl.bing.net/ePvuVRMaZsy', 'ini laptop', NULL),
(3, 'Bagas', 1000.00, 1, 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png', 'kntl', NULL),
(4, 'Baju Jamet', 50000.00, 1, 'https://i0.wp.com/ecs7.tokopedia.net/img/cache/700/product-1/2020/1/21/474559841/474559841_628e7e49-ec3e-4f49-8544-0ec9827ed1cb_576_576.jpg', 'ini baju jamet ges', 'fashion'),
(5, 'love', 99999999.99, 4, '/uploads/1748255689263.jpeg', 'cinta', 'health'),
(9, 'mobil', 88888.00, 23, '/uploads/1748256871640.jpeg', 'ini mobil', 'fashion'),
(10, 'windy', 1000.00, 100, '/uploads/1748288038412.jpg', 'lonte', 'children');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
