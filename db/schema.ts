import {integer,sqliteTable,text,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const weddingPlans=sqliteTable('wedding_plans',{owner:text('owner').primaryKey(),body:text('body').notNull(),revision:integer('revision').notNull().default(1),updatedAt:text('updated_at').notNull()});
export const seatingPublications=sqliteTable('seating_publications',{owner:text('owner').primaryKey(),body:text('body').notNull(),updatedAt:text('updated_at').notNull()});
export const seatInvitations=sqliteTable('seat_invitations',{token:text('token').primaryKey(),owner:text('owner').notNull(),guestId:text('guest_id').notNull()},t=>[uniqueIndex('seat_invitations_owner_guest').on(t.owner,t.guestId)]);
export const weddingBackups=sqliteTable('wedding_backups',{owner:text('owner').primaryKey(),body:text('body').notNull(),updatedAt:text('updated_at').notNull()});
export const weddingShares=sqliteTable('wedding_shares',{owner:text('owner').primaryKey(),token:text('token').notNull(),enabled:integer('enabled').notNull().default(1)},t=>[uniqueIndex('wedding_shares_token').on(t.token)]);
