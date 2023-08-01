const userSchema = (table) => {
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
};

module.exports = userSchema;
