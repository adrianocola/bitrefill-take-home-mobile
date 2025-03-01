import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({autoIncrement: true}),
  createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp'}).notNull(),
  coin: text('coin').notNull(),
  quantity: integer('quantity').notNull(), // stored with a 10^8 precision (good enough for this)
  pricePerCoin: integer('price_per_coin').notNull(), // in cents
  type: text('type').notNull(), // buy or sell
  date: integer('date', {mode: 'timestamp'}).notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
