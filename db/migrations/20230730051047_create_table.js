/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("uid").primary().unique();
    table.string("name");
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("email");
    table.string("phone");
    table.string("address");
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
    //   table
    //     .integer("address_id")
    //     .references("id")
    //     .inTable("addresses")
    //     .notNullable();
  }); // User Schema
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
