/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      uid: 1,
      name: "test",
      username: "test",
      password: "test",
      email: "test@gmail.com",
      phone: "085",
      address: "bali",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);
};
