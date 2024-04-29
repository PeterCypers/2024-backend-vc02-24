CREATE DATABASE  IF NOT EXISTS `sdp2_2324_db_vc02` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sdp2_2324_db_vc02`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sdp2_2324_db_vc02
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `GEBRUIKERID` int NOT NULL,
  PRIMARY KEY (`GEBRUIKERID`),
  CONSTRAINT `FK_ADMINISTRATOR_GEBRUIKERID` FOREIGN KEY (`GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (74);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bedrijf`
--

DROP TABLE IF EXISTS `bedrijf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bedrijf` (
  `NAAM` varchar(255) NOT NULL,
  `BTWNR` varchar(255) DEFAULT NULL,
  `EMAILADRES` varchar(255) DEFAULT NULL,
  `ISACTIEF` tinyint(1) DEFAULT '0',
  `LOGO` varchar(255) DEFAULT NULL,
  `REKENINGNUMMER` varchar(255) DEFAULT NULL,
  `SECTOR` varchar(255) DEFAULT NULL,
  `TELEFOONNUMMER` varchar(255) DEFAULT NULL,
  `LAND` varchar(255) DEFAULT NULL,
  `POSTCODE` varchar(255) DEFAULT NULL,
  `STAD` varchar(255) DEFAULT NULL,
  `STRAAT` varchar(255) DEFAULT NULL,
  `STRAATNR` varchar(255) DEFAULT NULL,
  `KLANT_GEBRUIKERID` int DEFAULT NULL,
  `LEVERANCIER_GEBRUIKERID` int DEFAULT NULL,
  PRIMARY KEY (`NAAM`),
  KEY `FK_BEDRIJF_LEVERANCIER_GEBRUIKERID` (`LEVERANCIER_GEBRUIKERID`),
  KEY `FK_BEDRIJF_KLANT_GEBRUIKERID` (`KLANT_GEBRUIKERID`),
  CONSTRAINT `FK_BEDRIJF_KLANT_GEBRUIKERID` FOREIGN KEY (`KLANT_GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`),
  CONSTRAINT `FK_BEDRIJF_LEVERANCIER_GEBRUIKERID` FOREIGN KEY (`LEVERANCIER_GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bedrijf`
--

LOCK TABLES `bedrijf` WRITE;
/*!40000 ALTER TABLE `bedrijf` DISABLE KEYS */;
INSERT INTO `bedrijf` VALUES ('Ahold Delhaize','NL463774784B52','kim@gmail.com',1,'https://logodix.com/logo/420832.png','NL5253324545874212','Food Retail','+31659267802','Netherlands','3011','Rotterdam','Wolfshoek','7',12,11),('Bosch','DE41280756350','julia@web.de',1,'https://logodix.com/logo/9541.png','DE51166532731153542378','Household Appliances','+496591799946','Germany','60311','Frankfurt','Bendergasse','3',19,18),('Giorgio Armani','IT7410491107419','francesca@outlook.com',1,'https://logodix.com/logo/7528.jpg','IT1791517945179531495274127','Apparel Retail','+393713432912','Italy','20121','Milan','Piazza Luigi di Savoia','24',24,25),('Hewlett-Packard','749196976','mike@gmail.com',1,'https://logodix.com/logo/4934.png','317265174 - 97135791278174529377','Technology Hardware, Storage & Peripherals','(212)912-0384','United States','10001','New York','Broadway','20',14,13),('Ikea','SW6544167324132','matilda@outlook.com',1,'https://logodix.com/logo/470339.png','SE1245617983516498734578','Home Furnishings','+462252869831','Sweden','111 53','Stockholm','Svartensgatan','102',16,15),('Peugeot','FR4579135426784','christophe@outlook.com',1,'https://logodix.com/logo/9436.png','FR4565147832789145659823451','Automobile Manufacturers','+33124311738','France','31000','Toulouse','Rte de Narbonne','209',3,2),('Stella Artois','BE197248342B38','mark@outlook.be',1,'https://logodix.com/logo/2066282.png','BE16154215421625','Brewers','+32974178174','Belgium','1000','Brussels','Kerkstraat','1',1,4);
/*!40000 ALTER TABLE `bedrijf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bedrijf_betaalmethodes`
--

DROP TABLE IF EXISTS `bedrijf_betaalmethodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bedrijf_betaalmethodes` (
  `Bedrijf_NAAM` varchar(255) DEFAULT NULL,
  `BETAALMETHODES` varchar(255) NOT NULL,
  KEY `FK_Bedrijf_BETAALMETHODES_Bedrijf_NAAM` (`Bedrijf_NAAM`),
  CONSTRAINT `FK_Bedrijf_BETAALMETHODES_Bedrijf_NAAM` FOREIGN KEY (`Bedrijf_NAAM`) REFERENCES `bedrijf` (`NAAM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bedrijf_betaalmethodes`
--

LOCK TABLES `bedrijf_betaalmethodes` WRITE;
/*!40000 ALTER TABLE `bedrijf_betaalmethodes` DISABLE KEYS */;
INSERT INTO `bedrijf_betaalmethodes` VALUES ('Ikea','BANCONTACT'),('Ikea','VISA'),('Ikea','MAESTRO'),('Ikea','MASTERCARD'),('Peugeot','PAYCONIQ'),('Peugeot','BANCONTACT'),('Peugeot','APPLE_PAY'),('Peugeot','MAESTRO'),('Peugeot','MASTERCARD'),('Peugeot','VENMO'),('Ahold Delhaize','PAYCONIQ'),('Ahold Delhaize','ACHTERAF_BETALEN'),('Ahold Delhaize','BANCONTACT'),('Ahold Delhaize','VISA'),('Ahold Delhaize','APPLE_PAY'),('Ahold Delhaize','PAYPAL'),('Ahold Delhaize','VENMO'),('Giorgio Armani','PAYCONIQ'),('Giorgio Armani','ACHTERAF_BETALEN'),('Giorgio Armani','VISA'),('Giorgio Armani','APPLE_PAY'),('Giorgio Armani','PAYPAL'),('Giorgio Armani','VENMO'),('Stella Artois','PAYCONIQ'),('Stella Artois','ACHTERAF_BETALEN'),('Stella Artois','BANCONTACT'),('Stella Artois','VISA'),('Stella Artois','APPLE_PAY'),('Stella Artois','PAYPAL'),('Stella Artois','MAESTRO'),('Stella Artois','MASTERCARD'),('Stella Artois','VENMO'),('Hewlett-Packard','ACHTERAF_BETALEN'),('Hewlett-Packard','BANCONTACT'),('Hewlett-Packard','VISA'),('Hewlett-Packard','MAESTRO'),('Hewlett-Packard','MASTERCARD'),('Bosch','ACHTERAF_BETALEN'),('Bosch','BANCONTACT'),('Bosch','APPLE_PAY'),('Bosch','MAESTRO'),('Bosch','MASTERCARD');
/*!40000 ALTER TABLE `bedrijf_betaalmethodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `besteldproduct`
--

