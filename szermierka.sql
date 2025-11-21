-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Paź 16, 2025 at 11:08 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `szermierka`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payments`
--

CREATE TABLE `payments` (
  `paymentID` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentDate` datetime DEFAULT NULL,
  `dueDate` datetime DEFAULT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`paymentID`, `amount`, `paymentDate`, `dueDate`, `userID`) VALUES
(17, 100.00, '2025-10-15 01:54:46', '2025-09-16 09:00:00', 13),
(18, 45.00, '2025-10-16 22:37:12', '2025-09-15 09:00:00', 14),
(19, 70.00, '2025-09-05 09:00:00', '2025-09-05 09:00:00', 15),
(20, 20.00, NULL, '2025-10-20 09:00:00', 15),
(22, 35.00, '2025-10-14 21:44:20', '2025-10-14 21:44:20', 13),
(23, 35.00, '2025-10-14 21:44:20', '2025-10-14 21:44:20', 14),
(24, 35.00, '2025-10-14 21:44:20', '2025-10-14 21:44:20', 15),
(28, 35.00, '2025-10-14 21:44:20', '2025-10-14 21:44:20', 16),
(41, 35.00, NULL, '2025-10-15 00:36:00', 15),
(45, 35.00, NULL, '2025-10-15 00:36:00', 16),
(56, 0.02, '2025-10-30 00:00:00', '2025-10-14 00:00:00', 14),
(57, 30.00, '2025-10-31 00:00:00', '2025-10-17 00:00:00', 16),
(59, 0.02, '2025-10-30 01:29:00', '2025-10-15 01:29:00', 13),
(60, 50.00, '2025-10-15 01:55:15', '2025-11-07 01:30:00', 13),
(61, 1000.00, '2025-10-15 01:54:02', '2025-11-07 01:30:00', 13),
(65, 0.03, '2025-10-29 00:00:00', '2025-10-23 00:00:00', 17),
(67, 35.00, NULL, '2025-11-30 00:00:00', 13),
(68, 35.00, NULL, '2025-11-30 00:00:00', 14),
(69, 35.00, NULL, '2025-11-30 00:00:00', 15),
(70, 35.00, NULL, '2025-11-30 00:00:00', 18),
(74, 35.00, NULL, '2025-11-30 00:00:00', 16),
(75, 35.00, '2025-10-16 22:37:04', '2025-11-30 00:00:00', 17);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `photos`
--

