import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db}: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_links_order_idx\` ON \`pages_blocks_navigation_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_links_parent_id_idx\` ON \`pages_blocks_navigation_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`style\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_buttons_order_idx\` ON \`pages_blocks_navigation_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_buttons_parent_id_idx\` ON \`pages_blocks_navigation_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_order_idx\` ON \`pages_blocks_navigation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_parent_id_idx\` ON \`pages_blocks_navigation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_path_idx\` ON \`pages_blocks_navigation\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_logo_logo_image_idx\` ON \`pages_blocks_navigation\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_one\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`background_image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_one_order_idx\` ON \`pages_blocks_hero_one\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_one_parent_id_idx\` ON \`pages_blocks_hero_one\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_one_path_idx\` ON \`pages_blocks_hero_one\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_one_background_image_idx\` ON \`pages_blocks_hero_one\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_two_order_idx\` ON \`pages_blocks_hero_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_two_parent_id_idx\` ON \`pages_blocks_hero_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_two_path_idx\` ON \`pages_blocks_hero_two\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_two_image_idx\` ON \`pages_blocks_hero_two\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_single_location_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`category\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_single_location\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_images_order_idx\` ON \`pages_blocks_single_location_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_images_parent_id_idx\` ON \`pages_blocks_single_location_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_images_image_idx\` ON \`pages_blocks_single_location_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_single_location_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dish\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_single_location_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_menu_items_order_idx\` ON \`pages_blocks_single_location_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_menu_items_parent_id_idx\` ON \`pages_blocks_single_location_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_single_location_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_single_location\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_menu_order_idx\` ON \`pages_blocks_single_location_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_menu_parent_id_idx\` ON \`pages_blocks_single_location_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_single_location\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_order_idx\` ON \`pages_blocks_single_location\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_parent_id_idx\` ON \`pages_blocks_single_location\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_single_location_path_idx\` ON \`pages_blocks_single_location\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_multiple_locations_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` numeric PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`address\` text,
  	\`hours\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_multiple_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_order_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_parent_id_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_image_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_multiple_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`rewards_title\` text,
  	\`rewards_description\` text,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_order_idx\` ON \`pages_blocks_multiple_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_parent_id_idx\` ON \`pages_blocks_multiple_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_path_idx\` ON \`pages_blocks_multiple_locations\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt_text\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_order_idx\` ON \`pages_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_parent_id_idx\` ON \`pages_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_image_idx\` ON \`pages_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_franchise_franchise_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_franchise\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_franchise_steps_order_idx\` ON \`pages_blocks_franchise_franchise_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_franchise_steps_parent_id_idx\` ON \`pages_blocks_franchise_franchise_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_franchise_investment_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`amount\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_franchise\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_investment_details_order_idx\` ON \`pages_blocks_franchise_investment_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_investment_details_parent_id_idx\` ON \`pages_blocks_franchise_investment_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_franchise\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_order_idx\` ON \`pages_blocks_franchise\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_parent_id_idx\` ON \`pages_blocks_franchise\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_path_idx\` ON \`pages_blocks_franchise\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_franchise_image_idx\` ON \`pages_blocks_franchise\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`category\` text,
  	\`special_tag\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_items_order_idx\` ON \`pages_blocks_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_items_parent_id_idx\` ON \`pages_blocks_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_items_image_idx\` ON \`pages_blocks_menu_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_order_idx\` ON \`pages_blocks_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_parent_id_idx\` ON \`pages_blocks_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_path_idx\` ON \`pages_blocks_menu\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_fields\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`name\` text,
  	\`type\` text,
  	\`required\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_fields_order_idx\` ON \`pages_blocks_contact_fields\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_fields_parent_id_idx\` ON \`pages_blocks_contact_fields\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_order_idx\` ON \`pages_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_parent_id_idx\` ON \`pages_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_path_idx\` ON \`pages_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_order_idx\` ON \`pages_blocks_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_parent_id_idx\` ON \`pages_blocks_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_path_idx\` ON \`pages_blocks_about\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_image_idx\` ON \`pages_blocks_about\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_links_order_idx\` ON \`pages_blocks_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_links_parent_id_idx\` ON \`pages_blocks_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_footer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`logo_id\` integer,
  	\`copyright\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_order_idx\` ON \`pages_blocks_footer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_parent_id_idx\` ON \`pages_blocks_footer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_path_idx\` ON \`pages_blocks_footer\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_logo_idx\` ON \`pages_blocks_footer\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_order_idx\` ON \`pages_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_parent_id_idx\` ON \`pages_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_path_idx\` ON \`pages_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_media_idx\` ON \`pages_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_restaurant_restaurants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cuisine\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_restaurant\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_restaurant_restaurants_order_idx\` ON \`pages_blocks_restaurant_restaurants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_restaurant_restaurants_parent_id_idx\` ON \`pages_blocks_restaurant_restaurants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_restaurant_restaurants_image_idx\` ON \`pages_blocks_restaurant_restaurants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_restaurant\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_restaurant_order_idx\` ON \`pages_blocks_restaurant\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_restaurant_parent_id_idx\` ON \`pages_blocks_restaurant\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_restaurant_path_idx\` ON \`pages_blocks_restaurant\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_location_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`address\` text,
  	\`button_text\` text,
  	\`order_now_url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_location\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_locations_order_idx\` ON \`pages_blocks_location_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_locations_parent_id_idx\` ON \`pages_blocks_location_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_locations_image_idx\` ON \`pages_blocks_location_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_location\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_order_idx\` ON \`pages_blocks_location\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_parent_id_idx\` ON \`pages_blocks_location\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_path_idx\` ON \`pages_blocks_location\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_location_scroll_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`address\` text,
  	\`order_now_url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_location_scroll\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_scroll_locations_order_idx\` ON \`pages_blocks_location_scroll_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_scroll_locations_parent_id_idx\` ON \`pages_blocks_location_scroll_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_scroll_locations_image_idx\` ON \`pages_blocks_location_scroll_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_location_scroll\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_scroll_order_idx\` ON \`pages_blocks_location_scroll\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_scroll_parent_id_idx\` ON \`pages_blocks_location_scroll\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_location_scroll_path_idx\` ON \`pages_blocks_location_scroll\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_foodcourt_categories_restaurants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cuisine\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_foodcourt_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_categories_restaurants_order_idx\` ON \`pages_blocks_foodcourt_categories_restaurants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_categories_restaurants_parent_id_idx\` ON \`pages_blocks_foodcourt_categories_restaurants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_categories_restaurants_image_idx\` ON \`pages_blocks_foodcourt_categories_restaurants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_foodcourt_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_foodcourt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_categories_order_idx\` ON \`pages_blocks_foodcourt_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_categories_parent_id_idx\` ON \`pages_blocks_foodcourt_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_foodcourt\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_order_idx\` ON \`pages_blocks_foodcourt\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_parent_id_idx\` ON \`pages_blocks_foodcourt\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourt_path_idx\` ON \`pages_blocks_foodcourt\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_chef_details_chefs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`expertise\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_chef_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_details_chefs_order_idx\` ON \`pages_blocks_chef_details_chefs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_details_chefs_parent_id_idx\` ON \`pages_blocks_chef_details_chefs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_details_chefs_image_idx\` ON \`pages_blocks_chef_details_chefs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_chef_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_details_order_idx\` ON \`pages_blocks_chef_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_details_parent_id_idx\` ON \`pages_blocks_chef_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_details_path_idx\` ON \`pages_blocks_chef_details\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about1_order_idx\` ON \`pages_blocks_about1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about1_parent_id_idx\` ON \`pages_blocks_about1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about1_path_idx\` ON \`pages_blocks_about1\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about1_image_idx\` ON \`pages_blocks_about1\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`designation\` text,
  	\`testimonial_text\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_testimonials_order_idx\` ON \`pages_blocks_testimonials_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_testimonials_image_idx\` ON \`pages_blocks_testimonials_testimonials\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_chef_sroll_details_chefs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`expertise\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_chef_sroll_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_sroll_details_chefs_order_idx\` ON \`pages_blocks_chef_sroll_details_chefs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_sroll_details_chefs_parent_id_idx\` ON \`pages_blocks_chef_sroll_details_chefs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_sroll_details_chefs_image_idx\` ON \`pages_blocks_chef_sroll_details_chefs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_chef_sroll_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_sroll_details_order_idx\` ON \`pages_blocks_chef_sroll_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_sroll_details_parent_id_idx\` ON \`pages_blocks_chef_sroll_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_chef_sroll_details_path_idx\` ON \`pages_blocks_chef_sroll_details\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_us_open_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text,
  	\`hours\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_us\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_us_open_hours_order_idx\` ON \`pages_blocks_contact_us_open_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_us_open_hours_parent_id_idx\` ON \`pages_blocks_contact_us_open_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_us\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`email\` text,
  	\`phone_number\` text,
  	\`address\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_us_order_idx\` ON \`pages_blocks_contact_us\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_us_parent_id_idx\` ON \`pages_blocks_contact_us\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_us_path_idx\` ON \`pages_blocks_contact_us\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_us_image_idx\` ON \`pages_blocks_contact_us\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_links_order_idx\` ON \`_pages_v_blocks_navigation_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_links_parent_id_idx\` ON \`_pages_v_blocks_navigation_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`style\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_buttons_order_idx\` ON \`_pages_v_blocks_navigation_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_buttons_parent_id_idx\` ON \`_pages_v_blocks_navigation_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_order_idx\` ON \`_pages_v_blocks_navigation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_parent_id_idx\` ON \`_pages_v_blocks_navigation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_path_idx\` ON \`_pages_v_blocks_navigation\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_logo_logo_image_idx\` ON \`_pages_v_blocks_navigation\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_one\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`background_image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_one_order_idx\` ON \`_pages_v_blocks_hero_one\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_one_parent_id_idx\` ON \`_pages_v_blocks_hero_one\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_one_path_idx\` ON \`_pages_v_blocks_hero_one\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_one_background_image_idx\` ON \`_pages_v_blocks_hero_one\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_two_order_idx\` ON \`_pages_v_blocks_hero_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_two_parent_id_idx\` ON \`_pages_v_blocks_hero_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_two_path_idx\` ON \`_pages_v_blocks_hero_two\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_two_image_idx\` ON \`_pages_v_blocks_hero_two\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_single_location_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`category\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_single_location\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_images_order_idx\` ON \`_pages_v_blocks_single_location_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_images_parent_id_idx\` ON \`_pages_v_blocks_single_location_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_images_image_idx\` ON \`_pages_v_blocks_single_location_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_single_location_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`dish\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_single_location_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_menu_items_order_idx\` ON \`_pages_v_blocks_single_location_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_menu_items_parent_id_idx\` ON \`_pages_v_blocks_single_location_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_single_location_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_single_location\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_menu_order_idx\` ON \`_pages_v_blocks_single_location_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_menu_parent_id_idx\` ON \`_pages_v_blocks_single_location_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_single_location\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_order_idx\` ON \`_pages_v_blocks_single_location\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_parent_id_idx\` ON \`_pages_v_blocks_single_location\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_single_location_path_idx\` ON \`_pages_v_blocks_single_location\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_multiple_locations_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` numeric,
  	\`name\` text,
  	\`address\` text,
  	\`hours\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_multiple_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_order_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_parent_id_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_image_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_multiple_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`rewards_title\` text,
  	\`rewards_description\` text,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_order_idx\` ON \`_pages_v_blocks_multiple_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_parent_id_idx\` ON \`_pages_v_blocks_multiple_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_path_idx\` ON \`_pages_v_blocks_multiple_locations\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_images_order_idx\` ON \`_pages_v_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_images_parent_id_idx\` ON \`_pages_v_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_images_image_idx\` ON \`_pages_v_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_order_idx\` ON \`_pages_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_parent_id_idx\` ON \`_pages_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_path_idx\` ON \`_pages_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_franchise_franchise_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_franchise\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_franchise_steps_order_idx\` ON \`_pages_v_blocks_franchise_franchise_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_franchise_steps_parent_id_idx\` ON \`_pages_v_blocks_franchise_franchise_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_franchise_investment_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`amount\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_franchise\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_investment_details_order_idx\` ON \`_pages_v_blocks_franchise_investment_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_investment_details_parent_id_idx\` ON \`_pages_v_blocks_franchise_investment_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_franchise\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_order_idx\` ON \`_pages_v_blocks_franchise\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_parent_id_idx\` ON \`_pages_v_blocks_franchise\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_path_idx\` ON \`_pages_v_blocks_franchise\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_franchise_image_idx\` ON \`_pages_v_blocks_franchise\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`category\` text,
  	\`special_tag\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_items_order_idx\` ON \`_pages_v_blocks_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_items_parent_id_idx\` ON \`_pages_v_blocks_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_items_image_idx\` ON \`_pages_v_blocks_menu_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_order_idx\` ON \`_pages_v_blocks_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_parent_id_idx\` ON \`_pages_v_blocks_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_path_idx\` ON \`_pages_v_blocks_menu\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_fields\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`name\` text,
  	\`type\` text,
  	\`required\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_fields_order_idx\` ON \`_pages_v_blocks_contact_fields\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_fields_parent_id_idx\` ON \`_pages_v_blocks_contact_fields\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_order_idx\` ON \`_pages_v_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_parent_id_idx\` ON \`_pages_v_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_path_idx\` ON \`_pages_v_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about_order_idx\` ON \`_pages_v_blocks_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about_parent_id_idx\` ON \`_pages_v_blocks_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about_path_idx\` ON \`_pages_v_blocks_about\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about_image_idx\` ON \`_pages_v_blocks_about\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_links_order_idx\` ON \`_pages_v_blocks_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_links_parent_id_idx\` ON \`_pages_v_blocks_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_footer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`logo_id\` integer,
  	\`copyright\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_order_idx\` ON \`_pages_v_blocks_footer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_parent_id_idx\` ON \`_pages_v_blocks_footer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_path_idx\` ON \`_pages_v_blocks_footer\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_logo_idx\` ON \`_pages_v_blocks_footer\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_order_idx\` ON \`_pages_v_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_parent_id_idx\` ON \`_pages_v_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_path_idx\` ON \`_pages_v_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_media_idx\` ON \`_pages_v_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_restaurant_restaurants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cuisine\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_restaurant\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_restaurant_restaurants_order_idx\` ON \`_pages_v_blocks_restaurant_restaurants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_restaurant_restaurants_parent_id_idx\` ON \`_pages_v_blocks_restaurant_restaurants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_restaurant_restaurants_image_idx\` ON \`_pages_v_blocks_restaurant_restaurants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_restaurant\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_restaurant_order_idx\` ON \`_pages_v_blocks_restaurant\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_restaurant_parent_id_idx\` ON \`_pages_v_blocks_restaurant\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_restaurant_path_idx\` ON \`_pages_v_blocks_restaurant\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_location_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`address\` text,
  	\`button_text\` text,
  	\`order_now_url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_location\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_locations_order_idx\` ON \`_pages_v_blocks_location_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_locations_parent_id_idx\` ON \`_pages_v_blocks_location_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_locations_image_idx\` ON \`_pages_v_blocks_location_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_location\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_order_idx\` ON \`_pages_v_blocks_location\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_parent_id_idx\` ON \`_pages_v_blocks_location\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_path_idx\` ON \`_pages_v_blocks_location\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_location_scroll_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`address\` text,
  	\`order_now_url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_location_scroll\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_scroll_locations_order_idx\` ON \`_pages_v_blocks_location_scroll_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_scroll_locations_parent_id_idx\` ON \`_pages_v_blocks_location_scroll_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_scroll_locations_image_idx\` ON \`_pages_v_blocks_location_scroll_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_location_scroll\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_scroll_order_idx\` ON \`_pages_v_blocks_location_scroll\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_scroll_parent_id_idx\` ON \`_pages_v_blocks_location_scroll\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_location_scroll_path_idx\` ON \`_pages_v_blocks_location_scroll\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_foodcourt_categories_restaurants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cuisine\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_foodcourt_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_categories_restaurants_order_idx\` ON \`_pages_v_blocks_foodcourt_categories_restaurants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_categories_restaurants_parent_id_idx\` ON \`_pages_v_blocks_foodcourt_categories_restaurants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_categories_restaurants_image_idx\` ON \`_pages_v_blocks_foodcourt_categories_restaurants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_foodcourt_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_foodcourt\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_categories_order_idx\` ON \`_pages_v_blocks_foodcourt_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_categories_parent_id_idx\` ON \`_pages_v_blocks_foodcourt_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_foodcourt\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_order_idx\` ON \`_pages_v_blocks_foodcourt\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_parent_id_idx\` ON \`_pages_v_blocks_foodcourt\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourt_path_idx\` ON \`_pages_v_blocks_foodcourt\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_chef_details_chefs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`expertise\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_chef_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_details_chefs_order_idx\` ON \`_pages_v_blocks_chef_details_chefs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_details_chefs_parent_id_idx\` ON \`_pages_v_blocks_chef_details_chefs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_details_chefs_image_idx\` ON \`_pages_v_blocks_chef_details_chefs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_chef_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_details_order_idx\` ON \`_pages_v_blocks_chef_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_details_parent_id_idx\` ON \`_pages_v_blocks_chef_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_details_path_idx\` ON \`_pages_v_blocks_chef_details\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_about1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about1_order_idx\` ON \`_pages_v_blocks_about1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about1_parent_id_idx\` ON \`_pages_v_blocks_about1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about1_path_idx\` ON \`_pages_v_blocks_about1\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about1_image_idx\` ON \`_pages_v_blocks_about1\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`designation\` text,
  	\`testimonial_text\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_testimonials_image_idx\` ON \`_pages_v_blocks_testimonials_testimonials\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_path_idx\` ON \`_pages_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_chef_sroll_details_chefs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`expertise\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_chef_sroll_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_sroll_details_chefs_order_idx\` ON \`_pages_v_blocks_chef_sroll_details_chefs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_sroll_details_chefs_parent_id_idx\` ON \`_pages_v_blocks_chef_sroll_details_chefs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_sroll_details_chefs_image_idx\` ON \`_pages_v_blocks_chef_sroll_details_chefs\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_chef_sroll_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_sroll_details_order_idx\` ON \`_pages_v_blocks_chef_sroll_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_sroll_details_parent_id_idx\` ON \`_pages_v_blocks_chef_sroll_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_chef_sroll_details_path_idx\` ON \`_pages_v_blocks_chef_sroll_details\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_us_open_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`day\` text,
  	\`hours\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_us\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_us_open_hours_order_idx\` ON \`_pages_v_blocks_contact_us_open_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_us_open_hours_parent_id_idx\` ON \`_pages_v_blocks_contact_us_open_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_us\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`_uuid\` text,
  	\`title\` text,
  	\`email\` text,
  	\`phone_number\` text,
  	\`address\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_us_order_idx\` ON \`_pages_v_blocks_contact_us\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_us_parent_id_idx\` ON \`_pages_v_blocks_contact_us\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_us_path_idx\` ON \`_pages_v_blocks_contact_us\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_us_image_idx\` ON \`_pages_v_blocks_contact_us\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_one\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_two\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_single_location_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_single_location_menu_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_single_location_menu\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_single_location\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_multiple_locations_locations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_multiple_locations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_franchise_franchise_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_franchise_investment_details\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_franchise\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menu_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menu\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_fields\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_footer_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_footer\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_restaurant_restaurants\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_restaurant\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_location_locations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_location\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_location_scroll_locations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_location_scroll\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_foodcourt_categories_restaurants\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_foodcourt_categories\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_foodcourt\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_chef_details_chefs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_chef_details\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about1\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_chef_sroll_details_chefs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_chef_sroll_details\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_us_open_hours\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_us\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_one\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_two\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_single_location_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_single_location_menu_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_single_location_menu\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_single_location\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_multiple_locations_locations\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_multiple_locations\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_franchise_franchise_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_franchise_investment_details\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_franchise\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menu_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menu\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_fields\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_about\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_footer_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_footer\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_restaurant_restaurants\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_restaurant\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_location_locations\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_location\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_location_scroll_locations\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_location_scroll\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_foodcourt_categories_restaurants\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_foodcourt_categories\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_foodcourt\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_chef_details_chefs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_chef_details\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_about1\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_chef_sroll_details_chefs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_chef_sroll_details\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_us_open_hours\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_us\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
}
