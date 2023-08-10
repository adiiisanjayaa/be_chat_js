/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", function (table) {
    table.increments("uid").primary().unique();
    table.string("name");
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("email");
    table.string("phone");
    table.string("address");
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
  });

  await knex.schema.createTable("rooms", function (table) {
    table.increments("id_room").primary().unique();
    table.string("name");
    table.string("type").notNullable();
    table.specificType("deleted_by", "integer ARRAY");
    table.specificType("read_by", "integer ARRAY");
    table.integer("total_unread");
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
  });

  await knex.schema.createTable("participants", function (table) {
    table.increments("id_participant").primary().unique();
    table.integer("uid_users").references("uid").inTable("users").notNullable();
    table
      .integer("id_room")
      .references("id_room")
      .inTable("rooms")
      .notNullable();
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
  });

  await knex.schema.createTable("messages", function (table) {
    table.increments("id_message").primary().unique();
    table.string("content").notNullable();
    table.string("type").notNullable();
    table.integer("uid_users").references("uid").inTable("users").notNullable();
    table
      .integer("id_room")
      .references("id_room")
      .inTable("rooms")
      .notNullable();
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("participants");
  await knex.schema.dropTableIfExists("rooms");
  await knex.schema.dropTableIfExists("messages");
};
