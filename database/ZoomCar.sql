-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 13, 2023 at 10:40 AM
-- Server version: 8.0.33-0ubuntu0.20.04.1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ZoomCar`
--

-- --------------------------------------------------------

--
-- Table structure for table `car_details`
--

CREATE TABLE `car_details` (
  `id` bigint UNSIGNED NOT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `fuel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gearbox` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `car_details`
--

INSERT INTO `car_details` (`id`, `brand`, `model`, `price`, `fuel`, `gearbox`, `availability`, `image`, `created_at`, `updated_at`) VALUES
(27, 'Maruti', 'Baleno', 5000, 'Diesel', 'AMT', 0, 'baleno.jpeg', '2023-04-28 05:09:03', '2023-05-12 09:34:47'),
(28, 'Mercedes', 'GlS 100', 25000, 'Petrol', 'CVT', 1, 'glas 100.jpeg', '2023-04-28 06:07:42', '2023-05-03 03:53:12'),
(30, 'Maruti', 'Fronx', 7665, 'Diesel', 'CVT', 0, 'fonx.jpeg', '2023-04-28 07:05:06', '2023-05-03 00:08:39'),
(32, 'Audi', 'A6', 15000, 'Petrol', 'AMT', 1, 'A6.jpeg', '2023-05-01 02:34:57', '2023-05-02 23:47:09'),
(33, 'Maruti', 'Wagon-R', 2000, 'Petrol', 'Manual', 1, 'wagon.jpeg', '2023-05-02 23:57:03', '2023-05-03 03:53:19');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_04_27_090039_create_car_details_table', 2),
(6, '2023_05_02_044238_create_rent_details_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rent_details`
--

