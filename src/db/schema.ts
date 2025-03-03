import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({autoIncrement: true}),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp'}).notNull(),
  coin: text('coin').notNull(),
  quantity: integer('quantity').notNull(), // stored with a 10^8 precision
  pricePerCoin: integer('price_per_coin').notNull(), // stored with a 10^8 precision
  type: text('type').notNull(), // buy or sell
  date: integer('date', {mode: 'timestamp'}).notNull(),
});
