import {drizzle} from 'drizzle-orm/expo-sqlite';
import {SQLiteDatabase} from 'expo-sqlite';

import * as schema from './schema';

class DrizzleDb {
  private dbInstance?: ReturnType<typeof drizzle>;

  configure(db: SQLiteDatabase) {
    this.dbInstance = drizzle(db, {schema});
    return this.dbInstance;
  }

  getDbInstance() {
    if (!this.dbInstance) throw new Error('Database not initialized');
    return this.dbInstance;
  }
}

export const dbDrizzle = new DrizzleDb();
