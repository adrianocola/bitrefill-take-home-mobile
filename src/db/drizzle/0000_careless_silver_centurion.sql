CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`coin` text NOT NULL,
	`quantity` integer NOT NULL,
	`price_per_coin` integer NOT NULL,
	`type` text NOT NULL,
	`date` integer NOT NULL
);
