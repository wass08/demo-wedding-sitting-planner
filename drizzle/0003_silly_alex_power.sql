CREATE TABLE `wedding_shares` (
	`owner` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`enabled` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `wedding_shares_token` ON `wedding_shares` (`token`);