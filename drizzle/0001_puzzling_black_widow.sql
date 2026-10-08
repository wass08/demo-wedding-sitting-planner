CREATE TABLE `seat_invitations` (
	`token` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`guest_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `seat_invitations_owner_guest` ON `seat_invitations` (`owner`,`guest_id`);--> statement-breakpoint
CREATE TABLE `seating_publications` (
	`owner` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL,
	`updated_at` text NOT NULL
);