CREATE TABLE `photos` (
  `photoID` int(11) NOT NULL,
  `photoDescription` varchar(255) DEFAULT NULL,
  `content` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `postcategory`
--

CREATE TABLE `postcategory` (
  `postCategoryID` int(11) NOT NULL,
  `postCategoryName` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `postcategory`
--

INSERT INTO `postcategory` (`postCategoryID`, `postCategoryName`, `description`) VALUES
(1, 'Ogłoszenia', 'Ważne informacje dotyczące klubu, treningów i wydarzeń.'),
(2, 'Dyskusje techniczne', 'Analiza technik, strategii i teorii szermierczych.'),
(3, 'Treningi', 'Relacje z treningów, plany zajęć i wskazówki dla uczestników.'),
(4, 'Sprzęt', 'Dyskusje na temat broni, ochrony i wyposażenia szermierczego.'),
(5, 'Turnieje', 'Informacje o zawodach, wyniki i relacje uczestników.'),
(6, 'Off-topic', 'Luźne rozmowy niezwiązane bezpośrednio z szermierką.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `postphoto`
--

CREATE TABLE `postphoto` (
  `postID` int(11) NOT NULL,
  `photoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `postID` int(11) NOT NULL,
  `postTopic` varchar(100) NOT NULL,
  `content` text DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `postCategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ranks`
--

CREATE TABLE `ranks` (
  `rankID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ranks`
--

INSERT INTO `ranks` (`rankID`, `name`, `description`) VALUES
(1, 'Administrator', 'Ma pełną władzę nad bazą danych i zarządza płatnościami.'),
(2, 'Trener', 'Może wstawiać posty i treningi (w tym ich termin, miejsce i tematykę).'),
(3, 'Użytkownik', 'Zwykły uczestnik');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `trainings`
--

CREATE TABLE `trainings` (
  `trainingID` int(11) NOT NULL,
  `trainingDate` datetime NOT NULL,
  `trainingPlace` varchar(100) DEFAULT NULL,
  `trainingDetails` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trainings`
--

INSERT INTO `trainings` (`trainingID`, `trainingDate`, `trainingPlace`, `trainingDetails`) VALUES
(1, '2025-09-02 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi i techniki podstawowe - głównie szabla'),
(2, '2025-09-04 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: nauka taktyki i techniki miecza'),
(3, '2025-09-09 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi, praca nad postawą i unikami'),
(4, '2025-09-11 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: taktyka i ćwiczenia walki w parach'),
(5, '2025-09-16 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: lżejsze sparringi i techniki ofensywne'),
(6, '2025-09-18 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: taktyka szabli i miecza, nauka kombinacji'),
(7, '2025-09-23 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi, praca nad czasem reakcji'),
(8, '2025-09-25 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: taktyka i ćwiczenia scenariuszowe'),
(9, '2025-09-30 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi, nauka obrony mieczem'),
(10, '2025-10-02 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: taktyczne scenariusze walki w parach'),
(11, '2025-10-07 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi, lżejsza nauka technik ofensywnych'),
(12, '2025-10-09 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: taktyka i techniki obronne'),
(13, '2025-10-14 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi i praca nad dokładnością uderzeń'),
(14, '2025-10-16 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: nauka kombinacji szabli i miecza'),
(15, '2025-10-21 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: lżejsze sparringi i praca nad kontrolą dystansu'),
(16, '2025-10-23 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: taktyczne ćwiczenia grupowe'),
(17, '2025-10-28 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi i techniki ofensywne'),
(18, '2025-10-30 17:30:00', 'Sala gimnastyczna Pentagon', 'Czwartkowy trening HEMA: taktyka, nauka nowych kombinacji'),
(19, '2025-11-04 17:00:00', 'Kazamaty', 'Wtorkowy trening HEMA: sparringi, poprawa techniki ciosów'),
(34, '2025-10-08 00:14:00', 'asdasd', 'adadasd'),
(36, '2025-10-31 22:29:00', 'Kazamaty', 'Zwykłe sprarringi');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `registrationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `lastLog` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `rankID` int(11) NOT NULL,
  `deactivated` tinyint(1) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `login`, `password`, `email`, `registrationDate`, `lastLog`, `description`, `rankID`, `deactivated`, `name`, `surname`) VALUES
(13, 'testowyUser', '$2b$10$KMx0EijaQk2Bs3hGDihdoeM7CiuuueEvcT/svoVkRADi02YbCdZ6G', 'testowyUser@gmail.com', '2025-09-30 21:46:08', '2025-09-30 21:46:08', 'tetststset', 1, 0, 'Jacek', 'Placek'),
(14, 'testowyUser2', '$2b$10$8oDWZM3JaHwbUQ704Pos7u5KCBkpMuL0C9ZwcrOASkuwfWdYhtdJy', 'testowyUser2@gmail.com', '2025-09-30 23:00:19', '2025-09-30 23:00:19', 'Hasło to testtest', 1, 0, 'Jacek', 'Placek'),
(15, 'testowyUser3', '$2b$10$6aDtI6kRIBUBKrSz9ISliePSfcGPZGkIMhRe7TqLdwS4R42IL882S', 'testowyUser3@gmail.com', '2025-09-30 23:02:59', '2025-09-30 23:02:59', 'Hasło to testtest', 1, 0, 'Jacek', 'Placek'),
(16, 'testUser4', '$2b$10$5WUwq8srSxQSXS/O5sPivOtpKhIpwtLzh7DN73keU1NfEeDFr/jFO', 'testUser4@test.com', '2025-10-13 00:44:05', '2025-10-13 00:44:05', 'Hasło to testtest', 3, 1, 'Jacek', 'Placek'),
(17, 'testowyUser5', '$2b$10$KjRnRGuOC62YnWGnlz6KdegQo53x4s1otc2ZlawCgJr4lh4Gxb.Pu', 'testowyUser5@gmail.com', '2025-10-15 22:53:55', '2025-10-15 22:53:55', 'Mój nowy opis', 3, 0, 'Test Test', 'Test-Test'),
(18, 'GalaxyDestroyer', '$2b$10$RMmSH0vzDtHR7ZiPrE6rnuiQSlbF2hKqKIlF1//1oHIVSLZMiF4V.', 'test6@test.com', '2025-10-16 22:26:26', '2025-10-16 22:26:26', 'My name is Maximus Decimus Meridius, commander of the Armies of the North, General of the Felix Legions. ', 1, 0, 'Bolek', 'Bolek-Lolek');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`paymentID`),
  ADD KEY `userID` (`userID`);

--
-- Indeksy dla tabeli `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`photoID`);

--
-- Indeksy dla tabeli `postcategory`
--
ALTER TABLE `postcategory`
  ADD PRIMARY KEY (`postCategoryID`),
  ADD UNIQUE KEY `postCategoryName` (`postCategoryName`);

--
-- Indeksy dla tabeli `postphoto`
--
ALTER TABLE `postphoto`
  ADD PRIMARY KEY (`postID`,`photoID`),
  ADD KEY `photoID` (`photoID`);

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `postCategoryID` (`postCategoryID`);

--
-- Indeksy dla tabeli `ranks`
--
ALTER TABLE `ranks`
  ADD PRIMARY KEY (`rankID`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `trainings`
--
ALTER TABLE `trainings`
  ADD PRIMARY KEY (`trainingID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rankID` (`rankID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `paymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `photoID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `postcategory`
--
ALTER TABLE `postcategory`
  MODIFY `postCategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ranks`
--
ALTER TABLE `ranks`
  MODIFY `rankID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trainings`
--
ALTER TABLE `trainings`
  MODIFY `trainingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `postphoto`
--
ALTER TABLE `postphoto`
  ADD CONSTRAINT `postphoto_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `postphoto_ibfk_2` FOREIGN KEY (`photoID`) REFERENCES `photos` (`photoID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`postCategoryID`) REFERENCES `postcategory` (`postCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rankID`) REFERENCES `ranks` (`rankID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