CREATE TABLE `rent_details` (
  `id` bigint UNSIGNED NOT NULL,
  `userid` int NOT NULL,
  `carid` int NOT NULL,
  `price` int NOT NULL,
  `rental_date` date NOT NULL,
  `return_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rent_details`
--

INSERT INTO `rent_details` (`id`, `userid`, `carid`, `price`, `rental_date`, `return_date`, `created_at`, `updated_at`) VALUES
(1, 1, 27, 400000, '2023-05-18', '2023-05-26', '2023-05-02 07:40:39', '2023-05-02 07:40:39'),
(2, 1, 32, 60000, '2023-05-25', '2023-05-31', '2023-05-02 13:56:12', '2023-05-02 13:56:12'),
(3, 1, 32, 60000, '2023-05-25', '2023-05-31', '2023-05-02 13:56:16', '2023-05-02 13:56:16'),
(4, 1, 32, 60000, '2023-05-25', '2023-05-31', '2023-05-02 13:56:19', '2023-05-02 13:56:19'),
(5, 1, 32, 60000, '2023-05-25', '2023-05-31', '2023-05-02 13:56:21', '2023-05-02 13:56:21'),
(6, 1, 32, 60000, '2023-05-25', '2023-05-31', '2023-05-02 13:56:21', '2023-05-02 13:56:21'),
(7, 1, 32, 60000, '2023-05-25', '2023-05-31', '2023-05-02 13:56:21', '2023-05-02 13:56:21'),
(8, 1, 32, 60000, '2023-05-25', '2023-05-31', '2023-05-02 13:56:25', '2023-05-02 13:56:25'),
(9, 1, 28, 500000, '2023-05-17', '2023-05-27', '2023-05-02 13:58:36', '2023-05-02 13:58:36'),
(10, 1, 33, 2000, '2023-05-04', '2023-05-05', '2023-05-03 00:08:03', '2023-05-03 00:08:03'),
(11, 1, 30, 68985, '2023-05-10', '2023-05-19', '2023-05-03 00:08:39', '2023-05-03 00:08:39'),
(12, 1, 27, 35000, '2023-05-05', '2023-05-12', '2023-05-03 00:13:45', '2023-05-03 00:13:45'),
(13, 1, 27, 10000, '2023-05-10', '2023-05-12', '2023-05-03 00:20:53', '2023-05-03 00:20:53'),
(14, 1, 28, 225000, '2023-05-09', '2023-05-18', '2023-05-03 03:52:19', '2023-05-03 03:52:19'),
(15, 22, 27, 10000, '2023-05-12', '2023-05-14', '2023-05-12 08:38:50', '2023-05-12 08:38:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `IsAdmin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'sudhanshu', 'asawa@gmail.com', NULL, '$2y$10$OstBUQ2XCMunjij8pq7xIurHTN8AxxRTyqDEdWml7oQYWGeTsNwEu', 0, NULL, '2023-04-26 01:41:04', '2023-04-26 01:41:04'),
(2, 'sudhanshu', 'ankit@gmail.com', NULL, '$2y$10$AjSvbcxC5PUqjoFck0VFD.CAnICKrRdFhPq/Fq4M8iHsHNQOZbfWi', 0, NULL, '2023-04-26 01:56:09', '2023-04-26 01:56:09'),
(10, 'sudhanshu asawa', 'asawa1@gmail.com', NULL, '$2y$10$.NFmFcSwEm3C.6blCdmgPubrvWkc4nNoAkUiKf9uOzHgqAJUrkXLa', 0, NULL, '2023-04-26 03:13:31', '2023-04-26 03:13:31'),
(11, 'sakshi', 'sakshi@gmail.com', NULL, '$2y$10$KzdfTZ5iMe2kqsiTCb0bfOxNNSCU9dYZ4nCEBpAoWJxix5v/qZTMu', 0, NULL, '2023-04-26 05:49:15', '2023-04-26 05:49:15'),
(12, 'Admin', 'admin@gmail.com', NULL, '$2y$10$dUel0kbxDokmmOmA2MBcbe0/4Suh52jgr3Jh.gEnO/vTLooWUtkwi', 1, NULL, NULL, NULL),
(16, 'sudhanshu', 'ankit1@gmail.com', NULL, '$2y$10$E0mB37ckr4DDJX.mX4k5kOmdiNcSj.Pwq.jVU1uWzE2NKR.XHxNXy', 0, NULL, '2023-05-08 07:41:58', '2023-05-08 07:41:58'),
(17, 'sakshi', 'sakshi1@gmail.com', NULL, '$2y$10$urw7M/wfrq6MwG4BPJROiOiRRCeEB5.B5wHtNbEd3KTSOE/eM5ygm', 0, NULL, '2023-05-11 07:42:27', '2023-05-11 07:42:27'),
(18, 'sudhanshu Asawa', 'sudhanshu.asawa@sigmainfo.net', NULL, '$2y$10$yF/Blp.6ANRYxKGtSfmYte5N6cKrxe3nd.nl15ToMXAvPxBiRV9Xa', 0, NULL, '2023-05-11 21:20:46', '2023-05-11 21:20:46'),
(19, 'sudhanshu ankit', 'ankit123@gmail.com', NULL, '$2y$10$0xFY1jct1OS5YJPgcIU1X.PVfLbjbYbKZluFGnguuWo2wQ1Ououim', 0, NULL, '2023-05-11 21:28:51', '2023-05-11 21:28:51'),
(20, 'sudhanshu u', 'ankithgjy@gmail.com', NULL, '$2y$10$cwyBRN8HbIo6tll2VdQCH.vYaZAWiwrHuMVqjb/Cgxqo4GtjJbBqG', 0, NULL, '2023-05-11 21:31:00', '2023-05-11 21:31:00'),
(21, 'sudhanshu sd', 'su@gmail.com', NULL, '$2y$10$U6ZxN2aTEzRcgzvZIpiJIOtpP1rzsHM10bSPoHl4nn2BL7FFJwNMa', 0, NULL, '2023-05-11 21:32:14', '2023-05-11 21:32:14'),
(22, 'Niket', 'niket@gmail.com', NULL, '$2y$10$Eh7aePS87BUp2OJ7SN3OkOKLpHA.EdC21lIpNHwnLlkYLIqHzjozi', 0, NULL, '2023-05-12 08:00:57', '2023-05-12 08:00:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car_details`
--
ALTER TABLE `car_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `rent_details`
--
ALTER TABLE `rent_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car_details`
--
ALTER TABLE `car_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rent_details`
--
ALTER TABLE `rent_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