DROP TABLE IF EXISTS `besteldproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `besteldproduct` (
  `BESTELDPRODUCTID` int NOT NULL,
  `AANTAL` int DEFAULT NULL,
  `EENHEIDSPRIJS` double DEFAULT NULL,
  `PRODUCT_PRODUCTID` int DEFAULT NULL,
  PRIMARY KEY (`BESTELDPRODUCTID`),
  KEY `FK_BESTELDPRODUCT_PRODUCT_PRODUCTID` (`PRODUCT_PRODUCTID`),
  CONSTRAINT `FK_BESTELDPRODUCT_PRODUCT_PRODUCTID` FOREIGN KEY (`PRODUCT_PRODUCTID`) REFERENCES `product` (`PRODUCTID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `besteldproduct`
--

LOCK TABLES `besteldproduct` WRITE;
/*!40000 ALTER TABLE `besteldproduct` DISABLE KEYS */;
INSERT INTO `besteldproduct` VALUES (5,100,39.99,10),(6,220,59.99,15),(7,80,39.99,10),(8,140,59.99,15),(9,20,52.49,23),(10,30,18.99,9),(17,120,469,4),(20,300,469,4),(21,1,32650,37),(22,1,32650,26),(23,1,32805,30),(26,8,2.35,22),(27,10,12.09,1),(28,10,12.69,19),(29,4,5.45,11),(30,6,4.99,12),(31,10,1.85,2),(32,10,3.69,24),(33,5,3.99,20),(34,5,2.39,36),(35,5,2.39,8),(36,10,1.55,18),(37,10,1.65,35),(38,10,1.52,34),(39,10,2.99,28),(40,4,2.49,13),(41,4,2.49,25),(42,4,3.19,6),(43,4,3.15,3),(44,6,4.99,12),(45,10,1.85,2),(46,10,3.69,24),(47,5,3.99,20),(48,5,2.39,36),(49,5,2.39,8),(50,2,49495,29),(51,12,275,31),(52,80,4.99,32),(53,20,19.99,17),(54,8,1239.99,7),(55,3,659.99,33),(56,10,899.99,21),(57,2,1239.99,7),(58,30,79.98,5),(59,8,79.98,5),(60,4,99.99,14),(61,2,1379,27),(62,10,1669,16),(63,4,2.49,13),(64,4,2.49,25),(65,4,3.19,6),(66,4,3.15,3),(67,6,4.99,12),(68,10,1.85,2),(69,10,3.69,24),(70,5,3.99,20),(71,5,2.39,36),(72,5,2.39,8),(73,1,41100,38);
/*!40000 ALTER TABLE `besteldproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestelling`
--

DROP TABLE IF EXISTS `bestelling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bestelling` (
  `ORDERID` int NOT NULL,
  `BETALINGSTATUS` varchar(255) DEFAULT NULL,
  `BETALINGSDATUM` date DEFAULT NULL,
  `DATUMGEPLAATST` date DEFAULT NULL,
  `HERINNERINGSDATUM` date DEFAULT NULL,
  `ORDERSTATUS` varchar(255) DEFAULT NULL,
  `KLANT_GEBRUIKERID` int DEFAULT NULL,
  `LEVERANCIER_GEBRUIKERID` int DEFAULT NULL,
  PRIMARY KEY (`ORDERID`),
  KEY `FK_BESTELLING_KLANT_GEBRUIKERID` (`KLANT_GEBRUIKERID`),
  KEY `FK_BESTELLING_LEVERANCIER_GEBRUIKERID` (`LEVERANCIER_GEBRUIKERID`),
  CONSTRAINT `FK_BESTELLING_KLANT_GEBRUIKERID` FOREIGN KEY (`KLANT_GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`),
  CONSTRAINT `FK_BESTELLING_LEVERANCIER_GEBRUIKERID` FOREIGN KEY (`LEVERANCIER_GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestelling`
--

LOCK TABLES `bestelling` WRITE;
/*!40000 ALTER TABLE `bestelling` DISABLE KEYS */;
INSERT INTO `bestelling` VALUES (49001,'BETAALD','2024-02-29','2024-01-29','2024-02-26','GELEVERD',3,4),(49002,'BETAALD','2024-05-28','2024-04-28','2024-05-25','GEPLAATST',3,4),(50001,'BETAALD','2024-05-09','2024-03-29','2024-05-06','GELEVERD',19,13),(50002,'BETAALD','2024-08-07','2024-04-17','2024-08-04','UIT_VOOR_LEVERING',12,13),(50003,'FACTUUR_VERZONDEN','2024-05-29','2024-04-29','2024-05-26','VERWERKT',16,13),(51001,'BETAALD','2024-05-05','2024-01-29','2024-05-02','GELEVERD',16,18),(51002,'BETAALD','2024-07-17','2024-04-04','2024-07-14','GELEVERD',24,18),(52001,'BETAALD','2024-07-04','2024-03-29','2024-07-01','GELEVERD',24,11),(52002,'BETAALD','2024-08-01','2024-04-26','2024-07-29','VERZONDEN',3,11),(52003,'FACTUUR_VERZONDEN','2024-05-30','2024-04-28','2024-05-27','VERWERKT',24,11),(53001,'BETAALD','2024-05-30','2024-02-29','2024-05-27','GELEVERD',19,2),(53002,'BETAALD','2024-06-01','2024-03-29','2024-05-29','GELEVERD',24,2),(53003,'BETAALD','2024-07-02','2024-04-19','2024-06-29','VERWERKT',19,2),(53004,'ONVERWERKT','2024-05-30','2024-04-29','2024-05-27','GEPLAATST',1,2),(54001,'BETAALD','2024-05-06','2024-03-29','2024-05-03','GELEVERD',1,15),(54002,'BETAALD','2024-06-11','2024-04-24','2024-06-08','VERZONDEN',24,15),(54003,'BETAALD','2024-06-17','2024-04-28','2024-06-14','VERWERKT',14,15);
/*!40000 ALTER TABLE `bestelling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestelling_besteldproduct`
--

DROP TABLE IF EXISTS `bestelling_besteldproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bestelling_besteldproduct` (
  `Bestelling_ORDERID` int NOT NULL,
  `producten_BESTELDPRODUCTID` int NOT NULL,
  PRIMARY KEY (`Bestelling_ORDERID`,`producten_BESTELDPRODUCTID`),
  KEY `BESTELLINGBESTELDPRODUCTproducten_BESTELDPRODUCTID` (`producten_BESTELDPRODUCTID`),
  CONSTRAINT `BESTELLINGBESTELDPRODUCTproducten_BESTELDPRODUCTID` FOREIGN KEY (`producten_BESTELDPRODUCTID`) REFERENCES `besteldproduct` (`BESTELDPRODUCTID`),
  CONSTRAINT `FK_BESTELLING_BESTELDPRODUCT_Bestelling_ORDERID` FOREIGN KEY (`Bestelling_ORDERID`) REFERENCES `bestelling` (`ORDERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestelling_besteldproduct`
--

LOCK TABLES `bestelling_besteldproduct` WRITE;
/*!40000 ALTER TABLE `bestelling_besteldproduct` DISABLE KEYS */;
INSERT INTO `bestelling_besteldproduct` VALUES (49002,5),(49002,6),(49001,7),(49001,8),(49001,9),(49001,10),(50003,17),(50001,20),(53001,21),(53001,22),(53003,23),(52001,26),(52001,27),(52001,28),(52001,29),(52001,30),(52001,31),(52001,32),(52001,33),(52001,34),(52001,35),(52001,36),(52001,37),(52001,38),(52001,39),(52003,40),(52003,41),(52003,42),(52003,43),(52003,44),(52003,45),(52003,46),(52003,47),(52003,48),(52003,49),(53002,50),(54002,51),(54002,52),(54002,53),(51002,54),(51002,55),(51001,56),(51001,57),(54001,58),(54003,59),(54003,60),(50002,61),(50002,62),(52002,63),(52002,64),(52002,65),(52002,66),(52002,67),(52002,68),(52002,69),(52002,70),(52002,71),(52002,72),(53004,73);
/*!40000 ALTER TABLE `bestelling_besteldproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `betaling`
--

DROP TABLE IF EXISTS `betaling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `betaling` (
  `ORDERID` int NOT NULL,
  `ISAFGEHANDELD` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ORDERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `betaling`
--

LOCK TABLES `betaling` WRITE;
/*!40000 ALTER TABLE `betaling` DISABLE KEYS */;
INSERT INTO `betaling` VALUES (49001,1),(49002,1),(50001,1),(50002,1),(50003,0),(51001,1),(51002,1),(52001,1),(52002,1),(52003,0),(53001,1),(53002,1),(53003,1),(53004,0),(54001,1),(54002,1),(54003,1);
/*!40000 ALTER TABLE `betaling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gebruiker`
--

DROP TABLE IF EXISTS `gebruiker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gebruiker` (
  `GEBRUIKERID` int NOT NULL,
  `ROL` varchar(31) DEFAULT NULL,
  `EMAILADRES` varchar(255) DEFAULT NULL,
  `ISACTIEF` tinyint(1) DEFAULT '0',
  `NAAM` varchar(255) DEFAULT NULL,
  `WACHTWOORD` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gebruiker`
--

LOCK TABLES `gebruiker` WRITE;
/*!40000 ALTER TABLE `gebruiker` DISABLE KEYS */;
INSERT INTO `gebruiker` VALUES (1,'KLANT','michel@outlook.be',1,'Michel','1234'),(2,'LEVERANCIER','christophe@outlook.com',1,'Christophe','1234'),(3,'KLANT','jean@outlook.com',1,'Jean','1234'),(4,'LEVERANCIER','mark@outlook.be',1,'Mark','1234'),(11,'LEVERANCIER','kim@gmail.com',1,'Kim','1234'),(12,'KLANT','laura@gmail.com',1,'Laura','1234'),(13,'LEVERANCIER','mike@gmail.com',1,'Mike','1234'),(14,'KLANT','jake@gmail.com',1,'Jake','1234'),(15,'LEVERANCIER','matilda@outlook.com',1,'Matilda','1234'),(16,'KLANT','erik@outlook.com',1,'Erik','1234'),(18,'LEVERANCIER','julia@web.de',1,'Julia','1234'),(19,'KLANT','kurt@web.de',1,'Kurt','1234'),(24,'KLANT','sandra@outlook.com',1,'Sandra','1234'),(25,'LEVERANCIER','francesca@outlook.com',1,'Francesca','1234'),(74,'ADMINISTRATOR','joris@outlook.com',1,'Joris','1234');
/*!40000 ALTER TABLE `gebruiker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `klant`
--

DROP TABLE IF EXISTS `klant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `klant` (
  `GEBRUIKERID` int NOT NULL,
  `TELEFOONNUMMER` varchar(255) DEFAULT NULL,
  `LAND` varchar(255) DEFAULT NULL,
  `POSTCODE` varchar(255) DEFAULT NULL,
  `STAD` varchar(255) DEFAULT NULL,
  `STRAAT` varchar(255) DEFAULT NULL,
  `STRAATNR` varchar(255) DEFAULT NULL,
  `BEDRIJF_NAAM` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`GEBRUIKERID`),
  KEY `FK_KLANT_BEDRIJF_NAAM` (`BEDRIJF_NAAM`),
  CONSTRAINT `FK_KLANT_BEDRIJF_NAAM` FOREIGN KEY (`BEDRIJF_NAAM`) REFERENCES `bedrijf` (`NAAM`),
  CONSTRAINT `FK_KLANT_GEBRUIKERID` FOREIGN KEY (`GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klant`
--

LOCK TABLES `klant` WRITE;
/*!40000 ALTER TABLE `klant` DISABLE KEYS */;
INSERT INTO `klant` VALUES (1,'+32974178174','Belgium','1000','Brussels','Kerkstraat','1','Stella Artois'),(3,'+33124311738','France','31000','Toulouse','Rte de Narbonne','209','Peugeot'),(12,'+31659267802','Netherlands','3011','Rotterdam','Wolfshoek','7','Ahold Delhaize'),(14,'(212)912-0384','United States','10001','New York','Broadway','20','Hewlett-Packard'),(16,'+462252869831','Sweden','111 53','Stockholm','Svartensgatan','102','Ikea'),(19,'+496591799946','Germany','60311','Frankfurt','Bendergasse','3','Bosch'),(24,'+393713432912','Italy','20121','Milan','Piazza Luigi di Savoia','24','Giorgio Armani');
/*!40000 ALTER TABLE `klant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `klant_bestelling`
--

DROP TABLE IF EXISTS `klant_bestelling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `klant_bestelling` (
  `Klant_GEBRUIKERID` int NOT NULL,
  `bestellingen_ORDERID` int NOT NULL,
  PRIMARY KEY (`Klant_GEBRUIKERID`,`bestellingen_ORDERID`),
  KEY `FK_KLANT_BESTELLING_bestellingen_ORDERID` (`bestellingen_ORDERID`),
  CONSTRAINT `FK_KLANT_BESTELLING_bestellingen_ORDERID` FOREIGN KEY (`bestellingen_ORDERID`) REFERENCES `bestelling` (`ORDERID`),
  CONSTRAINT `FK_KLANT_BESTELLING_Klant_GEBRUIKERID` FOREIGN KEY (`Klant_GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klant_bestelling`
--

LOCK TABLES `klant_bestelling` WRITE;
/*!40000 ALTER TABLE `klant_bestelling` DISABLE KEYS */;
INSERT INTO `klant_bestelling` VALUES (3,49001),(3,49002),(19,50001),(12,50002),(16,50003),(16,51001),(24,51002),(24,52001),(3,52002),(24,52003),(19,53001),(24,53002),(19,53003),(1,53004),(1,54001),(24,54002),(14,54003);
/*!40000 ALTER TABLE `klant_bestelling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leverancier`
--

DROP TABLE IF EXISTS `leverancier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leverancier` (
  `GEBRUIKERID` int NOT NULL,
  `BEDRIJF_NAAM` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`GEBRUIKERID`),
  KEY `FK_LEVERANCIER_BEDRIJF_NAAM` (`BEDRIJF_NAAM`),
  CONSTRAINT `FK_LEVERANCIER_BEDRIJF_NAAM` FOREIGN KEY (`BEDRIJF_NAAM`) REFERENCES `bedrijf` (`NAAM`),
  CONSTRAINT `FK_LEVERANCIER_GEBRUIKERID` FOREIGN KEY (`GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leverancier`
--

LOCK TABLES `leverancier` WRITE;
/*!40000 ALTER TABLE `leverancier` DISABLE KEYS */;
INSERT INTO `leverancier` VALUES (11,'Ahold Delhaize'),(18,'Bosch'),(25,'Giorgio Armani'),(13,'Hewlett-Packard'),(15,'Ikea'),(2,'Peugeot'),(4,'Stella Artois');
/*!40000 ALTER TABLE `leverancier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leverancier_bestelling`
--

DROP TABLE IF EXISTS `leverancier_bestelling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leverancier_bestelling` (
  `Leverancier_GEBRUIKERID` int NOT NULL,
  `bestellingen_ORDERID` int NOT NULL,
  PRIMARY KEY (`Leverancier_GEBRUIKERID`,`bestellingen_ORDERID`),
  KEY `FK_LEVERANCIER_BESTELLING_bestellingen_ORDERID` (`bestellingen_ORDERID`),
  CONSTRAINT `FK_LEVERANCIER_BESTELLING_bestellingen_ORDERID` FOREIGN KEY (`bestellingen_ORDERID`) REFERENCES `bestelling` (`ORDERID`),
  CONSTRAINT `FK_LEVERANCIER_BESTELLING_Leverancier_GEBRUIKERID` FOREIGN KEY (`Leverancier_GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leverancier_bestelling`
--

LOCK TABLES `leverancier_bestelling` WRITE;
/*!40000 ALTER TABLE `leverancier_bestelling` DISABLE KEYS */;
INSERT INTO `leverancier_bestelling` VALUES (4,49001),(4,49002),(13,50001),(13,50002),(13,50003),(18,51001),(18,51002),(11,52001),(11,52002),(11,52003),(2,53001),(2,53002),(2,53003),(2,53004),(15,54001),(15,54002),(15,54003);
/*!40000 ALTER TABLE `leverancier_bestelling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leverancier_product`
--

DROP TABLE IF EXISTS `leverancier_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leverancier_product` (
  `Leverancier_GEBRUIKERID` int NOT NULL,
  `producten_PRODUCTID` int NOT NULL,
  PRIMARY KEY (`Leverancier_GEBRUIKERID`,`producten_PRODUCTID`),
  KEY `FK_LEVERANCIER_PRODUCT_producten_PRODUCTID` (`producten_PRODUCTID`),
  CONSTRAINT `FK_LEVERANCIER_PRODUCT_Leverancier_GEBRUIKERID` FOREIGN KEY (`Leverancier_GEBRUIKERID`) REFERENCES `gebruiker` (`GEBRUIKERID`),
  CONSTRAINT `FK_LEVERANCIER_PRODUCT_producten_PRODUCTID` FOREIGN KEY (`producten_PRODUCTID`) REFERENCES `product` (`PRODUCTID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leverancier_product`
--

LOCK TABLES `leverancier_product` WRITE;
/*!40000 ALTER TABLE `leverancier_product` DISABLE KEYS */;
INSERT INTO `leverancier_product` VALUES (11,1),(11,2),(11,3),(13,4),(15,5),(11,6),(18,7),(11,8),(4,9),(4,10),(11,11),(11,12),(11,13),(15,14),(4,15),(13,16),(15,17),(11,18),(11,19),(11,20),(18,21),(11,22),(4,23),(11,24),(11,25),(2,26),(13,27),(11,28),(2,29),(2,30),(15,31),(15,32),(18,33),(11,34),(11,35),(11,36),(2,37),(2,38);
/*!40000 ALTER TABLE `leverancier_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `PRODUCTID` int NOT NULL AUTO_INCREMENT,
  `EENHEIDSPRIJS` double DEFAULT NULL,
  `IMAGEURL` varchar(255) DEFAULT NULL,
  `LEVERMETHODE` varchar(255) DEFAULT NULL,
  `NAAM` varchar(255) DEFAULT NULL,
  `STOCK` int DEFAULT NULL,
  PRIMARY KEY (`PRODUCTID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,12.09,'https://static.delhaize.be/medias/sys_master/h34/hb2/11171019980830.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Cola | Original taste | Blik | Soda 15x33cl',210),(2,1.85,'https://static.delhaize.be/medias/sys_master/h6d/h8f/12008484765726.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Crackers | Original | Toastjes | Zout | 2x75gr',80),(3,3.15,'https://static.delhaize.be/medias/sys_master/h5e/hfb/12097500119070.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Gouda | Jong | Sneden',120),(4,469,'https://media.krefel.be/sys-master/products/9308772040734/768x768.41008662_01.webp','STOCK','Business Laptop - HP Chrome Enterprise',500),(5,79.98,'https://www.ikea.com/us/en/images/products/omar-1-section-shelving-unit__0626066_pe692566_s5.jpg?f=xl','STOCK','OMAR 1 section shelving unit, 36 1/4x14 1/8x71 1/4 \"',40),(6,3.19,'https://static.delhaize.be/medias/sys_master/h64/h19/11088435511326.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Brood | Volkoren | Vierkant 800gr',80),(7,1239.99,'https://media3.bosch-home.com/Product_Shots/900x506/21352757_WGB2440MFG_STP_def.webp','STOCK','WGB244A4FG Serie 8 Wasmachine 9kg',7),(8,2.39,'https://static.delhaize.be/medias/sys_master/hd7/h4d/11235038920734.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Pompoensoep | Bio 250gr',40),(9,18.99,'https://beerhunter.co.uk/wp-content/uploads/2021/05/Stella-Artois-Premium-Belgian-Lager-Pint-Can-Gift-Set-with-Official-Pint-Glass-3-Pack-tiny-1.jpg','STOCK','Stella Artois Premium Lager Beer, 3 Pack 25 fl. oz. Cans',500),(10,39.99,'https://i5.walmartimages.com/asr/477b14e6-00f3-4a53-8005-cfffabd29493.9803909dee8b1a605d94d752aecb93da.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff','STOCK','Stella Artois Lager, 12 Pack 11.2 fl. oz. Bottles',1000),(11,5.45,'https://static.delhaize.be/medias/sys_master/hcf/hca/11692300959774.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Bruisende Ijsthee | Original | Caloriearm | PET',80),(12,4.99,'https://assets.iceland.co.uk/i/iceland/Fanta_8x33_Orange_72978.jpg?$pdpzoom$','STOCK','Limonade | Sinaasappel | Blik | Sleek 8x33cl',80),(13,2.49,'https://static.delhaize.be/medias/sys_master/hde/h2a/11211812929566.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Vierkant brood | Wit 800gr',80),(14,99.99,'https://www.ikea.com/us/en/images/products/ingo-table-pine__0737092_pe740877_s5.jpg?f=xl','STOCK','INGO Table, 47 1/4x29 1/2 \"',10),(15,59.99,'https://www.pikfly.com/images/products/171/43062.jpg','STOCK','Stella Artois Lager, 24 Pack 11.2 fl. oz. Cans',900),(16,1669,'https://cdn.centralpoint.be/objects/high_pic/3/3b7/3465438_pcs-werkstations-hp-z2-small-form-factor-g9-workstation-5f0l7eaabb.jpg','STOCK','Business Desktop - HP Z2 Workstation',20),(17,19.99,'https://www.ikea.com/be/nl/images/products/rigga-kledingrek-wit__0710721_pe727742_s5.jpg?f=xl','STOCK','RIGGA Clothes rack',60),(18,1.55,'https://static.delhaize.be/medias/sys_master/hc4/ha7/11709955702814.jpg?buildNumber=3007325bb863b192eb062003dbb494f1a7838987990a03b9fd021377e8c47da1','STOCK','Naturel Zout | Regular | Chips | 120G',80),(19,12.69,'https://static.delhaize.be/medias/sys_master/hfd/hd3/11811610132510.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Cola | Zonder suiker | Blik | Frisdrank 15x33cl',180),(20,3.99,'https://static.delhaize.be/medias/sys_master/h8a/h7e/11574169567262.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Soep | Room | Witloof 600gr',40),(21,899.99,'https://auctions.hilcoapac.com/images/lot/1325/132574_0.jpg?1604285164','STOCK','WGG1440KFG Serie 6 Wasmachine 9kg',8),(22,2.35,'https://static.delhaize.be/medias/sys_master/hc4/hea/11706880426014.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Bronwater | Romy | Niet bruisend | PET 6x2l',100),(23,52.49,'https://www.kroger.com/product/images/large/front/0078615000038','STOCK','Stella Artois Premium Lager Beer, 24-11.2 fl. oz. Bottles',500),(24,3.69,'https://static.delhaize.be/medias/sys_master/h02/h00/11735135059998.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Koekje | Comté 100gr',160),(25,2.49,'https://static.delhaize.be/medias/sys_master/h27/h2f/11211773607966.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Brood | Bruin | Vierkant 800gr',80),(26,32650,'https://th.bing.com/th/id/OIP.4sa4iMeFLhQYc9YK3HJ-2AHaDb?rs=1&pid=ImgDetMain','ORDER','New E-208 E-Style Electric 50kWh 136 Nera Black',0),(27,1379,'https://www.hp.com/be-nl/shop/media/catalog/product/c/0/c08473310.png?store=be-nl&image-type=image&auto=webp&format=png&width=1280&height=1600&fit=bounds&dpr=1.25','STOCK','Business Laptop - HP Elite',50),(28,2.99,'https://static.delhaize.be/medias/sys_master/hd9/h6b/12326871171102.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Snack | Droge worst | Gerookt | Snack Pack 60gr',100),(29,49495,'https://th.bing.com/th/id/R.ed23a9eca9fa2a390153f86a571910d4?rik=wfUqWGNMLeUqhw&pid=ImgRaw&r=0','ORDER','Traveller Business VIP Standard Electric 50KWh 136 Cumulus Grey',0),(30,32805,'https://www.rental-center-crete.com/gallery/cars/2019/g-peugeot-2008.webp','ORDER','408 ALLURE 1.2L PureTech 130 EAT8 S&S Elixir Red',0),(31,275,'https://www.ikea.com/us/en/images/products/ivar-2-section-shelving-unit-pine__0138387_pe297655_s5.jpg?f=xl','ORDER','IVAR 2 section shelving unit, 68 1/2x19 5/8x89 \"',0),(32,4.99,'https://www.ikea.com/be/en/images/products/bumerang-hanger-natural__0710666_pe727700_s5.jpg?f=xl','STOCK','BUMERANG Hanger 8 pack',500),(33,659.99,'https://media.s-bol.com/3JDJpXL783P4/p20ypQ/858x1200.jpg','STOCK','WTN85205FG Serie 4 Luchtcondensatie droogkast 8kg',4),(34,1.52,'https://static.delhaize.be/medias/sys_master/hf4/h0b/12420329537566.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Gerookt | Snacks | Chips | 125G',60),(35,1.65,'https://static.delhaize.be/medias/sys_master/h16/h1a/11707147354142.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Paprika | Regular | Chips | 120G',80),(36,2.39,'https://static.delhaize.be/medias/sys_master/hae/had/10627189538846.jpg?buildNumber=82174e95e8034dc2242aadaed51c35b2e76a4bb2908eb0fb223ce572e154b418&imwidth=320','STOCK','Tomatensoep | Bio 250gr',40),(37,32650,'https://ukcar.ma/wp-content/uploads/2023/02/208.jpg','ORDER','New E-208 E-Style Electric 50kWh 136 Agueda Yellow',0),(38,41100,'https://www.peugeot.be/content/dam/peugeot/master/b2c/our-range/showroom/new-408/2023/desktop/408_Blanc_Okenite_1920_1080.jpg','ORDER','408 ALLURE PLUG-IN HYBRID 180 e-EAT8 Okenite White',0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequence`
--

DROP TABLE IF EXISTS `sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequence` (
  `SEQ_NAME` varchar(50) NOT NULL,
  `SEQ_COUNT` decimal(38,0) DEFAULT NULL,
  PRIMARY KEY (`SEQ_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequence`
--

LOCK TABLES `sequence` WRITE;
/*!40000 ALTER TABLE `sequence` DISABLE KEYS */;
INSERT INTO `sequence` VALUES ('SEQ_GEN',100);
/*!40000 ALTER TABLE `sequence` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29 16:08:28
