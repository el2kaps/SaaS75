CREATE TABLE `users` (
 `UserID` int unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
 PRIMARY KEY (`UserID`),
 UNIQUE KEY `email` (`email`)
) AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `questions` (
 `Q_ID` int unsigned NOT NULL AUTO_INCREMENT,
 `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 `text` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL,
 `posted_date` datetime,
 `number_of_answers` int,
 `UserID` int unsigned NOT NULL,
 FOREIGN KEY (`UserID`) REFERENCES users(UserID),
 PRIMARY KEY (`Q_ID`)
) AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `answers` (
 `A_ID` int unsigned NOT NULL AUTO_INCREMENT,
 `text` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL,
 `posted_date` datetime,
 `Q_ID` int unsigned NOT NULL,
 `UserID` int unsigned NOT NULL,
 PRIMARY KEY (`A_ID`),
 FOREIGN KEY (`Q_ID`) REFERENCES questions(Q_ID),
 FOREIGN KEY (`UserID`) REFERENCES users(UserID)
) AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `keywords` (
 `keyword` varchar(50) COLLATE utf8mb4_unicode_ci,
 PRIMARY KEY (`keyword`)
) CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `has_keyword` (
 `keyword` varchar(50) NOT NULL COLLATE utf8mb4_unicode_ci,
 `Q_ID` int unsigned NOT NULL,
 FOREIGN KEY (`Q_ID`) REFERENCES questions(Q_ID),
 FOREIGN KEY (`keyword`) REFERENCES keywords(keyword)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
