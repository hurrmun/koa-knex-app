import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary().unique().notNullable();
      table.string('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('items', (table) => {
      table.uuid('id').primary().unique().notNullable();
      table.uuid('created_by').references('id').inTable('users');
      table.string('name').notNullable();
      table.string('description');
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {}
