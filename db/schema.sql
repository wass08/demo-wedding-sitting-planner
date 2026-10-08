CREATE TABLE IF NOT EXISTS wedding_plans (
  owner text PRIMARY KEY NOT NULL,
  body text NOT NULL,
  revision integer DEFAULT 1 NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS seating_publications (
  owner text PRIMARY KEY NOT NULL,
  body text NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS seat_invitations (
  token text PRIMARY KEY NOT NULL,
  owner text NOT NULL,
  guest_id text NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS seat_invitations_owner_guest ON seat_invitations (owner, guest_id);

CREATE TABLE IF NOT EXISTS wedding_backups (
  owner text PRIMARY KEY NOT NULL,
  body text NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS wedding_shares (
  owner text PRIMARY KEY NOT NULL,
  token text NOT NULL,
  enabled integer DEFAULT 1 NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS wedding_shares_token ON wedding_shares (token);
