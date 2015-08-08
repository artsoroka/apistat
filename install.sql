DROP TABLE IF EXISTS `api_usage`; 
CREATE TABLE `api_usage` (
  id int auto_increment PRIMARY KEY, 
  method varchar(10) NOT NULL, 
  path  varchar(255) NOT NULL, 
  query varchar(255),  
  timestamp int NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_unicode_ci;