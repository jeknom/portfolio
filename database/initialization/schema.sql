CREATE TABLE `Images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `path` TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE `Maintainers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `headline` TEXT NOT NULL,
  `bio` TEXT NOT NULL,
  `image_id` INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`)
);

CREATE TABLE `Skills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `score` INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE `Achievements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `subtitle` TEXT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `image_id` INTEGER,
  `startDate` DATE,
  `endDate` DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`)
);

CREATE TABLE `Highlights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `image_id` INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`)
);

CREATE TABLE `ContactInformation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `link` TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE `OpenGraphData` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `type` TEXT NOT NULL,
  `image_id` INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`)
);

INSERT INTO `Images` (`path`) VALUES ("https://i.imgur.com/5nBI2Ge.png");

INSERT INTO `Maintainers` (`name`, `headline`, `bio`, `image_id`)
VALUES ('Jane Doe', 'Some cool title', 'Hey, I am this and that and I love lorem ipsum of all sorts and sizes.', 1);

INSERT INTO `OpenGraphData` (`title`, `description`, `type`, `image_id`)
VALUES ('Example open graph title', 'Example open graph description', 'Example open graph type', 1);