import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_social_links_order_idx\` ON \`pages_blocks_footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_footer_social_links_parent_id_idx\` ON \`pages_blocks_footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_abouttwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`class_name\` text DEFAULT 'aboutTwo',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_abouttwo_order_idx\` ON \`pages_blocks_abouttwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_abouttwo_parent_id_idx\` ON \`pages_blocks_abouttwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_abouttwo_path_idx\` ON \`pages_blocks_abouttwo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_abouttwo_image_idx\` ON \`pages_blocks_abouttwo\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menu1_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`category\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`price\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menu1\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu1_items_order_idx\` ON \`pages_blocks_menu1_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu1_items_parent_id_idx\` ON \`pages_blocks_menu1_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu1_items_image_idx\` ON \`pages_blocks_menu1_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menu1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'menuOne',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu1_order_idx\` ON \`pages_blocks_menu1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu1_parent_id_idx\` ON \`pages_blocks_menu1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu1_path_idx\` ON \`pages_blocks_menu1\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contactus_open_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text,
  	\`hours\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contactus\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_open_hours_order_idx\` ON \`pages_blocks_contactus_open_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_open_hours_parent_id_idx\` ON \`pages_blocks_contactus_open_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contactus_fields\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`name\` text,
  	\`type\` text,
  	\`required\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contactus\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_fields_order_idx\` ON \`pages_blocks_contactus_fields\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_fields_parent_id_idx\` ON \`pages_blocks_contactus_fields\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contactus\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`email\` text,
  	\`phone_number\` text,
  	\`address\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`class_name\` text DEFAULT 'contactOne',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_order_idx\` ON \`pages_blocks_contactus\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_parent_id_idx\` ON \`pages_blocks_contactus\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_path_idx\` ON \`pages_blocks_contactus\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contactus_image_idx\` ON \`pages_blocks_contactus\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_drop_down_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_drop_down\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_links_order_idx\` ON \`pages_blocks_navigation_drop_down_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_links_parent_id_idx\` ON \`pages_blocks_navigation_drop_down_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_drop_down_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`style\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_drop_down\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_buttons_order_idx\` ON \`pages_blocks_navigation_drop_down_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_buttons_parent_id_idx\` ON \`pages_blocks_navigation_drop_down_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_drop_down_menu_submenu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_drop_down_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_menu_submenu_order_idx\` ON \`pages_blocks_navigation_drop_down_menu_submenu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_menu_submenu_parent_id_idx\` ON \`pages_blocks_navigation_drop_down_menu_submenu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_drop_down_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_drop_down\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_menu_order_idx\` ON \`pages_blocks_navigation_drop_down_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_menu_parent_id_idx\` ON \`pages_blocks_navigation_drop_down_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_drop_down\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`class_name\` text DEFAULT 'navigationScroll',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_order_idx\` ON \`pages_blocks_navigation_drop_down\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_parent_id_idx\` ON \`pages_blocks_navigation_drop_down\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_path_idx\` ON \`pages_blocks_navigation_drop_down\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_drop_down_logo_logo_image_idx\` ON \`pages_blocks_navigation_drop_down\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_three\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_shape\` text DEFAULT 'rectangle-image',
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`image_id\` integer,
  	\`class_name\` text DEFAULT 'hero3',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_three_order_idx\` ON \`pages_blocks_hero_three\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_three_parent_id_idx\` ON \`pages_blocks_hero_three\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_three_path_idx\` ON \`pages_blocks_hero_three\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_three_image_idx\` ON \`pages_blocks_hero_three\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`captcha_type\` text DEFAULT 'none',
  	\`storage_type\` text DEFAULT 'database',
  	\`workflow\` text,
  	\`title\` text,
  	\`description\` text,
  	\`form_id\` integer,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`class_name\` text DEFAULT 'contactTwo',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_two_order_idx\` ON \`pages_blocks_contact_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_two_parent_id_idx\` ON \`pages_blocks_contact_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_two_path_idx\` ON \`pages_blocks_contact_two\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_two_form_idx\` ON \`pages_blocks_contact_two\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menutwo_categories_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`rating\` text,
  	\`price\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menutwo_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_categories_items_order_idx\` ON \`pages_blocks_menutwo_categories_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_categories_items_parent_id_idx\` ON \`pages_blocks_menutwo_categories_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_categories_items_image_idx\` ON \`pages_blocks_menutwo_categories_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menutwo_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menutwo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_categories_order_idx\` ON \`pages_blocks_menutwo_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_categories_parent_id_idx\` ON \`pages_blocks_menutwo_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menutwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'menu2',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_order_idx\` ON \`pages_blocks_menutwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_parent_id_idx\` ON \`pages_blocks_menutwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menutwo_path_idx\` ON \`pages_blocks_menutwo\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menudisplay_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`button_link\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menudisplay\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menudisplay_menu_order_idx\` ON \`pages_blocks_menudisplay_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menudisplay_menu_parent_id_idx\` ON \`pages_blocks_menudisplay_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menudisplay_menu_image_idx\` ON \`pages_blocks_menudisplay_menu\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menudisplay\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`class_name\` text DEFAULT 'menuDisplay',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menudisplay_order_idx\` ON \`pages_blocks_menudisplay\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menudisplay_parent_id_idx\` ON \`pages_blocks_menudisplay\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menudisplay_path_idx\` ON \`pages_blocks_menudisplay\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menuthree_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`rating\` text,
  	\`price\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menuthree_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_menu_items_order_idx\` ON \`pages_blocks_menuthree_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_menu_items_parent_id_idx\` ON \`pages_blocks_menuthree_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_menu_items_image_idx\` ON \`pages_blocks_menuthree_menu_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menuthree_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menuthree\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_menu_order_idx\` ON \`pages_blocks_menuthree_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_menu_parent_id_idx\` ON \`pages_blocks_menuthree_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menuthree\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'menu3',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_order_idx\` ON \`pages_blocks_menuthree\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_parent_id_idx\` ON \`pages_blocks_menuthree\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menuthree_path_idx\` ON \`pages_blocks_menuthree\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`video_id\` integer,
  	\`class_name\` text DEFAULT 'videoBlock',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_order_idx\` ON \`pages_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_parent_id_idx\` ON \`pages_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_path_idx\` ON \`pages_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_video_idx\` ON \`pages_blocks_video\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_videoone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`video_id\` text,
  	\`class_name\` text DEFAULT 'videoOneBlock',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_videoone_order_idx\` ON \`pages_blocks_videoone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videoone_parent_id_idx\` ON \`pages_blocks_videoone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videoone_path_idx\` ON \`pages_blocks_videoone\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_videotwo_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_videotwo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_videotwo_videos_order_idx\` ON \`pages_blocks_videotwo_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videotwo_videos_parent_id_idx\` ON \`pages_blocks_videotwo_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_videotwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'videoTwoBlock',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_videotwo_order_idx\` ON \`pages_blocks_videotwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videotwo_parent_id_idx\` ON \`pages_blocks_videotwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videotwo_path_idx\` ON \`pages_blocks_videotwo\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_videothree\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`video_id\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`media_position\` text DEFAULT 'left',
  	\`class_name\` text DEFAULT 'videoThreeBlock',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_videothree_order_idx\` ON \`pages_blocks_videothree\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videothree_parent_id_idx\` ON \`pages_blocks_videothree\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videothree_path_idx\` ON \`pages_blocks_videothree\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_videothree_image_idx\` ON \`pages_blocks_videothree\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_galleryone_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt_text\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_galleryone\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_galleryone_images_order_idx\` ON \`pages_blocks_galleryone_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_galleryone_images_parent_id_idx\` ON \`pages_blocks_galleryone_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_galleryone_images_image_idx\` ON \`pages_blocks_galleryone_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_galleryone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout_type\` text DEFAULT 'masonry',
  	\`title\` text,
  	\`class_name\` text DEFAULT 'gallary1',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_galleryone_order_idx\` ON \`pages_blocks_galleryone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_galleryone_parent_id_idx\` ON \`pages_blocks_galleryone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_galleryone_path_idx\` ON \`pages_blocks_galleryone\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonialtwo_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`designation\` text,
  	\`testimonial_text\` text,
  	\`personimage_id\` integer,
  	FOREIGN KEY (\`personimage_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonialtwo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonialtwo_testimonials_order_idx\` ON \`pages_blocks_testimonialtwo_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonialtwo_testimonials_parent_id_idx\` ON \`pages_blocks_testimonialtwo_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonialtwo_testimonials_personimage_idx\` ON \`pages_blocks_testimonialtwo_testimonials\` (\`personimage_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonialtwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`class_name\` text DEFAULT 'testimonialsTwo',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonialtwo_order_idx\` ON \`pages_blocks_testimonialtwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonialtwo_parent_id_idx\` ON \`pages_blocks_testimonialtwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonialtwo_path_idx\` ON \`pages_blocks_testimonialtwo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonialtwo_image_idx\` ON \`pages_blocks_testimonialtwo\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_main_page_pages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`description\` text,
  	\`link_page_id\` integer,
  	\`link_text\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_main_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_main_page_pages_order_idx\` ON \`pages_blocks_main_page_pages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_main_page_pages_parent_id_idx\` ON \`pages_blocks_main_page_pages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_main_page_pages_image_idx\` ON \`pages_blocks_main_page_pages\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_main_page_pages_link_link_page_idx\` ON \`pages_blocks_main_page_pages\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_main_page\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'mainPageGallery',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_main_page_order_idx\` ON \`pages_blocks_main_page\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_main_page_parent_id_idx\` ON \`pages_blocks_main_page\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_main_page_path_idx\` ON \`pages_blocks_main_page\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menufour_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_name\` text DEFAULT 'kitchen',
  	\`button_text\` text,
  	\`button_link\` text,
  	\`background_color\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menufour\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menufour_items_order_idx\` ON \`pages_blocks_menufour_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menufour_items_parent_id_idx\` ON \`pages_blocks_menufour_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menufour\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'How would you like to experience Taaza Kitchen?',
  	\`class_name\` text DEFAULT 'menu4',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menufour_order_idx\` ON \`pages_blocks_menufour\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menufour_parent_id_idx\` ON \`pages_blocks_menufour\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menufour_path_idx\` ON \`pages_blocks_menufour\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_options_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`icon_id\` integer,
  	\`link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_service_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_options_order_idx\` ON \`pages_blocks_service_options_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_options_parent_id_idx\` ON \`pages_blocks_service_options_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_options_icon_idx\` ON \`pages_blocks_service_options_options\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Choose Your Service',
  	\`class_name\` text DEFAULT 'orderType',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_order_idx\` ON \`pages_blocks_service_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_parent_id_idx\` ON \`pages_blocks_service_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_path_idx\` ON \`pages_blocks_service_options\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_foodcourtone_restaurants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cuisine\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`variant\` text DEFAULT 'fill',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_foodcourtone\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourtone_restaurants_order_idx\` ON \`pages_blocks_foodcourtone_restaurants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourtone_restaurants_parent_id_idx\` ON \`pages_blocks_foodcourtone_restaurants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourtone_restaurants_image_idx\` ON \`pages_blocks_foodcourtone_restaurants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_foodcourtone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'FoodCourtOne',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourtone_order_idx\` ON \`pages_blocks_foodcourtone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourtone_parent_id_idx\` ON \`pages_blocks_foodcourtone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_foodcourtone_path_idx\` ON \`pages_blocks_foodcourtone\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_options_two_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`icon_id\` integer,
  	\`link\` text,
  	\`badge\` text,
  	\`subtitle\` text,
  	\`action_text\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_service_options_two\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_two_options_order_idx\` ON \`pages_blocks_service_options_two_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_two_options_parent_id_idx\` ON \`pages_blocks_service_options_two_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_two_options_icon_idx\` ON \`pages_blocks_service_options_two_options\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_options_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Choose Your Service',
  	\`class_name\` text DEFAULT 'serviceOptionsTwo',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_two_order_idx\` ON \`pages_blocks_service_options_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_two_parent_id_idx\` ON \`pages_blocks_service_options_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_two_path_idx\` ON \`pages_blocks_service_options_two\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menu_categories_menu_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`image_id\` integer,
  	\`link\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_menu_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_categories_menu_categories_order_idx\` ON \`pages_blocks_menu_categories_menu_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_categories_menu_categories_parent_id_idx\` ON \`pages_blocks_menu_categories_menu_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_categories_menu_categories_image_idx\` ON \`pages_blocks_menu_categories_menu_categories\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_menu_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`class_name\` text DEFAULT 'menuCategories',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_categories_order_idx\` ON \`pages_blocks_menu_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_categories_parent_id_idx\` ON \`pages_blocks_menu_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_menu_categories_path_idx\` ON \`pages_blocks_menu_categories\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_two_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_two\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_links_order_idx\` ON \`pages_blocks_navigation_two_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_links_parent_id_idx\` ON \`pages_blocks_navigation_two_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_two_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`style\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_two\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_buttons_order_idx\` ON \`pages_blocks_navigation_two_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_buttons_parent_id_idx\` ON \`pages_blocks_navigation_two_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`class_name\` text DEFAULT 'navigationTwo',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_order_idx\` ON \`pages_blocks_navigation_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_parent_id_idx\` ON \`pages_blocks_navigation_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_path_idx\` ON \`pages_blocks_navigation_two\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_two_logo_logo_image_idx\` ON \`pages_blocks_navigation_two\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_three_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_three\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_links_order_idx\` ON \`pages_blocks_navigation_three_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_links_parent_id_idx\` ON \`pages_blocks_navigation_three_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_three_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_navigation_three\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_buttons_order_idx\` ON \`pages_blocks_navigation_three_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_buttons_parent_id_idx\` ON \`pages_blocks_navigation_three_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_navigation_three\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`color_scheme\` numeric DEFAULT 1,
  	\`mode\` text DEFAULT 'inherit',
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`class_name\` text DEFAULT 'navigationThree',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_order_idx\` ON \`pages_blocks_navigation_three\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_parent_id_idx\` ON \`pages_blocks_navigation_three\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_path_idx\` ON \`pages_blocks_navigation_three\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_navigation_three_logo_logo_image_idx\` ON \`pages_blocks_navigation_three\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_instagram_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`reel_title\` text,
  	\`views\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_instagram\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_instagram_videos_order_idx\` ON \`pages_blocks_instagram_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_instagram_videos_parent_id_idx\` ON \`pages_blocks_instagram_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_instagram_videos_thumbnail_idx\` ON \`pages_blocks_instagram_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_instagram\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'instagram',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_instagram_order_idx\` ON \`pages_blocks_instagram\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_instagram_parent_id_idx\` ON \`pages_blocks_instagram\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_instagram_path_idx\` ON \`pages_blocks_instagram\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_video_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`uploaded_video_id\` integer,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	FOREIGN KEY (\`uploaded_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_videos_order_idx\` ON \`pages_blocks_hero_video_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_videos_parent_id_idx\` ON \`pages_blocks_hero_video_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_videos_uploaded_video_idx\` ON \`pages_blocks_hero_video_videos\` (\`uploaded_video_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_videos_thumbnail_idx\` ON \`pages_blocks_hero_video_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`sub_heading\` text,
  	\`button_text\` text,
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_order_idx\` ON \`pages_blocks_hero_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_parent_id_idx\` ON \`pages_blocks_hero_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_path_idx\` ON \`pages_blocks_hero_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_options_three_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_id\` integer,
  	\`name\` text,
  	\`link\` text,
  	\`description\` text,
  	\`button_text\` text DEFAULT 'View Menu',
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_service_options_three\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_three_options_order_idx\` ON \`pages_blocks_service_options_three_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_three_options_parent_id_idx\` ON \`pages_blocks_service_options_three_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_three_options_icon_idx\` ON \`pages_blocks_service_options_three_options\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_options_three\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`class_name\` text,
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_three_order_idx\` ON \`pages_blocks_service_options_three\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_three_parent_id_idx\` ON \`pages_blocks_service_options_three\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_options_three_path_idx\` ON \`pages_blocks_service_options_three\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_four\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`background_image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`class_name\` text DEFAULT 'hero4',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_four_order_idx\` ON \`pages_blocks_hero_four\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_four_parent_id_idx\` ON \`pages_blocks_hero_four\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_four_path_idx\` ON \`pages_blocks_hero_four\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_four_background_image_idx\` ON \`pages_blocks_hero_four\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_social_links_order_idx\` ON \`_pages_v_blocks_footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_footer_social_links_parent_id_idx\` ON \`_pages_v_blocks_footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_abouttwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`class_name\` text DEFAULT 'aboutTwo',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_abouttwo_order_idx\` ON \`_pages_v_blocks_abouttwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_abouttwo_parent_id_idx\` ON \`_pages_v_blocks_abouttwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_abouttwo_path_idx\` ON \`_pages_v_blocks_abouttwo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_abouttwo_image_idx\` ON \`_pages_v_blocks_abouttwo\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menu1_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`category\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`price\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menu1\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu1_items_order_idx\` ON \`_pages_v_blocks_menu1_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu1_items_parent_id_idx\` ON \`_pages_v_blocks_menu1_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu1_items_image_idx\` ON \`_pages_v_blocks_menu1_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menu1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'menuOne',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu1_order_idx\` ON \`_pages_v_blocks_menu1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu1_parent_id_idx\` ON \`_pages_v_blocks_menu1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu1_path_idx\` ON \`_pages_v_blocks_menu1\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contactus_open_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`day\` text,
  	\`hours\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contactus\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_open_hours_order_idx\` ON \`_pages_v_blocks_contactus_open_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_open_hours_parent_id_idx\` ON \`_pages_v_blocks_contactus_open_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contactus_fields\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`name\` text,
  	\`type\` text,
  	\`required\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contactus\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_fields_order_idx\` ON \`_pages_v_blocks_contactus_fields\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_fields_parent_id_idx\` ON \`_pages_v_blocks_contactus_fields\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contactus\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`title\` text,
  	\`description\` text,
  	\`email\` text,
  	\`phone_number\` text,
  	\`address\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`class_name\` text DEFAULT 'contactOne',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_order_idx\` ON \`_pages_v_blocks_contactus\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_parent_id_idx\` ON \`_pages_v_blocks_contactus\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_path_idx\` ON \`_pages_v_blocks_contactus\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contactus_image_idx\` ON \`_pages_v_blocks_contactus\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_drop_down_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_drop_down\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_links_order_idx\` ON \`_pages_v_blocks_navigation_drop_down_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_links_parent_id_idx\` ON \`_pages_v_blocks_navigation_drop_down_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_drop_down_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`style\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_drop_down\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_buttons_order_idx\` ON \`_pages_v_blocks_navigation_drop_down_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_buttons_parent_id_idx\` ON \`_pages_v_blocks_navigation_drop_down_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_drop_down_menu_submenu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_drop_down_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_menu_submenu_order_idx\` ON \`_pages_v_blocks_navigation_drop_down_menu_submenu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_menu_submenu_parent_id_idx\` ON \`_pages_v_blocks_navigation_drop_down_menu_submenu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_drop_down_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_drop_down\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_menu_order_idx\` ON \`_pages_v_blocks_navigation_drop_down_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_menu_parent_id_idx\` ON \`_pages_v_blocks_navigation_drop_down_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_drop_down\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'orange-theme',
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`class_name\` text DEFAULT 'navigationScroll',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_order_idx\` ON \`_pages_v_blocks_navigation_drop_down\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_parent_id_idx\` ON \`_pages_v_blocks_navigation_drop_down\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_path_idx\` ON \`_pages_v_blocks_navigation_drop_down\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_drop_down_logo_logo_image_idx\` ON \`_pages_v_blocks_navigation_drop_down\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_three\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`image_shape\` text DEFAULT 'rectangle-image',
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`image_id\` integer,
  	\`class_name\` text DEFAULT 'hero3',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_three_order_idx\` ON \`_pages_v_blocks_hero_three\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_three_parent_id_idx\` ON \`_pages_v_blocks_hero_three\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_three_path_idx\` ON \`_pages_v_blocks_hero_three\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_three_image_idx\` ON \`_pages_v_blocks_hero_three\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`captcha_type\` text DEFAULT 'none',
  	\`storage_type\` text DEFAULT 'database',
  	\`workflow\` text,
  	\`title\` text,
  	\`description\` text,
  	\`form_id\` integer,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`class_name\` text DEFAULT 'contactTwo',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_two_order_idx\` ON \`_pages_v_blocks_contact_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_two_parent_id_idx\` ON \`_pages_v_blocks_contact_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_two_path_idx\` ON \`_pages_v_blocks_contact_two\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_two_form_idx\` ON \`_pages_v_blocks_contact_two\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menutwo_categories_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`rating\` text,
  	\`price\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menutwo_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_categories_items_order_idx\` ON \`_pages_v_blocks_menutwo_categories_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_categories_items_parent_id_idx\` ON \`_pages_v_blocks_menutwo_categories_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_categories_items_image_idx\` ON \`_pages_v_blocks_menutwo_categories_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menutwo_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menutwo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_categories_order_idx\` ON \`_pages_v_blocks_menutwo_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_categories_parent_id_idx\` ON \`_pages_v_blocks_menutwo_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menutwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'menu2',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_order_idx\` ON \`_pages_v_blocks_menutwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_parent_id_idx\` ON \`_pages_v_blocks_menutwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menutwo_path_idx\` ON \`_pages_v_blocks_menutwo\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menudisplay_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`button_link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menudisplay\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menudisplay_menu_order_idx\` ON \`_pages_v_blocks_menudisplay_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menudisplay_menu_parent_id_idx\` ON \`_pages_v_blocks_menudisplay_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menudisplay_menu_image_idx\` ON \`_pages_v_blocks_menudisplay_menu\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menudisplay\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`class_name\` text DEFAULT 'menuDisplay',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menudisplay_order_idx\` ON \`_pages_v_blocks_menudisplay\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menudisplay_parent_id_idx\` ON \`_pages_v_blocks_menudisplay\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menudisplay_path_idx\` ON \`_pages_v_blocks_menudisplay\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menuthree_menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`rating\` text,
  	\`price\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menuthree_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_menu_items_order_idx\` ON \`_pages_v_blocks_menuthree_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_menu_items_parent_id_idx\` ON \`_pages_v_blocks_menuthree_menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_menu_items_image_idx\` ON \`_pages_v_blocks_menuthree_menu_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menuthree_menu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menuthree\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_menu_order_idx\` ON \`_pages_v_blocks_menuthree_menu\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_menu_parent_id_idx\` ON \`_pages_v_blocks_menuthree_menu\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menuthree\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'menu3',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_order_idx\` ON \`_pages_v_blocks_menuthree\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_parent_id_idx\` ON \`_pages_v_blocks_menuthree\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menuthree_path_idx\` ON \`_pages_v_blocks_menuthree\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`video_id\` integer,
  	\`class_name\` text DEFAULT 'videoBlock',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_order_idx\` ON \`_pages_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_parent_id_idx\` ON \`_pages_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_path_idx\` ON \`_pages_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_video_idx\` ON \`_pages_v_blocks_video\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_videoone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`video_id\` text,
  	\`class_name\` text DEFAULT 'videoOneBlock',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videoone_order_idx\` ON \`_pages_v_blocks_videoone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videoone_parent_id_idx\` ON \`_pages_v_blocks_videoone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videoone_path_idx\` ON \`_pages_v_blocks_videoone\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_videotwo_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`video_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_videotwo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videotwo_videos_order_idx\` ON \`_pages_v_blocks_videotwo_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videotwo_videos_parent_id_idx\` ON \`_pages_v_blocks_videotwo_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_videotwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'videoTwoBlock',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videotwo_order_idx\` ON \`_pages_v_blocks_videotwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videotwo_parent_id_idx\` ON \`_pages_v_blocks_videotwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videotwo_path_idx\` ON \`_pages_v_blocks_videotwo\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_videothree\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`video_id\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`media_position\` text DEFAULT 'left',
  	\`class_name\` text DEFAULT 'videoThreeBlock',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videothree_order_idx\` ON \`_pages_v_blocks_videothree\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videothree_parent_id_idx\` ON \`_pages_v_blocks_videothree\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videothree_path_idx\` ON \`_pages_v_blocks_videothree\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_videothree_image_idx\` ON \`_pages_v_blocks_videothree\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_galleryone_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_galleryone\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_galleryone_images_order_idx\` ON \`_pages_v_blocks_galleryone_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_galleryone_images_parent_id_idx\` ON \`_pages_v_blocks_galleryone_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_galleryone_images_image_idx\` ON \`_pages_v_blocks_galleryone_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_galleryone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout_type\` text DEFAULT 'masonry',
  	\`title\` text,
  	\`class_name\` text DEFAULT 'gallary1',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_galleryone_order_idx\` ON \`_pages_v_blocks_galleryone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_galleryone_parent_id_idx\` ON \`_pages_v_blocks_galleryone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_galleryone_path_idx\` ON \`_pages_v_blocks_galleryone\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonialtwo_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`designation\` text,
  	\`testimonial_text\` text,
  	\`personimage_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`personimage_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonialtwo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonialtwo_testimonials_order_idx\` ON \`_pages_v_blocks_testimonialtwo_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonialtwo_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonialtwo_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonialtwo_testimonials_personimage_idx\` ON \`_pages_v_blocks_testimonialtwo_testimonials\` (\`personimage_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonialtwo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`class_name\` text DEFAULT 'testimonialsTwo',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonialtwo_order_idx\` ON \`_pages_v_blocks_testimonialtwo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonialtwo_parent_id_idx\` ON \`_pages_v_blocks_testimonialtwo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonialtwo_path_idx\` ON \`_pages_v_blocks_testimonialtwo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonialtwo_image_idx\` ON \`_pages_v_blocks_testimonialtwo\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_main_page_pages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`description\` text,
  	\`link_page_id\` integer,
  	\`link_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_main_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_main_page_pages_order_idx\` ON \`_pages_v_blocks_main_page_pages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_main_page_pages_parent_id_idx\` ON \`_pages_v_blocks_main_page_pages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_main_page_pages_image_idx\` ON \`_pages_v_blocks_main_page_pages\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_main_page_pages_link_link_page_idx\` ON \`_pages_v_blocks_main_page_pages\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_main_page\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'mainPageGallery',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_main_page_order_idx\` ON \`_pages_v_blocks_main_page\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_main_page_parent_id_idx\` ON \`_pages_v_blocks_main_page\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_main_page_path_idx\` ON \`_pages_v_blocks_main_page\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menufour_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_name\` text DEFAULT 'kitchen',
  	\`button_text\` text,
  	\`button_link\` text,
  	\`background_color\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menufour\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menufour_items_order_idx\` ON \`_pages_v_blocks_menufour_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menufour_items_parent_id_idx\` ON \`_pages_v_blocks_menufour_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menufour\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'How would you like to experience Taaza Kitchen?',
  	\`class_name\` text DEFAULT 'menu4',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menufour_order_idx\` ON \`_pages_v_blocks_menufour\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menufour_parent_id_idx\` ON \`_pages_v_blocks_menufour\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menufour_path_idx\` ON \`_pages_v_blocks_menufour\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_options_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`icon_id\` integer,
  	\`link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_service_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_options_order_idx\` ON \`_pages_v_blocks_service_options_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_options_parent_id_idx\` ON \`_pages_v_blocks_service_options_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_options_icon_idx\` ON \`_pages_v_blocks_service_options_options\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Choose Your Service',
  	\`class_name\` text DEFAULT 'orderType',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_order_idx\` ON \`_pages_v_blocks_service_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_parent_id_idx\` ON \`_pages_v_blocks_service_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_path_idx\` ON \`_pages_v_blocks_service_options\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_foodcourtone_restaurants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cuisine\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`variant\` text DEFAULT 'fill',
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_foodcourtone\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourtone_restaurants_order_idx\` ON \`_pages_v_blocks_foodcourtone_restaurants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourtone_restaurants_parent_id_idx\` ON \`_pages_v_blocks_foodcourtone_restaurants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourtone_restaurants_image_idx\` ON \`_pages_v_blocks_foodcourtone_restaurants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_foodcourtone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'FoodCourtOne',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourtone_order_idx\` ON \`_pages_v_blocks_foodcourtone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourtone_parent_id_idx\` ON \`_pages_v_blocks_foodcourtone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_foodcourtone_path_idx\` ON \`_pages_v_blocks_foodcourtone\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_options_two_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`icon_id\` integer,
  	\`link\` text,
  	\`badge\` text,
  	\`subtitle\` text,
  	\`action_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_service_options_two\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_two_options_order_idx\` ON \`_pages_v_blocks_service_options_two_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_two_options_parent_id_idx\` ON \`_pages_v_blocks_service_options_two_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_two_options_icon_idx\` ON \`_pages_v_blocks_service_options_two_options\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_options_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Choose Your Service',
  	\`class_name\` text DEFAULT 'serviceOptionsTwo',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_two_order_idx\` ON \`_pages_v_blocks_service_options_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_two_parent_id_idx\` ON \`_pages_v_blocks_service_options_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_two_path_idx\` ON \`_pages_v_blocks_service_options_two\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menu_categories_menu_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`image_id\` integer,
  	\`link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_menu_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_categories_menu_categories_order_idx\` ON \`_pages_v_blocks_menu_categories_menu_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_categories_menu_categories_parent_id_idx\` ON \`_pages_v_blocks_menu_categories_menu_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_categories_menu_categories_image_idx\` ON \`_pages_v_blocks_menu_categories_menu_categories\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_menu_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`class_name\` text DEFAULT 'menuCategories',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_categories_order_idx\` ON \`_pages_v_blocks_menu_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_categories_parent_id_idx\` ON \`_pages_v_blocks_menu_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_menu_categories_path_idx\` ON \`_pages_v_blocks_menu_categories\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_two_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_two\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_links_order_idx\` ON \`_pages_v_blocks_navigation_two_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_links_parent_id_idx\` ON \`_pages_v_blocks_navigation_two_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_two_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`style\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_two\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_buttons_order_idx\` ON \`_pages_v_blocks_navigation_two_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_buttons_parent_id_idx\` ON \`_pages_v_blocks_navigation_two_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_two\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`class_name\` text DEFAULT 'navigationTwo',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_order_idx\` ON \`_pages_v_blocks_navigation_two\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_parent_id_idx\` ON \`_pages_v_blocks_navigation_two\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_path_idx\` ON \`_pages_v_blocks_navigation_two\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_two_logo_logo_image_idx\` ON \`_pages_v_blocks_navigation_two\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_three_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_three\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_links_order_idx\` ON \`_pages_v_blocks_navigation_three_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_links_parent_id_idx\` ON \`_pages_v_blocks_navigation_three_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_three_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_navigation_three\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_buttons_order_idx\` ON \`_pages_v_blocks_navigation_three_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_buttons_parent_id_idx\` ON \`_pages_v_blocks_navigation_three_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_navigation_three\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`color_scheme\` numeric DEFAULT 1,
  	\`mode\` text DEFAULT 'inherit',
  	\`logo_image_id\` integer,
  	\`logo_alt\` text,
  	\`class_name\` text DEFAULT 'navigationThree',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_order_idx\` ON \`_pages_v_blocks_navigation_three\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_parent_id_idx\` ON \`_pages_v_blocks_navigation_three\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_path_idx\` ON \`_pages_v_blocks_navigation_three\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_navigation_three_logo_logo_image_idx\` ON \`_pages_v_blocks_navigation_three\` (\`logo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_instagram_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`reel_title\` text,
  	\`views\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_instagram\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_instagram_videos_order_idx\` ON \`_pages_v_blocks_instagram_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_instagram_videos_parent_id_idx\` ON \`_pages_v_blocks_instagram_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_instagram_videos_thumbnail_idx\` ON \`_pages_v_blocks_instagram_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_instagram\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`class_name\` text DEFAULT 'instagram',
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_instagram_order_idx\` ON \`_pages_v_blocks_instagram\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_instagram_parent_id_idx\` ON \`_pages_v_blocks_instagram\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_instagram_path_idx\` ON \`_pages_v_blocks_instagram\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_video_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`uploaded_video_id\` integer,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`uploaded_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_videos_order_idx\` ON \`_pages_v_blocks_hero_video_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_videos_parent_id_idx\` ON \`_pages_v_blocks_hero_video_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_videos_uploaded_video_idx\` ON \`_pages_v_blocks_hero_video_videos\` (\`uploaded_video_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_videos_thumbnail_idx\` ON \`_pages_v_blocks_hero_video_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`sub_heading\` text,
  	\`button_text\` text,
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_order_idx\` ON \`_pages_v_blocks_hero_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_parent_id_idx\` ON \`_pages_v_blocks_hero_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_path_idx\` ON \`_pages_v_blocks_hero_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_options_three_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_id\` integer,
  	\`name\` text,
  	\`link\` text,
  	\`description\` text,
  	\`button_text\` text DEFAULT 'View Menu',
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_service_options_three\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_three_options_order_idx\` ON \`_pages_v_blocks_service_options_three_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_three_options_parent_id_idx\` ON \`_pages_v_blocks_service_options_three_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_three_options_icon_idx\` ON \`_pages_v_blocks_service_options_three_options\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_options_three\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`class_name\` text,
  	\`inline_style\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_three_order_idx\` ON \`_pages_v_blocks_service_options_three\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_three_parent_id_idx\` ON \`_pages_v_blocks_service_options_three\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_options_three_path_idx\` ON \`_pages_v_blocks_service_options_three\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_four\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`background_image_id\` integer,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`btn_variant\` text DEFAULT 'fill',
  	\`class_name\` text DEFAULT 'hero4',
  	\`inline_style\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_four_order_idx\` ON \`_pages_v_blocks_hero_four\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_four_parent_id_idx\` ON \`_pages_v_blocks_hero_four\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_four_path_idx\` ON \`_pages_v_blocks_hero_four\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_four_background_image_idx\` ON \`_pages_v_blocks_hero_four\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`metadata\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_meta_title\` text,
  	\`meta_meta_description\` text,
  	\`meta_meta_image_id\` integer,
  	\`meta_favicon_image_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_favicon_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`metadata_meta_meta_meta_image_idx\` ON \`metadata\` (\`meta_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`metadata_meta_meta_favicon_image_idx\` ON \`metadata\` (\`meta_favicon_image_id\`);`)
  await db.run(sql`CREATE INDEX \`metadata_updated_at_idx\` ON \`metadata\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`metadata_created_at_idx\` ON \`metadata\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`themes_custom_themes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`class_name\` text NOT NULL,
  	\`text_color\` text,
  	\`background_color\` text,
  	\`description_color\` text,
  	\`mode\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`themes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`themes_custom_themes_order_idx\` ON \`themes_custom_themes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`themes_custom_themes_parent_id_idx\` ON \`themes_custom_themes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`themes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`page_theme_text_color\` text DEFAULT '#000000',
  	\`page_theme_background_color\` text DEFAULT '#FFFFFF',
  	\`page_theme_container_background\` text DEFAULT '#F5F5F5',
  	\`page_theme_heading_color\` text DEFAULT '#333333',
  	\`page_theme_google_font_url\` text DEFAULT 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  	\`page_theme_body_font\` text DEFAULT 'Roboto',
  	\`page_theme_heading_font\` text DEFAULT 'Roboto',
  	\`page_dark_theme_text_color\` text DEFAULT '#FFFFFF',
  	\`page_dark_theme_background_color\` text DEFAULT '#000000',
  	\`page_dark_theme_container_background\` text DEFAULT '#333333',
  	\`page_dark_theme_heading_color\` text DEFAULT '#CCCCCC',
  	\`page_dark_theme_google_font_url\` text DEFAULT 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  	\`page_dark_theme_body_font\` text DEFAULT 'Roboto',
  	\`page_dark_theme_heading_font\` text DEFAULT 'Roboto',
  	\`navbar_text_color\` text DEFAULT '#000000',
  	\`navbar_background_color\` text DEFAULT '#FFFFFF',
  	\`navbar_dark_text_color\` text DEFAULT '#FFFFFF',
  	\`navbar_dark_background_color\` text DEFAULT '#000000',
  	\`footer_text_color\` text DEFAULT '#000000',
  	\`footer_background_color\` text DEFAULT '#FFFFFF',
  	\`footer_dark_text_color\` text DEFAULT '#FFFFFF',
  	\`footer_dark_background_color\` text DEFAULT '#000000',
  	\`variants_fill_text_color\` text DEFAULT '#FFFFFF',
  	\`variants_fill_background_color\` text DEFAULT '#000000',
  	\`variants_outline_text_color\` text DEFAULT '#000000',
  	\`variants_outline_border_color\` text DEFAULT '#000000',
  	\`variants_outline_background_color\` text DEFAULT 'transparent',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`themes_updated_at_idx\` ON \`themes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`themes_created_at_idx\` ON \`themes\` (\`created_at\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_multiple_locations_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`address\` text,
  	\`hours\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_multiple_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_multiple_locations_locations\`("_order", "_parent_id", "id", "name", "address", "hours", "image_id") SELECT "_order", "_parent_id", "id", "name", "address", "hours", "image_id" FROM \`pages_blocks_multiple_locations_locations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_multiple_locations_locations\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_multiple_locations_locations\` RENAME TO \`pages_blocks_multiple_locations_locations\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_order_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_parent_id_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_image_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_multiple_locations_locations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`address\` text,
  	\`hours\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_multiple_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_multiple_locations_locations\`("_order", "_parent_id", "id", "name", "address", "hours", "image_id", "_uuid") SELECT "_order", "_parent_id", "id", "name", "address", "hours", "image_id", "_uuid" FROM \`_pages_v_blocks_multiple_locations_locations\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_multiple_locations_locations\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_multiple_locations_locations\` RENAME TO \`_pages_v_blocks_multiple_locations_locations\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_order_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_parent_id_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_image_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text DEFAULT '10';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_navigation\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_navigation\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` ADD \`class_name\` text DEFAULT 'hero1';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` ADD \`class_name\` text DEFAULT 'hero2';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` ADD \`btn_style\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` ADD \`class_name\` text DEFAULT 'singleLocation';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` ADD \`btn_style\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` ADD \`class_name\` text DEFAULT 'multiLocation';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`class_name\` text DEFAULT 'gallary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` ADD \`class_name\` text DEFAULT 'Franchise';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` ADD \`button_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` ADD \`button_link\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` ADD \`class_name\` text DEFAULT 'menu';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` ADD \`class_name\` text DEFAULT 'contact';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` ADD \`class_name\` text DEFAULT 'about';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_footer\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_footer\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_media_block\` ADD \`class_name\` text DEFAULT 'mediaBlock';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_media_block\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`captcha_type\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`storage_type\` text DEFAULT 'database';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`workflow\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`form_id\` integer REFERENCES forms(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`class_name\` text DEFAULT 'formBlock';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`inline_style\` text;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant_restaurants\` ADD \`btn_style\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant\` ADD \`class_name\` text DEFAULT 'restaurant';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location\` ADD \`class_name\` text DEFAULT 'location';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` ADD \`class_name\` text DEFAULT 'locationScroll';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt_categories_restaurants\` ADD \`variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt\` ADD \`class_name\` text DEFAULT 'FoodCourt';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_details\` ADD \`class_name\` text DEFAULT 'Chefs';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_details\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_details\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about1\` ADD \`class_name\` text DEFAULT 'about1';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about1\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about1\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`class_name\` text DEFAULT 'testimonialsOne';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_sroll_details\` ADD \`class_name\` text DEFAULT 'ChefScroll';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_sroll_details\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_sroll_details\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` ADD \`class_name\` text DEFAULT 'contactUs';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`restaurant\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`path\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`metadata_id\` integer REFERENCES metadata(id);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`theme_id\` integer REFERENCES themes(id);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`mode\` text DEFAULT 'light';`)
  await db.run(sql`CREATE INDEX \`pages_metadata_idx\` ON \`pages\` (\`metadata_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_theme_idx\` ON \`pages\` (\`theme_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_navigation\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_navigation\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` ADD \`class_name\` text DEFAULT 'hero1';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` ADD \`class_name\` text DEFAULT 'hero2';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` ADD \`btn_style\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` ADD \`class_name\` text DEFAULT 'singleLocation';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` ADD \`btn_style\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` ADD \`class_name\` text DEFAULT 'multiLocation';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`class_name\` text DEFAULT 'gallary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` ADD \`class_name\` text DEFAULT 'Franchise';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` ADD \`button_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` ADD \`button_link\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` ADD \`class_name\` text DEFAULT 'menu';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` ADD \`class_name\` text DEFAULT 'contact';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` ADD \`class_name\` text DEFAULT 'about';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_footer\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_footer\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_media_block\` ADD \`class_name\` text DEFAULT 'mediaBlock';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_media_block\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`captcha_type\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`storage_type\` text DEFAULT 'database';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`workflow\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`form_id\` integer REFERENCES forms(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`class_name\` text DEFAULT 'formBlock';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`inline_style\` text;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant_restaurants\` ADD \`btn_style\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant\` ADD \`class_name\` text DEFAULT 'restaurant';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location\` ADD \`class_name\` text DEFAULT 'location';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` ADD \`btn_variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` ADD \`class_name\` text DEFAULT 'locationScroll';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt_categories_restaurants\` ADD \`variant\` text DEFAULT 'fill';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt\` ADD \`class_name\` text DEFAULT 'FoodCourt';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_details\` ADD \`class_name\` text DEFAULT 'Chefs';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_details\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_details\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about1\` ADD \`class_name\` text DEFAULT 'about1';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about1\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about1\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`class_name\` text DEFAULT 'testimonialsOne';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_sroll_details\` ADD \`class_name\` text DEFAULT 'ChefScroll';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_sroll_details\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_sroll_details\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` ADD \`class_name\` text DEFAULT 'contactUs';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` ADD \`inline_style\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` DROP COLUMN \`theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_restaurant\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_path\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_metadata_id\` integer REFERENCES metadata(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_theme_id\` integer REFERENCES themes(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_mode\` text DEFAULT 'light';`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_metadata_idx\` ON \`_pages_v\` (\`version_metadata_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_theme_idx\` ON \`_pages_v\` (\`version_theme_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`metadata_id\` integer REFERENCES metadata(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`themes_id\` integer REFERENCES themes(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_metadata_id_idx\` ON \`payload_locked_documents_rels\` (\`metadata_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_themes_id_idx\` ON \`payload_locked_documents_rels\` (\`themes_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_abouttwo\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menu1_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menu1\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contactus_open_hours\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contactus_fields\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contactus\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_drop_down_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_drop_down_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_drop_down_menu_submenu\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_drop_down_menu\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_drop_down\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_three\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_two\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menutwo_categories_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menutwo_categories\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menutwo\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menudisplay_menu\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menudisplay\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menuthree_menu_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menuthree_menu\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menuthree\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_videoone\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_videotwo_videos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_videotwo\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_videothree\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_galleryone_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_galleryone\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonialtwo_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonialtwo\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_main_page_pages\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_main_page\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menufour_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menufour\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_options_options\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_options\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_foodcourtone_restaurants\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_foodcourtone\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_options_two_options\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_options_two\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menu_categories_menu_categories\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_menu_categories\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_two_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_two_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_two\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_three_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_three_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_navigation_three\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_instagram_videos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_instagram\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_video_videos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_video\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_options_three_options\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_options_three\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_four\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_abouttwo\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menu1_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menu1\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contactus_open_hours\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contactus_fields\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contactus\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_drop_down_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_drop_down_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_drop_down_menu_submenu\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_drop_down_menu\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_drop_down\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_three\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_two\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menutwo_categories_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menutwo_categories\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menutwo\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menudisplay_menu\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menudisplay\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menuthree_menu_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menuthree_menu\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menuthree\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_videoone\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_videotwo_videos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_videotwo\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_videothree\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_galleryone_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_galleryone\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonialtwo_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonialtwo\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_main_page_pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_main_page\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menufour_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menufour\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_options_options\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_options\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_foodcourtone_restaurants\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_foodcourtone\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_options_two_options\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_options_two\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menu_categories_menu_categories\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_menu_categories\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_two_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_two_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_two\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_three_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_three_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_navigation_three\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_instagram_videos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_instagram\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_video_videos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_video\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_options_three_options\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_options_three\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_four\`;`)
  await db.run(sql`DROP TABLE \`metadata\`;`)
  await db.run(sql`DROP TABLE \`themes_custom_themes\`;`)
  await db.run(sql`DROP TABLE \`themes\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_form_block\` (
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
  await db.run(sql`INSERT INTO \`__new_pages_blocks_form_block\`("_order", "_parent_id", "_path", "id", "enable_intro", "intro_content", "block_name") SELECT "_order", "_parent_id", "_path", "id", "enable_intro", "intro_content", "block_name" FROM \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_form_block\` RENAME TO \`pages_blocks_form_block\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
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
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "title", "published_at", "slug", "slug_lock", "updated_at", "created_at", "_status") SELECT "id", "title", "published_at", "slug", "slug_lock", "updated_at", "created_at", "_status" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_form_block\` (
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
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_form_block\`("_order", "_parent_id", "_path", "id", "enable_intro", "intro_content", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "enable_intro", "intro_content", "_uuid", "block_name" FROM \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_form_block\` RENAME TO \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
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
  await db.run(sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_title", "version_published_at", "version_slug", "version_slug_lock", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_published_at", "version_slug", "version_slug_lock", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave" FROM \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "pages_id", "forms_id", "form_submissions_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "pages_id", "forms_id", "form_submissions_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_multiple_locations_locations\` (
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
  await db.run(sql`INSERT INTO \`__new_pages_blocks_multiple_locations_locations\`("_order", "_parent_id", "id", "name", "address", "hours", "image_id") SELECT "_order", "_parent_id", "id", "name", "address", "hours", "image_id" FROM \`pages_blocks_multiple_locations_locations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_multiple_locations_locations\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_multiple_locations_locations\` RENAME TO \`pages_blocks_multiple_locations_locations\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_order_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_parent_id_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_multiple_locations_locations_image_idx\` ON \`pages_blocks_multiple_locations_locations\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_multiple_locations_locations\` (
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
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_multiple_locations_locations\`("_order", "_parent_id", "id", "_uuid", "name", "address", "hours", "image_id") SELECT "_order", "_parent_id", "id", "_uuid", "name", "address", "hours", "image_id" FROM \`_pages_v_blocks_multiple_locations_locations\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_multiple_locations_locations\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_multiple_locations_locations\` RENAME TO \`_pages_v_blocks_multiple_locations_locations\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_order_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_parent_id_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_multiple_locations_locations_image_idx\` ON \`_pages_v_blocks_multiple_locations_locations\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_navigation\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_navigation\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_one\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero_two\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` DROP COLUMN \`btn_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_single_location\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` DROP COLUMN \`btn_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_multiple_locations\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_franchise\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` DROP COLUMN \`button_text\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` DROP COLUMN \`button_link\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_menu\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_footer\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_footer\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_location_scroll\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_details\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_details\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_details\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about1\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about1\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about1\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_sroll_details\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_sroll_details\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_chef_sroll_details\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_us\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_navigation\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_navigation\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_one\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero_two\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` DROP COLUMN \`btn_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_single_location\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` DROP COLUMN \`btn_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_multiple_locations\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_franchise\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` DROP COLUMN \`button_text\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` DROP COLUMN \`button_link\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_menu\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_footer\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_footer\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` DROP COLUMN \`btn_variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_location_scroll\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_details\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_details\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_details\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about1\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about1\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about1\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_sroll_details\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_sroll_details\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_chef_sroll_details\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` ADD \`theme\` text DEFAULT 'orange-theme';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_us\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_media_block\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_media_block\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_restaurant_restaurants\` DROP COLUMN \`btn_style\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_foodcourt_categories_restaurants\` DROP COLUMN \`variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_media_block\` DROP COLUMN \`class_name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_media_block\` DROP COLUMN \`inline_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_restaurant_restaurants\` DROP COLUMN \`btn_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_foodcourt_categories_restaurants\` DROP COLUMN \`variant\`;`)
}
