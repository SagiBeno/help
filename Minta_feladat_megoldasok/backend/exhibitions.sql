-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 22. 05:06
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `exhibitions`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `museums`
--

CREATE TABLE IF NOT EXISTS `museums` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `anchor` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `museums`
--

INSERT IGNORE INTO `museums` (`id`, `name`, `city`, `anchor`, `image`) VALUES
(1, 'Cifra palota', 'Kecskemét', '/images/Kecskemet_cimer.jpeg', '/images/Cifra_Palota.jpg'),
(2, 'Kiskun Múzeum', 'Kiskunfélegyháza', '/images/Kiskunfelegyhaza_cimer.jpg', '/images/Kiskun_muzeum.jpg'),
(3, 'Magyar Nemzeti Múzeum', 'Budapest', '/images/Budapest_cimer.jpg', '/images/Magyar_Nemzeti_Muzeum_Budapest.jpg'),
(4, 'Memento Szoborpark', 'Budapest', '/images/Budapest_cimer.jpg', '/images/Memento_Szoborpark.jpg'),
(5, 'Csavarhúzó és Cukorkák Múzeuma', 'Szeged', NULL, NULL),
(6, 'Zokni Régészeti Központ', 'Pécs', NULL, NULL),
(7, 'Kacagó Kódolók Emlékháza', 'Debrecen', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `types`
--

CREATE TABLE IF NOT EXISTS `types` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `types`
--

INSERT IGNORE INTO `types` (`id`, `name`) VALUES
(1, 'class trip'),
(2, 'family visit'),
(3, 'private'),
(4, 'guided tour'),
(5, 'night opening'),
(6, 'themed workshop');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `visits`
--

CREATE TABLE IF NOT EXISTS `visits` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `visit_time` float DEFAULT 1,
  `museum_id` int(10) UNSIGNED DEFAULT NULL,
  `type_id` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `museum_id` (`museum_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_2` FOREIGN KEY (`museum_id`) REFERENCES `museums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `visits`
--

INSERT IGNORE INTO `visits` (`id`, `name`, `description`, `visit_time`, `museum_id`, `type_id`) VALUES
(1, 'Kolompár Dionüszosz', '13/X osztálykirándulás a budapesti Nemzeti Múzeumba', 3.5, 3, 1),
(2, 'Sztojka Amarillisz', '13/X osztálykirándulás a budapesti Nemzeti Múzeumba', 3.5, 3, 1),
(3, 'Rosenberg Saul', 'kiállítás látogatás családdal', 2, 1, 2),
(4, 'Lakatos Rodrigez', 'egyéni látogatás a szoborparkba', 2.5, 4, 3),
(5, 'Bödön Töhötöm', 'éjszakai nyitás, fejlámpás körbevezetés', 1.5, 5, 5),
(6, 'Kecsap Ilona', 'családi látogatás a csavarhúzó-gyűjteményben', 2.25, 5, 2),
(7, 'Paca Pál', 'tematikus műhely: hogyan restauráljunk zoknit?', 2, 6, 6),
(8, 'Derűs Dömötör', 'vezetett tárlatvezetés a legendás lyukas zoknikról', 1.75, 6, 4),
(9, 'Málna Mirkó', 'privát kódtörténeti séta retro számítógépekkel', 2.5, 7, 3),
(10, 'Bit Bori', 'osztálykirándulás a kódolók emlékházába', 3, 7, 1),
(11, 'Csipke Csongor', 'családi látogatás, puzzle-alapú kiállításbejárás', 2, 7, 2),
(12, 'Krumpli Karola', 'vezetett túra a Memento Szoborparkban', 2.25, 4, 4),
(13, 'Lufi Levente', 'éjszakai nyitás: fényfestés a Cifra palotán', 1.25, 1, 5),
(14, 'Cseresznye Cecília', 'tematikus foglalkozás: történelmi jelvénykészítés', 2.75, 2, 6),
(15, 'Pöttyös Patrik', 'vezetett látogatás a Nemzeti Múzeum időszaki tárlatán', 2.5, 3, 4),
(16, 'Mogyoró Mónika', 'baráti privát látogatás a Cifra palotában', 1.75, 1, 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
