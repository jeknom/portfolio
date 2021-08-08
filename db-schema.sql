CREATE TABLE `Images` (
  `id` INTEGER PRIMARY KEY,
  `path` TEXT
);

CREATE TABLE `Maintainers` (
  `id` INTEGER PRIMARY KEY,
  `name` TEXT NOT NULL,
  `headline` TEXT NOT NULL,
  `bio` TEXT NOT NULL,
  `image_id` INTEGER
);

CREATE TABLE `Skills` (
  `id` INTEGER PRIMARY KEY,
  `name` TEXT NOT NULL,
  `score` INTEGER
);

CREATE TABLE `Achievements` (
  `id` INTEGER PRIMARY KEY,
  `title` TEXT NOT NULL,
  `subtitle` TEXT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `image_id` INTEGER,
  `startDate` DATE,
  `endDate` DATE
);

CREATE TABLE `Highlights` (
  `id` INTEGER PRIMARY KEY,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `image_id` INTEGER
);

CREATE TABLE `ContactInformation` (
  `id` INTEGER PRIMARY KEY,
  `name` TEXT NOT NULL,
  `link` TEXT NOT NULL
);

CREATE TABLE `OpenGraphData` (
  `id` INTEGER,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `type` TEXT NOT NULL,
  `image_id` INTEGER NOT NULL
);

ALTER TABLE `Maintainers` ADD FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`);

ALTER TABLE `Achievements` ADD FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`);

ALTER TABLE `Highlights` ADD FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`);

ALTER TABLE `OpenGraphData` ADD FOREIGN KEY (`image_id`) REFERENCES `Images` (`id`);
